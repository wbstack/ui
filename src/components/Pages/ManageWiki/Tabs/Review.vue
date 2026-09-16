<template>
  <v-main>
    <ReviewSubmission :wiki-id="id"/>
  </v-main>
</template>

<script>
import ReviewSubmission from '../Cards/ReviewSubmission.vue';

export default {
  name: 'Review',
  components: {
    ReviewSubmission
  },
  props: [
    'id'
    // 'baseUrl' -  TODO: where should we get this from? The store? Will this be fresh enough? Does initaliseSettings from this parent get called early enough?
  ]
}
</script>

<style scoped>
</style>
