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
    // TODO update with info from API
    termsOfUseLinks: [
      { title: 'Upcoming Version', routePath: '/terms-of-use/upcoming' },
      { title: '11 April 2022 (current)', routePath: '/terms-of-use' },
    ],
  }),
  computed: {
    currentLink: function () {
      const isCurrentPath = (element) => element.routePath === this.$route.path
      const positionInList = this.termsOfUseLinks.findIndex(isCurrentPath)

      if (positionInList === -1) {
        // not in a list, must be current version, because the TermsOfUseRenderer only allows accessing the current version by its active from date
        return 1
      }

      return positionInList
    },
  },
}

</script>

<style scoped></style>
