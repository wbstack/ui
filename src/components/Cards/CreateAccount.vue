<template>
  <v-form @submit="createaccount">
    <v-card class="elevation-12" max-width="477">
      <v-toolbar dark color="primary">
        <v-toolbar-title>{{title}}</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
          <v-text-field
            id="inputEmail"
            prepend-icon="mdi-email"
            name="login"
            label="Email address"
            type="email"
            required
            v-model="email"
            :disabled="inFlight"
            :error-messages="error['inputEmail']"
          />
          <v-text-field
            id="inputPassword"
            prepend-icon="mdi-lock"
            name="password"
            label="Password"
            type="password"
            required
            hint="Your password must be at least 8 characters long."
            v-model="password"
            :disabled="inFlight"
            :error-messages="error['inputPassword']"
          />
          <v-text-field
            id="inputPasswordConfirmation"
            prepend-icon="mdi-lock"
            name="passwordConfirmation"
            label="Confirm Password"
            type="password"
            required
            v-model="passwordConfirmation"
            :disabled="inFlight"
            :error-messages="error['inputPasswordConfirmation']"
          />
          <v-checkbox
            required
            v-model="terms"
            :disabled="inFlight"
            :error-messages="error['terms']"
          >
            <template v-slot:label>
              <div>
                I agree to the
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <a
                      target="_blank"
                      href="/terms-of-use"
                      @click.stop
                      v-on="on"
                    >
                      Terms of Use.
                    </a>
                  </template>
                  Opens in new window
                </v-tooltip>
              </div>
            </template>
          </v-checkbox>
        <p>
          This site is protected by reCAPTCHA and the Google
          <a target="_blank" href="https://policies.google.com/privacy">Privacy Policy</a> and
          <a target="_blank" href="https://policies.google.com/terms">Terms of Service</a> apply.
        </p>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          type="submit"
          color="primary"
          :disabled="inFlight"
          >
          {{buttonText}}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
export default {
  name: 'CreateAccountCard',
  props: [
    'title',
    'buttonText'
  ],
  components: {},
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn
    }
  },
  data () {
    return {
      email: '',
      password: '',
      passwordConfirmation: '',
      terms: false,
      hasError: false,
      error: [],
      inFlight: false
    }
  },
  created () {
    this.checkCurrentLogin()
  },
  updated () {
    this.checkCurrentLogin()
  },
  methods: {
    resetErrorState () {
      this.hasError = false
      this.error = []
    },
    setGeneralErrorState (error) {
      error = error || 'Something went wrong'
      this.resetErrorState()
      this.hasError = true
      this.error.inputEmail = error
      this.error.inputPassword = error
      this.error.inputPasswordConfirmation = error
      this.error.terms = error
      this.inFlight = false
    },
    createaccount (evt) {
      evt.preventDefault()
      // Request is processing
      this.inFlight = true

      // Reset errors
      this.resetErrorState()

      // Check for the terms
      if (this.terms === false) {
        this.hasError = true
        this.error.terms = 'You must accept the Terms of Service.'
      }

      // Check for matching confirmed password
      if (this.password !== this.passwordConfirmation) {
        this.hasError = true
        this.error.inputPassword = 'Passwords do not match.'
        this.error.inputPasswordConfirmation = 'Passwords do not match.'
      }

      // If the error are not empty then dont submit the request
      if (this.hasError) {
        this.inFlight = false
        return
      }

      // TODO once emailing is setup add emailVerificationRequired option to user model in model-config.json

      // TODO recaptcha check should be optional for development (env var switch?)
      // Recaptcha check
      this.$recaptcha('login').then((token) => {
        this.$api.register(
          {
            email: this.email,
            password: this.password,
            recaptcha: token
          })
          .then(success => this.createSuccessful(success))
          .catch(errors => {
            this.resetErrorState()

            // If the api gave use details of the error, then use them
            if (errors) {
              if (errors.email) {
                this.hasError = true
                this.error.inputEmail = errors.email[0]
              }
              if (errors.password) {
                this.hasError = true
                this.error.inputPassword = errors.password[0]
              }
            }

            // Otherwise show a general error state
            if (!this.hasError) {
              this.setGeneralErrorState(errors)
            }

            this.$store.dispatch('logout')
            this.inFlight = false
          })
      })
    },
    createSuccessful (success) {
      if (!success) {
        this.setGeneralErrorState()
        return
      }
      const email = this.email
      const password = this.password
      this.$store
        .dispatch('login', { email, password })
        .then(() => this.$router.push('/dashboard'))
        .catch(err => {
          console.log(err)
          // TODO better error messages..
          this.setGeneralErrorState('Post account creation authentication failed!')
          this.inFlight = false
        })
    },
    checkCurrentLogin () {
      if (this.isLoggedIn) {
        this.$router.replace(this.$route.query.redirect || '/dashboard')
      }
    }
  }
}
</script>

<style lang="css" scoped>
</style>
