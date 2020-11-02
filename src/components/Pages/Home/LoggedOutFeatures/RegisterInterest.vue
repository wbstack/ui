<template>
  <div>
  <p>Join the waiting list for an invitation</p>
  <v-row >
    <v-col>
      <v-text-field
      id="inputEmail"
      prepend-icon="email"
      name="interest"
      label="Email address"
      type="email"
      required
      v-model="email"
      :disabled="formDisabled"
      :error-messages="error"
      />
    </v-col>
    <v-col>
      <v-btn
        depressed
        tile
        @click="registerInterest"
        class="ma-0"
        color="primary"
        :disabled="formDisabled"
        >
        {{buttonText}}
      </v-btn>
    </v-col>
  </v-row>
  </div>
</template>

<script>

export default {
  name: 'RegisterInterest',
  components: {},
  data () {
    return {
      email: '',
      buttonText: 'Submit',
      error: '',
      formDisabled: false
    }
  },
  methods: {
    registerInterest () {
      if (this.email === '') {
        this.error = 'An email must be provided'
        return
      }

      this.formDisabled = true
      this.error = ''
      this.buttonText = 'Submitting'
      this.$api.registerInterest({email: this.email})
        .then(() => this.success())
        .catch(error => this.fail(error))
    },
    success () {
      this.buttonText = 'Done'
    },
    fail (error) {
      this.formDisabled = false
      this.buttonText = 'Submit'
      this.error = error
    }
  }
}
</script>

<style scoped>
</style>
