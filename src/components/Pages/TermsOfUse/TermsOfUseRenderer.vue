<template>
  <v-main>
    <v-alert class="mt-8 mr-2 ml-2" outlined type="error" border="left" v-if="error">
      An error occurred while trying to load the requested policy. Please try again later.
    </v-alert>
    <v-container class="fill-height" fluid v-if="!error">
      <v-row justify="center">
        <v-col cols="11" md="4" order-md="last">
          <TermsOfUseNavigationPanel />
        </v-col>

        <v-col cols="11" md="8">
          <component :is="policy" v-if="policy" />
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import TermsOfUseNavigationPanel from './TermsOfUseNavigationPanel.vue'

export const versions = {
  'terms-of-use/version-1.vue': () => ({ component: import('./terms-of-use/version-1.vue') }),
}

export default {
  name: 'TermsOfUseRenderer',
  components: {
    TermsOfUseNavigationPanel,
  },
  computed: {
    policyActiveFrom: function () {
      return this.$route.params.activeFrom
    },
  },
  data () {
    return {
      policy: undefined,
      error: undefined,
    }
  },
  methods: {
    async loadPolicy () {
      try {
        const policyType = 'terms-of-use' // TODO read this from component property
        const activeFrom = this.policyActiveFrom

        const response = await this.$api.policyByDate({ policyType, activeFrom })

        const metadata = await response.metadata
        const policy = versions[metadata.content_vue_file]

        if (policy !== undefined) {
          this.policy = policy
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
    policyId: function () {
      this.loadPolicy()
    },
  },
}
</script>

<style scoped></style>
