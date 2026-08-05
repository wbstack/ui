<template>
  <v-snackbar
    :value="show"
    color="error"
    :timeout="timeout"
    @input="hide"
  >
    {{ message }}
    <template
      v-if="dismissible"
      v-slot:action="{ attrs }"
    >
      <v-btn
        icon
        v-bind="attrs"
        @click="hide"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  computed: {
    show: function () {
      return this.$store.getters.hasLatestError
    },
    dismissible: function () {
      return this.$store.getters.latestErrorDismissible
    },
    timeout: function () {
      return this.dismissible ? 5000 : -1
    },
    message: function () {
      return this.$store.getters.latestErrorMessage
    },
  },
  methods: {
    hide () {
      this.$store.dispatch('clearLatestError')
    },
  },
}
</script>
