<template>
  <v-main>
    <v-alert class="mt-8 mr-2 ml-2" outlined type="error" border="left" v-if="error">
      An error occurred while trying to load the requested policy. Please try again later.
    </v-alert>
    <v-container class="fill-height" fluid v-if="!error">
      <v-row v-if="isUpcomingPolicy" justify="center">
        <v-col cols="11">
          <v-alert type="info">
            This is an upcoming version. You can find the
            <router-link class="white--text" to="/hosting-policy">current version here</router-link>.
          </v-alert>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col cols="11" md="4" order-md="last">
          <PolicyNavigationPanel basePath="/hosting-policy" policyType="hosting-policy" />
        </v-col>

        <v-col cols="11" md="8">
          <component :is="policy" v-if="policy" />
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>

import PolicyNavigationPanel from '../Components/PolicyNavigationPanel.vue'

export const versions = {
  'hosting-policy/version-1.vue': () => ({ component: import('./hosting-policy/version-1.vue') }),
}

const isFutureDate = (activeFrom) => {
  if (activeFrom === null || activeFrom === undefined) {
    return false
  }

  const date = new Date(`${activeFrom}T00:00:00Z`)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return date > today
}

export default {
  name: 'HostingPolicyRenderer',
  components: {
    PolicyNavigationPanel,
  },
  computed: {
    policyActiveFrom: function () {
      return this.$route.params.activeFrom
    },
    isUpcomingRoute: function () {
      return this.$route.path === '/hosting-policy/upcoming'
    },
    isUpcomingPolicy: function () {
      return isFutureDate(this.policyMetadata && this.policyMetadata.active_from)
    },
  },
  data () {
    return {
      policy: undefined,
      policyMetadata: undefined,
      error: undefined,
    }
  },
  methods: {
    async loadPolicy () {
      this.policy = undefined
      this.policyMetadata = undefined
      this.error = undefined

      try {
        const policyType = 'hosting-policy' // TODO for a generalized component, read this from component property
        const activeFrom = this.policyActiveFrom
        let response

        if (this.isUpcomingRoute) {
          response = await this.$api.getUpcomingPolicyByType({ policyType })
        } else if (activeFrom === undefined) {
          response = await this.$api.getCurrentPolicyByType({ policyType })
        } else {
          response = await this.$api.getPolicyByDate({ policyType, activeFrom })
        }

        const metadata = response.metadata
        const policy = versions[metadata.content_vue_file]

        if (policy !== undefined) {
          this.policy = policy
          this.policyMetadata = metadata
        } else {
          this.error = 'missing policy'
        }
      } catch (error) {
        console.error(error)
        this.error = error
      }
    },
  },
  mounted () {
    this.loadPolicy()
  },
  watch: {
    policyActiveFrom: function () {
      this.loadPolicy()
    },
    isUpcomingRoute: function () {
      this.loadPolicy()
    },
  },
}
</script>

<style scoped></style>
