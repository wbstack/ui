<template>
    <v-dialog v-model="open_dialog" width="auto">
      <v-card>
        <v-card-title>Status information</v-card-title>
        <v-card-text v-if="!hasPendingReview">EXpiring soon dialog</v-card-text>
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
export default {
  name: 'WikiDashboardListDialog',
  props: {
    hasPendingReview: {
      type: Boolean,
      required: false,
    },
  },
  data () {
    return {
      open_dialog: true,
    }
  },
  methods: {
    close () {
      this.$emit('close')
    },
  },
}
</script>
