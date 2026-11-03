<template>
  <div>
    <div>
      {{wikiTitle}}
      <v-chip v-if="!hasPendingReview" @click="expandDialog = true" class="ml-3" color="warning" outlined small>
        <v-icon class="mr-1" small>mdi-clock-outline</v-icon>
        Expiring soon
      </v-chip>
      <v-chip v-else class="ml-3" color="primary" outlined small>
        <v-icon class="mr-1" small>mdi-clock-outline</v-icon>
        Pending review
      </v-chip>
    </div>
    <div v-if="!hasPendingReview" class="mt-2">
      <span class="warning--text">Will expire on {{ formattedActiveFromDate }}</span>
    </div>

    <WikiDashboardListDialog :hasPendingReview="hasPendingReview" v-if="expandDialog" @close="expandDialog=false" />
  </div>
</template>

<script>
import WikiDashboardListDialog from './WikiDashboardListDialog.vue'

export default {
  name: 'WikiDashboardListElement',
  components: {
    WikiDashboardListDialog,
  },
  props: {
    wikiTitle: {
      type: String,
      required: true,
    },
    suspensionReason: {
      type: String,
      required: false,
    },
    suspensionActiveFrom: {
      type: String,
      required: false,
    },
    hasPendingReview: {
      type: Boolean,
      required: false,
    },
  },
  computed: {
    formattedActiveFromDate: function () {
      const date = new Date(this.suspensionActiveFrom)
      return date.toLocaleDateString(
        'en-GB',
        { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' },
      )
    },
  },
  data () {
    return {
      expandDialog: false,
    }
  },
}
</script>
