
<template>
  <div>
    <div>
      {{wikiTitle}}
      <v-chip color="warning" outlined small>
        <v-icon class="mr-1" small>mdi-clock-outline</v-icon>
        Expiring soon
      </v-chip>
    </div>
    <div class="mt-2">
      <span class="warning--text">Will expire on {{ formattedActiveFromDate }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WikiDashboardListElement',
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
    }
  },
  computed: {
    formattedActiveFromDate: function () {
      const date = new Date(this.suspensionActiveFrom);
      return date.toLocaleDateString(
        'en-GB',
        { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' },
      )
    }
  },
}
</script>

