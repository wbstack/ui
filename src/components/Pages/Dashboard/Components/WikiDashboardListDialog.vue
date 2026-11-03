<template>
    <v-dialog value="true" width="564">
      <v-card>
        <v-card-title>Status information</v-card-title>
        <v-card-text v-if="!hasPendingReview">
          Under our <ExternalLink :url="`https://www.wikibase.cloud/hosting-policy`">hosting policy</ExternalLink>, Wikibases are temporary by default. Unless submitted for review, your Wikibase {{ wikiDomain }} will be taken offline on {{ formattedActiveFromDate }}. If you want to keep it online, please <ExternalLink :url="`https://www.wikibase.cloud/wikis/manage/${this.wikiId}/review`">submit it for review</ExternalLink>.
        </v-card-text>
        <v-divider />
        <v-card-actions class="justify-end">
          <v-btn
            text
            @click='close'
          >Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
import ExternalLink from '../../../Components/ExternalLink.vue';

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
    }
  },
  methods: {
    close () {
      this.$emit('close')
    },
  },
}
</script>
