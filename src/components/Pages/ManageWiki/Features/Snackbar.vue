<template>
  <v-snackbar :color="status" elevation="24" v-model="visible">
    {{ text }}
    <template v-slot:action>
      <v-btn
        text
        variant="text"
        @click="hide"
      >
      Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      text: 'Hello, this is a snackbar message!',
      status: 'success'
    };
  },
  methods: {
    show (status, message) {
      this.status = status
      this.text = message
      this.visible = true

      console.log(message)
      console.log(status)
    },

    hide () {
      this.visible = false;
    }
  }
}
</script>

<style scoped>
</style>
