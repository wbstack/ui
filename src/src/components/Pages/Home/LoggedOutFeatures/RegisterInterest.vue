<template>
  <v-form>
  <p>Register your interest to get updates</p>
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
    <!-- TODO inline the button on the end of the input line -->
  <v-btn @click="registerInterest" color="primary" :disabled="formDisabled">
    {{buttonText}}
  </v-btn>
  </v-form>
</template>

<script>

export default {
  name: 'RegisterInterest',
  components: {},
  data () {
    return {
      email: '',
      buttonText: 'Submit',
      error: false,
      formDisabled: false
    }
  },
  methods: {
    registerInterest () {
      this.formDisabled = true
      this.error = false
      this.buttonText = 'Submitting'
      this.$http.post('/interest/register', {email: this.email})
        .then(request => this.success(request))
        .catch(() => this.fail(error))
    },
    success (req) {
      if(!req.data.success){
        this.error = req.data.message
        this.formDisabled = false
        this.buttonText = 'Submit'
      } else {
        this.buttonText = 'Done'
      }
    },
    fail (error) {
      this.formDisabled = false
      this.buttonText = 'Submit'

      if (error.response.data.email) {
        this.error = error.response.data.email[0]
      } else {
        this.error = 'Something went wrong, please try again.'
      }
    }
  }
}
</script>

<style scoped>
</style>
