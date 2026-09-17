<template>
  <v-main>
    <ReviewSubmission :wiki-id="id"/>
  </v-main>
</template>

<script>
import ReviewSubmission from '../Cards/ReviewSubmission.vue'

export default {
  name: 'Review',
  components: {
    ReviewSubmission,
  },
  props: [
    // TODO should this really be passed in here or would it be better to get the id from the store for consistency
    'id',
  ],
}
</script>

<style scoped>
</style>
