<template>
    <v-dialog v-model="open_dialog" width="auto">
        <v-card>
        <v-card-title>Status information</v-card-title>
        <v-card-text>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</v-card-text>
        <v-divider />
              <v-card-actions class="justify-end">
        <v-btn
          text
          @click='open_dialog = false'
        >Close</v-btn>
      </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
  name: 'WikiDashboardListDialog',
  props: [
    'suspensionReason',
  ],
  data () {
    return {
      open_dialog: true,
    }
  },
}
</script>
