<template>
  <v-main>
    <ReviewSubmission v-if="reviews.length === 0" :wiki-id="id"/>
    <ReviewsView v-if="reviews.length > 0" :submittedDate="reviews[0].created_at"></ReviewsView>
  </v-main>
</template>

<script>
import ReviewSubmission from '../Cards/ReviewSubmission.vue'
import ReviewsView from '../Cards/ReviewsView.vue'

export default {
  name: 'Review',
  components: {
    ReviewSubmission,
    ReviewsView,
  },
  props: [
    'id',
  ],
  // This component needs to know if there are reviews and also needs to pass it down into the view component.
  // we load all reviews for a given Wiki here and then pass them down as props rather than children accessing this data from
  // the store directly.
  computed: {
    reviews () {
      return this.$store.getters.getReviewsByWikiId(Number(this.id))
    },
  },
  created () {
    this.$store.dispatch('loadWikiReviews', this.id)
  },
}
</script>

<style scoped>
</style>
