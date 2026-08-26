<template>
  <v-main>
    <v-alert class="mt-8 mr-2 ml-2" outlined type="error" border="left" v-if="error">
      An error occurred while trying to load the requested policy. Please try again later.
    </v-alert>
    <v-container class="fill-height" fluid v-if="!error">
      <v-row justify="center">
        <v-col cols="11" md="4" order-md="last">
          <PolicyNavigationPanel policyType="terms-of-use" basePath="/terms-of-use" />
        </v-col>

        <v-col cols="11" md="8">
          <hgroup>
            <h1>Terms of Use</h1>
            <p v-if="policyActiveFrom" class="text-subtitle-1 text--secondary mb-2">
              Effective: {{ formattedActiveFrom }}
            </p>
          </hgroup>

          <v-alert class="mt-2" type="info" v-if="isUpcomingPolicy">
            This is an upcoming version. You can find the
            <router-link class="white--text" to="/terms-of-use">current version here</router-link>.
          </v-alert>
          <v-alert class="mt-2" type="info" v-if="isOutdatedPolicy">
            This is an outdated version. You can find the
            <router-link class="white--text" to="/terms-of-use">current version here</router-link>.
          </v-alert>

          <component :is="policyContentComponent" v-if="policyContentComponent" :active-from="policyActiveFrom" />
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import PolicyNavigationPanel from '../Components/PolicyNavigationPanel.vue'
import { AxiosError } from 'axios'

export default {
  name: 'TermsOfUseRenderer',
  components: {
    PolicyNavigationPanel,
  },
  computed: {
    formattedActiveFrom: function () {
      if (!this.policyActiveFrom) return null
      return new Date(this.policyActiveFrom).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })
    },
  },
  data () {
    return {
      policyType: 'terms-of-use',
      policyContentComponent: undefined,
      policyActiveFrom: undefined,

      isUpcomingPolicy: false,
      isOutdatedPolicy: false,

      error: undefined,
    }
  },
  methods: {
    async renderPage () {
      this.policyContentComponent = undefined
      this.policyActiveFrom = undefined
      this.isUpcomingPolicy = false
      this.isOutdatedPolicy = false
      this.error = undefined

      try {
        const policyType = this.policyType // TODO for a generalized component, read this from component property
        const activeFromRouteParam = this.$route.params.activeFrom

        let upcomingPolicyResponse
        let upcomingPolicyActiveFrom
        let currentPolicyResponse
        let currentPolicyActiveFrom
        let policyContentVueFile

        try {
          upcomingPolicyResponse = await this.$api.getUpcomingPolicyByType({ policyType })
          upcomingPolicyActiveFrom = upcomingPolicyResponse.metadata.active_from
        } catch (exception) {
          if (exception instanceof AxiosError && exception.status === 404) {
            upcomingPolicyResponse = undefined
          } else {
            throw exception
          }
        }

        try {
          currentPolicyResponse = await this.$api.getCurrentPolicyByType({ policyType })
          currentPolicyActiveFrom = currentPolicyResponse.metadata.active_from
        } catch (exception) {
          if (exception instanceof AxiosError && exception.status === 404) {
            currentPolicyResponse = undefined
          } else {
            throw exception
          }
        }

        // The routes for an upcoming version can be /terms-of-use/upcoming or /terms-of-use/:activeFrom
        const isUpcomingRoute = this.$route.path === '/terms-of-use/upcoming'
        const isUpcomingActiveFrom = activeFromRouteParam && activeFromRouteParam === upcomingPolicyActiveFrom
        // The routes for the currently active version can be /terms-of-use or /terms-of-use/:activeFrom
        const isCurrentRoute = this.$route.path === '/terms-of-use'
        const isCurrentActiveFrom = activeFromRouteParam && activeFromRouteParam === currentPolicyActiveFrom
        // Determine which policy to render based on the route and the activeFrom parameter
        if (isUpcomingRoute || isUpcomingActiveFrom) {
          this.isUpcomingPolicy = true
          policyContentVueFile = upcomingPolicyResponse.metadata.content_vue_file
          this.policyActiveFrom = upcomingPolicyResponse.metadata.active_from
        } else if (isCurrentRoute || isCurrentActiveFrom) {
          policyContentVueFile = currentPolicyResponse.metadata.content_vue_file
          this.policyActiveFrom = currentPolicyResponse.metadata.active_from
        } else {
          const outdatedPolicy = await this.$api.getPolicyByDate({ policyType, activeFrom: activeFromRouteParam })
          this.isOutdatedPolicy = true
          policyContentVueFile = outdatedPolicy.metadata.content_vue_file
          this.policyActiveFrom = outdatedPolicy.metadata.active_from
        }

        const policyContentComponent = () => ({ component: import(`./${policyContentVueFile}`) })
        if (policyContentComponent !== undefined) {
          this.policyContentComponent = policyContentComponent
        } else {
          this.error = 'missing policy'
        }
      } catch (error) {
        this.error = error
        console.error(error)
      }
    },
  },
  watch: {
    // Watch for route changes to (re-)render the page
    $route: {
      // Run the handler immediately on component creation
      immediate: true,
      handler: 'renderPage',
    },
  },
}
</script>

<style scoped></style>
