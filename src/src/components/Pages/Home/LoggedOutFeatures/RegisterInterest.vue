<template>
  <div>
  <p>Join the waiting list and receive updates</p>
  <v-layout row>
    <v-flex>
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
    </v-flex>
    <v-flex>
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
    </v-flex>
  </v-layout>
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
      if ( this.email == ''){
        this.error = 'An email must be provided'
        return
      }

      this.formDisabled = true
      this.error = ''
      this.buttonText = 'Submitting'
      this.$http.post('/interest/register', {email: this.email})
        .then(request => this.success(request))
        .catch((error) => this.fail(error))
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
