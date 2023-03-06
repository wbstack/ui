<template>
  <v-form @submit="reset">
    <v-card class="elevation-12">
      <v-toolbar dark color="primary">
        <v-toolbar-title>{{title}}</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-text-field
          id="inputPassword"
          prepend-icon="lock"
          name="password"
          label="Password"
          type="password"
          required
          v-model="password"
          :disabled="inFlight"
          :error-messages="error['password']"
        />
        <v-text-field
          id="inputPasswordConfirmation"
          prepend-icon="lock"
          name="passwordConfirmation"
          label="Confirm Password"
          type="password"
          required
          v-model="passwordConfirmation"
          :disabled="inFlight"
          :error-messages="error['passwordConfirmation']"
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn type="submit" color="primary" :disabled="inFlight">{{buttonText}}</v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
export default {
  name: 'ResetPasswordCard',
  props: [
    'title',
    'email',
    'token',
    'buttonText'
  ],
  data () {
    return {
      password: '',
      passwordConfirmation: '',
      error: [],
      hasError: false,
      inFlight: false
    }
  },
  created () {
    this.redirectIfLoggedIn()
  },
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn
    }
  },
  methods: {
    redirectIfLoggedIn () {
      if (this.isLoggedIn) {
        this.$router.replace(this.$route.query.redirect || '/dashboard')
      }
    },
    reset (evt) {
      evt.preventDefault()

      this.inFlight = true
      this.error = []

      // Check for matching confirmed password
      if (this.password !== this.passwordConfirmation) {
        this.error.password = 'Passwords do not match.'
        this.error.passwordConfirmation = 'Passwords do not match.'
        this.hasError = true
      }

      if (this.hasError) {
        this.inFlight = false
        return
      }

      const email = this.email
      const token = this.token
      const password = this.password
      const passwordConfirmation = this.passwordConfirmation

      this.$store
        .dispatch('resetPassword', { email, token, password, password_confirmation: passwordConfirmation })
        .then(() => {
          this.$router.push('/login')
        })
        .catch(err => {
          console.log(err.response)
          this.hasError = true

          if (err.response.data && err.response.data.errors) {
            if (err.response.data.errors.password) {
              this.hasError = true
              this.error.password = err.response.data.errors.password[0]
            }
            if (err.response.data.errors.password_confirmation) {
              this.hasError = true
              this.error.passwordConfirmation = err.response.data.errors.password_confirmation[0]
            }
          } else {
            this.error.password = 'Something went very wrong.'
            this.error.passwordConfirmation = 'Something went very wrong.'
          }

          this.inFlight = false
        })
    }
  }
}
</script>

<style lang="css" scoped>
</style>
