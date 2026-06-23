<template>
    <PolicyNavigationPanel title="All Versions" :links="termsOfUseLinks" :currentPath="currentPath" />
</template>

<script>
import PolicyNavigationPanel from '../Components/PolicyNavigationPanel.vue'

export default {
  name: 'TermsOfUseNavigationPanel',
  components: {
    PolicyNavigationPanel,
  },
  data: () => ({
    termsOfUseLinks: [
      { title: 'Upcoming Version', routePath: '/terms-of-use/upcoming' },
      { title: '11 April 2022 (current)', routePath: '/terms-of-use' },
    ],
    currentPath: null,
  }),
  mounted () {
    this.currentPath = this.$route.path
  },
}

</script>

<style scoped></style>
