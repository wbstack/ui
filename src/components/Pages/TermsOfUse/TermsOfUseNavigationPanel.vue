<template>
    <PolicyNavigationPanel title="All Versions" :links="termsOfUseLinks"  :currentLink="currentLink" />
</template>

<script>
import PolicyNavigationPanel from '../Components/PolicyNavigationPanel.vue'

export default {
  name: 'TermsOfUseNavigationPanel',
  components: {
    PolicyNavigationPanel,
  },
  data: () => ({
    termsOfUseLinks: [],
    policies: undefined,
    error: undefined,
  }),
  computed: {
    currentLink: function () {
      const isCurrentPath = (element) => element.routePath === this.$route.path
      const positionInList = this.termsOfUseLinks.findIndex(isCurrentPath)

      if (positionInList === -1) {
        // not in a list, must be current version, because the TermsOfUseRenderer only allows accessing the current version by its active_from date
        return 1
      }

      return positionInList
    },
  },
  methods: {
    async loadPolicies () {
      try {
        const policyType = 'terms-of-use'
        const response = await this.$api.getAllPoliciesByType({ policyType })
        const items = await response.items

        this.policies = items
      } catch (error) {
        this.error = error
        console.error(error)
      }
    },
  },
  mounted () {
    this.loadPolicies()
  },
}

</script>

<style scoped></style>
