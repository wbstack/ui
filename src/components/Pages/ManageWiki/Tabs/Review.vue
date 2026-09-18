<template>
  <v-main>
    <ReviewSubmission :wiki-id="id"/>
    <ReviewsView v-if="reviews.length > 0" :submittedDate="reviews.created_at"></ReviewsView>
  </v-main>
</template>

<script>
import ReviewSubmission from '../Cards/ReviewSubmission.vue'
import ReviewsView from '../Cards/ReviewsView.vue';

export default {
  name: 'Review',
  components: {
    ReviewSubmission,
    ReviewsView
  },
  props: [
    // TODO should this really be passed in here or would it be better to get the id from the store for consistency
    'id',
  ],
  // This component needs to know if there are reviews. It should probably then pass down those reviews to the ReviewsView
  // Q: does it get the reviews by looking them up from the api directly or does it get it from the store?
  // A: From Ollie. We aknowledge the store is a big mess. Try to implement it entierly here without the store
  // T: would it be better to use the store, props with two way binding, 
  computed: {
    reviews () {
      return this.$store.getters.getReviewsByWikiId(Number(this.id));
    }
  }
}
</script>

<style scoped>
</style>
