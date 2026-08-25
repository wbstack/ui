<template>
  <v-main>
    <v-alert class="mt-8 mr-2 ml-2" outlined type="error" border="left" v-if="error">
      An error occurred while trying to load the requested policy. Please try again later.
    </v-alert>
    <v-container class="fill-height" fluid v-if="!error">
      <v-row justify="center">
        <v-col cols="11" md="4" order-md="last">
          <PolicyNavigationPanel basePath="/hosting-policy" policyType="hosting-policy" />
        </v-col>

        <v-col cols="11" md="8">
          <hgroup>
            <h1>Hosting Policy</h1>
            <p v-if="policyActiveFrom" class="text-subtitle-1 text--secondary mb-2">
              Effective: {{ formattedActiveFrom }}
            </p>
          </hgroup>

          <v-alert class="mt-2" type="info" v-if="isUpcomingPolicy">
            This is an upcoming version. You can find the
            <router-link class="white--text" to="/hosting-policy">current version here</router-link>.
          </v-alert>
          <v-alert class="mt-2" type="info" v-if="isOutdatedPolicy">
            This is an outdated version. You can find the
            <router-link class="white--text" to="/hosting-policy">current version here</router-link>.
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
  name: 'HostingPolicyRenderer',
  components: {
    PolicyNavigationPanel,
  },
  computed: {
    isUpcomingPolicy: function () {
      return this.policyActiveFrom && this.policyActiveFrom === this.upcomingPolicyActiveFrom
    },
    isOutdatedPolicy: function () {
      return this.policyActiveFrom &&
        this.policyActiveFrom !== this.upcomingPolicyActiveFrom &&
        this.policyActiveFrom !== this.currentPolicyActiveFrom
    },
    formattedActiveFrom: function () {
      if (!this.policyActiveFrom) return null
      return new Date(this.policyActiveFrom).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })
    },
  },
  data () {
    return {
      policyType: 'hosting-policy',
      policyContentComponent: undefined,
      policyActiveFrom: undefined,
      upcomingPolicyActiveFrom: undefined,
      currentPolicyActiveFrom: undefined,
      error: undefined,
    }
  },
  methods: {
    async renderPage () {
      this.policyContentComponent = undefined
      this.policyActiveFrom = undefined
      this.error = undefined

      try {
        const policyType = this.policyType // TODO for a generalized component, read this from component property
        const activeFromRouteParam = this.$route.params.activeFrom

        let upcomingPolicy
        let currentPolicy
        let policyContentVueFile

        try {
          upcomingPolicy = await this.$api.getUpcomingPolicyByType({ policyType })
          this.upcomingPolicyActiveFrom = upcomingPolicy.metadata.active_from
        } catch (exception) {
          if (exception instanceof AxiosError && exception.status === 404) {
            upcomingPolicy = undefined
          } else {
            throw exception
          }
        }

        try {
          currentPolicy = await this.$api.getCurrentPolicyByType({ policyType })
          this.currentPolicyActiveFrom = currentPolicy.metadata.active_from
        } catch (exception) {
          if (exception instanceof AxiosError && exception.status === 404) {
            // Special case to redirect users to the pilot policy if there is no current policy
            // Remove after T408316
            this.$router.replace({ path: '/hosting-policy/pilot' })
            return
            // And replace with:
            // currentPolicy = undefined
          } else {
            throw exception
          }
        }

        // The route can be one of:
        //   /hosting-policy/upcoming      - upcoming version
        //   /hosting-policy/:activeFrom   - upcoming version
        //   /hosting-policy               - current version
        //   /hosting-policy/:activeFrom   - current version
        //   /hosting-policy/:activeFrom   - previous version
        const isUpcomingRoute = this.$route.path === '/hosting-policy/upcoming'
        const isUpcomingActiveFrom = activeFromRouteParam && activeFromRouteParam === this.upcomingPolicyActiveFrom
        const isCurrentRoute = this.$route.path === '/hosting-policy'
        const isCurrentActiveFrom = activeFromRouteParam && activeFromRouteParam === this.currentPolicyActiveFrom

        // Determine which policy to render based on the route and the activeFrom parameter
        if (isUpcomingRoute || isUpcomingActiveFrom) {
          policyContentVueFile = upcomingPolicy.metadata.content_vue_file
          this.policyActiveFrom = upcomingPolicy.metadata.active_from
        } else if (isCurrentRoute || isCurrentActiveFrom) {
          policyContentVueFile = currentPolicy.metadata.content_vue_file
          this.policyActiveFrom = currentPolicy.metadata.active_from
        } else {
          const previousPolicy = await this.$api.getPolicyByDate({ policyType, activeFrom: activeFromRouteParam })
          policyContentVueFile = previousPolicy.metadata.content_vue_file
          this.policyActiveFrom = previousPolicy.metadata.active_from
        }

        const policyContentComponent = () => ({ component: import(`./${policyContentVueFile}`) })
        if (policyContentComponent !== undefined) {
          this.policyContentComponent = policyContentComponent
        } else {
          this.error = 'missing policy'
        }
      } catch (error) {
        console.error(error)
        this.error = error
      }
    },
  },
  watch: {
    // Watch for route changes to (re-)render the page
    $route: {
      // Run the handler immediately on component creation
      immediate: true,
      handler (to, from) {
        this.renderPage()
      },
    },
  },
}
</script>

<style scoped></style>
