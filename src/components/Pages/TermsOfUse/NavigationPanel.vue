<template>
    <NavigationPanel title="All Versions" :links="termsOfUseLinks" />
</template>

<script>
import NavigationPanel from '../Components/NavigationPanel.vue'

export default {
  name: 'TermsOfUseNavigationPanel',
  components: {
    NavigationPanel,
  },
  data: () => ({
    termsOfUseLinks: [
      { title: 'Upcoming Version', routePath: '/terms-of-use/upcoming' },
      { title: 'April 11th 2022 (current)', routePath: '/terms-of-use' },
    ],
  }),
}

</script>

<style scoped></style>
