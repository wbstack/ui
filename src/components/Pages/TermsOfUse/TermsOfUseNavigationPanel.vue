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
      { title: 'April 11th 2022 (current)', routePath: '/terms-of-use' },
    ],
    currentPath: 'bar',
  }),
  mounted () {
    this.currentPath = this.$route.path
    console.log(this.currentPath)
  },
}

</script>

<style scoped></style>
