<template>
    <v-expansion-panels v-bind:value="$vuetify.breakpoint.mdAndUp ? 0 : null" v-if="links && links.length">
        <v-expansion-panel>
            <v-expansion-panel-header class="grey lighten-3">{{ title }}</v-expansion-panel-header>

            <v-expansion-panel-content>
            <v-list class="wrap">
                <v-list-item v-for="(link, index) in links" :key="link.routePath">
                    <v-list-item-content>
                        <v-list-item-title v-if="index == currentLink">
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
const parseActiveFrom = (activeFrom) => {
  if (activeFrom === null || activeFrom === undefined) {
    return null
  }

  return new Date(`${activeFrom}T00:00:00Z`)
}

const comparePolicies = (left, right) => {
  const leftActiveFrom = parseActiveFrom(left.metadata.active_from)
  const rightActiveFrom = parseActiveFrom(right.metadata.active_from)

  if (leftActiveFrom === null && rightActiveFrom === null) {
    return 0
  }

  if (leftActiveFrom === null) {
    return 1
  }

  if (rightActiveFrom === null) {
    return -1
  }

  return rightActiveFrom - leftActiveFrom || right.metadata.policy_id - left.metadata.policy_id
}

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
    error: undefined,
  }),
  computed: {
    links: function () {
      const sortedPolicies = [...this.policies].sort(comparePolicies)
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      const currentPolicy = sortedPolicies.find(policy => {
        const activeFrom = parseActiveFrom(policy.metadata.active_from)
        return activeFrom <= today
      })

      const upcomingPolicy = sortedPolicies.find(policy => {
        const activeFrom = parseActiveFrom(policy.metadata.active_from)
        return activeFrom > today || activeFrom === null
      })

      const otherPolicies = sortedPolicies.filter(policy => {
        const policyId = policy.metadata.policy_id
        const currentPolicyId = currentPolicy ? currentPolicy.metadata.policy_id : null
        const upcomingPolicyId = upcomingPolicy ? upcomingPolicy.metadata.policy_id : null

        return policyId !== currentPolicyId && policyId !== upcomingPolicyId
      })

      const orderedPolicies = [currentPolicy, upcomingPolicy, ...otherPolicies].filter(Boolean)

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
    currentLink: function () {
      const isCurrentPath = (element) => element.routePath === this.$route.path
      const positionInList = this.links.findIndex(isCurrentPath)

      if (positionInList === -1) {
        const currentVersionIndex = this.links.findIndex(element => element.routePath === this.basePath)

        return currentVersionIndex === -1 ? 0 : currentVersionIndex
      }

      return positionInList
    },
  },
  methods: {
    async loadPolicies () {
      this.error = undefined

      try {
        const response = await this.$api.getAllPoliciesByType({ policyType: this.policyType })
        this.policies = response
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
        return 'Current version'
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
