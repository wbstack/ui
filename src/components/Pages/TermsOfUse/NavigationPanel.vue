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
      { title: 'Upcoming Version', routeName: 'TermsOfUseUpcoming' },
      { title: 'April 11th 2022 (current)', routeName: 'TermsOfUse' },
    ],
  }),
}

</script>

<style scoped></style>
