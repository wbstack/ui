<template>
    <v-expansion-panels v-bind:value="$vuetify.breakpoint.mdAndUp ? 0 : null" v-if="links && links.length">
        <v-expansion-panel>
            <v-expansion-panel-header class="grey lighten-3">{{ title }}</v-expansion-panel-header>

            <v-expansion-panel-content>
            <v-list class="wrap">
                <v-list-item v-for="(link, index) in links" :key="link.routePath">
                    <v-list-item-content>
                        <v-list-item-title v-if="index == currentlyRenderedLink">
                            {{ link.title }}
                        </v-list-item-title>

                        <v-list-item-title v-else>
                            <router-link :to="{ path: link.routePath }" class="text-decoration-none">
                                {{ link.title }}
                            </router-link>
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
            </v-expansion-panel-content>
        </v-expansion-panel>
    </v-expansion-panels>
</template>

<script>

export default {
  name: 'PolicyNavigationPanel',
  components: {
  },
  props: {
    basePath: {
      type: String,
    },
    policyType: {
      type: String,
    },
    title: {
      type: String,
      default: 'All Versions',
    },
  },
  data: () => ({
    policies: [],
    currentPolicyId: null,
    upcomingPolicyId: null,
    error: undefined,
  }),
  computed: {
    links: function () {
      const policyById = new Map(this.policies.map(policy => [policy.metadata.policy_id, policy]))
      const currentPolicy = policyById.get(this.currentPolicyId)
      const upcomingPolicy = policyById.get(this.upcomingPolicyId)

      const otherPolicies = this.policies.filter(policy => {
        const policyId = policy.metadata.policy_id
        const currentPolicyId = this.currentPolicyId
        const upcomingPolicyId = this.upcomingPolicyId

        return policyId !== currentPolicyId && policyId !== upcomingPolicyId
      }).sort((left, right) => {
        const leftActiveFrom = left.metadata.active_from || ''
        const rightActiveFrom = right.metadata.active_from || ''

        if (leftActiveFrom === rightActiveFrom) {
          return right.metadata.policy_id - left.metadata.policy_id
        }

        return rightActiveFrom.localeCompare(leftActiveFrom)
      })

      const orderedPolicies = [upcomingPolicy, currentPolicy, ...otherPolicies].filter(Boolean)

      return orderedPolicies.map(policy => {
        const activeFrom = policy.metadata.active_from
        const isCurrentPolicy = currentPolicy && policy.metadata.policy_id === currentPolicy.metadata.policy_id
        const isUpcomingPolicy = upcomingPolicy && policy.metadata.policy_id === upcomingPolicy.metadata.policy_id

        return {
          routePath: this.routePathForPolicy({ activeFrom, isCurrentPolicy, isUpcomingPolicy }),
          title: this.titleForPolicy({ activeFrom, isCurrentPolicy, isUpcomingPolicy }),
        }
      })
    },
    currentlyRenderedLink: function () {
      const isRenderedPath = (element) => element.routePath === this.$route.path
      const positionInList = this.links.findIndex(isRenderedPath)

      if (positionInList === -1) {
        const renderedVersionIndex = this.links.findIndex(element => element.routePath === this.basePath)
        return renderedVersionIndex === -1 ? 0 : renderedVersionIndex
      }

      return positionInList
    },
  },
  methods: {
    async loadPolicies () {
      this.error = undefined

      try {
        const policies = await this.$api.getAllPoliciesByType({ policyType: this.policyType })

        this.policies = policies

        // We look up the Current and Upcoming policy of this type to avoid needing to have the complex
        // date calculations in the frontend and instead do them in the platform api.
        // This is quite inefficient but it keeps the frontend less complex to reason about.
        // We need to consider that there may be neither an upcoming or current policy and gracefully handle that,
        try {
          const upcomingPolicy = await this.$api.getUpcomingPolicyByType({ policyType: this.policyType })
          this.upcomingPolicyId = upcomingPolicy.metadata.policy_id
        } catch (error) {
          if (!(error && error.response && error.response.status === 404)) {
            console.error(error)
          }
          this.upcomingPolicyId = null
        }

        try {
          const currentPolicy = await this.$api.getCurrentPolicyByType({ policyType: this.policyType })
          this.currentPolicyId = currentPolicy.metadata.policy_id
        } catch (error) {
          if (!(error && error.response && error.response.status === 404)) {
            console.error(error)
          }
          this.currentPolicyId = null
        }
      } catch (error) {
        this.error = error
        console.error(error)
      }
    },
    routePathForPolicy ({ activeFrom, isCurrentPolicy, isUpcomingPolicy }) {
      if (isCurrentPolicy) {
        return this.basePath
      }

      if (isUpcomingPolicy) {
        return `${this.basePath}/upcoming`
      }

      return `${this.basePath}/${activeFrom}`
    },
    titleForPolicy ({ activeFrom, isCurrentPolicy, isUpcomingPolicy }) {
      if (isCurrentPolicy) {
        return `${activeFrom} (current)`
      }
      if (isUpcomingPolicy) {
        return 'Upcoming version'
      }

      return activeFrom
    },
  },
  mounted () {
    this.loadPolicies()
  },
}

</script>

<style scoped></style>
