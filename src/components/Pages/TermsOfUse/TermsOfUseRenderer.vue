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
          <v-alert class="mt-2" type="info" v-if="!isUpcomingPolicy && !isCurrentPolicy  ">
            This is an outdated version. You can find the
            <router-link class="white--text" to="/terms-of-use">current version here</router-link>.
          </v-alert>

          <component :is="policy" v-if="policy" :active-from="policyActiveFrom" />
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import PolicyNavigationPanel from '../Components/PolicyNavigationPanel.vue'
import { AxiosError } from 'axios'

export const versions = {
  'terms-of-use/version-1.vue': () => ({ component: import('./terms-of-use/version-1.vue') }),
  'terms-of-use/version-2.vue': () => ({ component: import('./terms-of-use/version-2.vue') }),
}

export default {
  name: 'TermsOfUseRenderer',
  components: {
    PolicyNavigationPanel,
  },
  computed: {
    policyActiveFromRoute: function () {
      return this.$route.params.activeFrom
    },
    isUpcomingRoute: function () {
      return this.$route.path === '/terms-of-use/upcoming'
    },
    isCurrentPolicy: function () {
      return this.currentPolicyActiveFrom === this.policyActiveFrom
    },
    isUpcomingPolicy: function () {
      return this.upcomingPolicyActiveFrom === this.policyActiveFrom
    },
    isCurrentRoute: function () {
      return this.policyActiveFromRoute === undefined
    },
    formattedActiveFrom: function () {
      if (!this.policyActiveFrom) return null
      return new Date(this.policyActiveFrom).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })
    },
  },
  data () {
    return {
      policy: undefined,
      policyActiveFrom: undefined,
      error: undefined,
      policyType: 'terms-of-use',
      currentPolicyActiveFrom: undefined,
    }
  },
  methods: {
    async loadPolicy () {
      this.policy = undefined
      this.error = undefined
      this.policyActiveFrom = undefined

      try {
        const policyType = this.policyType // TODO for a generalized component, read this from component property
        const activeFrom = this.policyActiveFromRoute
        let response

        let upcomingPolicy
        let currentPolicy

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
            currentPolicy = undefined
          } else {
            throw exception
          }
        }

        if (this.isUpcomingRoute) {
          response = upcomingPolicy
        } else if (this.isCurrentRoute) {
          response = currentPolicy
        } else {
          response = await this.$api.getPolicyByDate({ policyType, activeFrom })
        }

        const policy = versions[response.metadata.content_vue_file]

        if (policy !== undefined) {
          this.policy = policy
          this.policyActiveFrom = response.metadata.active_from
        } else {
          this.error = 'missing policy'
        }
      } catch (error) {
        this.error = error
        console.error(error)
      }
    },
  },
  mounted () {
    this.loadPolicy()
  },
  watch: {
    policyActiveFromRoute: function () {
      this.loadPolicy()
    },
    isUpcomingRoute: function () {
      this.loadPolicy()
    },
  },
}
</script>

<style scoped></style>
