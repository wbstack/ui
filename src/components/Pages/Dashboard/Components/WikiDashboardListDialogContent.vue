<template>
  <v-card>
    <v-card-title>Status information</v-card-title>
    <v-card-text v-if="!hasPendingReview">
      Under our <ExternalLink :url="`/hosting-policy`">hosting policy</ExternalLink>, Wikibases are temporary by default. Unless submitted for review, your Wikibase <strong>{{ wikiDomain }}</strong> will be taken offline on {{ formattedActiveFromDate }}. If you want to keep it online, please <ExternalLink :url="`/wikis/manage/${this.wikiId}/review`">submit it for review</ExternalLink>.
    </v-card-text>
    <v-card-text v-if="hasPendingReview">
      Your Wikibase <strong>{{ wikiDomain }}</strong> is expecting a review. Once it's reviewed, we'll let you know the outcome and what happens next. The Wikibase will stay online at least until the review is complete.
    </v-card-text>
    <v-divider />
    <v-card-actions class="justify-end">
      <v-btn
        color="primary"
        text
        @click='close'
      >Close</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import ExternalLink from '../../../Components/ExternalLink.vue'

export default {
  name: 'WikiDashboardListDialog',
  components: {
    ExternalLink,
  },
  props: {
    hasPendingReview: {
      type: Boolean,
      required: false,
    },
    formattedActiveFromDate: {
      type: String,
      required: true,
    },
    wikiDomain: {
      type: String,
      required: true,
    },
    wikiId: {
      type: Number,
      required: true,
    },
  },
  methods: {
    close () {
      this.$emit('close')
    },
  },
}
</script>
