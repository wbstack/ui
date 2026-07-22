<template>
  <v-main>
    <v-container class="fill-height" fluid>
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
  '2022-01-01': () => ({ component: import('./terms-of-use/2022-01-01.vue') }),
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
    }
  },
  methods: {
    async loadPolicy () {
      try {
        const policyType = 'terms-of-use' // TODO read this from component property
        const activeFrom = this.policyActiveFrom

        const response = await this.$api.policyByDate({ policyType, activeFrom })

        const metadata = await response.metadata
        this.policy = versions[metadata.active_from]
      } catch (error) {
        console.error(error)
        alert('Failed to load policy.')
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
