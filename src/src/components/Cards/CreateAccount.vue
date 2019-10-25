<template>
  <v-card class="elevation-12">
    <v-toolbar dark color="primary">
      <v-toolbar-title>{{title}}</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-form>
          <v-text-field
          id="inputInvite"
          prepend-icon="email"
          name="invite"
          label="Invite code"
          v-model="invite"
          :disabled="inFlight"
          :error-messages="error['inputInvite']"
          />
        <v-text-field
        id="inputEmail"
        prepend-icon="email"
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
        prepend-icon="lock"
        name="password"
        label="Password"
        type="password"
        required
        v-model="password"
        :disabled="inFlight"
        :error-messages="error['inputPassword']"
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
        :error-messages="error['inputPasswordConfirmation']"
        />
        <p>Your password must be 8 characters long.</p>
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
                    Terms of Use
                  </a>
                </template>
                Opens in new window
              </v-tooltip>
              .
            </div>
          </template>
        </v-checkbox>
      </v-form>
      <p>
        This site is protected by reCAPTCHA and the Google
        <a href="https://policies.google.com/privacy">Privacy Policy</a> and
        <a href="https://policies.google.com/terms">Terms of Service</a> apply.
      </p>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
      @click="createaccount"
      color="primary"
      :disabled="inFlight"
      >
      {{buttonText}}
    </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'

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
      invite: '',
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
    setGeneralErrorState (error = 'Something went wrong.') {
      this.resetErrorState()
      this.hasError = true
      this.error['inputInvite'] = error
      this.error['inputEmail'] = error
      this.error['inputPassword'] = error
      this.error['inputPasswordConfirmation'] = error
      this.error['terms'] = error
      this.inFlight = false
    },
    createaccount () {
      // Request is processing
      this.inFlight = true

      // Reset errors
      this.resetErrorState()

      // Check for the terms
      if (this.terms === false) {
        this.hasError = true
        this.error['terms'] = 'You must accept the Terms of Service.'
      }

      // Check for matching confirmed password
      if (this.password !== this.passwordConfirmation) {
        this.hasError = true
        this.error['inputPassword'] = 'Passwords do not match.'
        this.error['inputPasswordConfirmation'] = 'Passwords do not match.'
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
        this.$http.post(
          '/user/register',
          {
            email: this.email,
            password: this.password,
            invite: this.invite,
            recaptcha: token
          })
          .then(request => this.createSuccessful(request))
          .catch((error) => this.createFailed(error))
      })
    },
    createSuccessful (req) {
      if (!req.data.success) {
        this.setGeneralErrorState()
        return
      }
      let email = this.email
      let password = this.password
      this.$store
        .dispatch('login', { email, password })
        .then(() => this.$router.push('/dashboard'))
        .catch(err => {
          console.log(err)
          // TODO better error messages..
          this.setGeneralErrorState('Post account creation authentication failed!')
          this.loggingIn = false
          this.inFlight = false
        })
    },
    createFailed (error) {
      this.resetErrorState()

      // If the api gave use details of the error, then use them
      if(error.response.data) {
        if (error.response.data.invite) {
          this.hasError = true
          this.error['inputInvite'] = error.response.data.invite[0]
        }
        if (error.response.data.email) {
          this.hasError = true
          this.error['inputEmail'] = error.response.data.email[0]
        }
        if (error.response.data.password) {
          this.hasError = true
          this.error['inputPassword'] = error.response.data.password[0]
        }
      }

      // Otherwise show a general error state
      if (!this.hasError) {
        this.setGeneralErrorState()
      }

      this.$store.dispatch('logout')
      this.inFlight = false
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
