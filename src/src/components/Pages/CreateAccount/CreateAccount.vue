<template>
<div>

  <template>
      <v-content>
        <v-container fluid fill-height>
          <v-layout align-center justify-center column>
            <v-flex xs12 sm8 md4>
              <v-card class="elevation-12">
                <v-toolbar dark color="primary">
                  <v-toolbar-title>Lets get started</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <v-form>
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
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                  @click="createaccount"
                  color="primary"
                  :disabled="inFlight"
                  >
                  Create Account
                </v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
            <v-flex class="needs-padding">
              <p>Already have an account?</p>
              <router-link to="/login">Login now.</router-link>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
  </template>
</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'CreateAccount',
  computed: {
    ...mapGetters({ currentUser: 'currentUser' })
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
    setGeneralErrorState (error = 'Something went wrong.') {
      this.resetErrorState()
      this.hasError = true
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
      this.$http.post(
        '/user/register',
        {
          email: this.email,
          password: this.password
        })
        .then(request => this.createSuccessful(request))
        .catch((error) => this.createFailed(error))
    },
    createSuccessful (req) {
      if (!req.data.success) {
        this.setGeneralErrorState()
        return
      }
      // TODO this is C&P from Login.vue, can I reuse it?
      // TODO will this have to behave differently once email verification is in play?
      this.$http.post('/auth/login', {email: this.email, password: this.password})
        .then(request => this.loginSuccessful(request))
        .catch(() => this.loginFailed())
    },
    createFailed (error) {
      this.resetErrorState()
      if (error.response.data.email) {
        this.hasError = true
        this.error['inputEmail'] = error.response.data.email[0]
      }
      if (!this.hasError) {
        this.setGeneralErrorState()
      }
      this.$store.dispatch('logout')
      this.inFlight = false
    },
    loginSuccessful (req) {
      if (!req.data.token) {
        this.loginFailed()
        return
      }

      localStorage.auth = req.data.token
      localStorage.email = this.email
      localStorage.isAdmin = req.data.isAdmin
      this.$store.dispatch('login')
      this.$router.replace(this.$route.query.redirect || '/')
    },
    loginFailed () {
      this.setGeneralErrorState('Post account creation authentication failed!')
      this.$store.dispatch('logout')
      delete localStorage.auth
      delete localStorage.email
      delete localStorage.isAdmin
    },
    checkCurrentLogin () {
      if (this.currentUser) {
        this.$router.replace(this.$route.query.redirect || '/')
      }
    }
  }
}
</script>

<style lang="css" scoped>

.needs-padding{
  padding-top: 45px;
  text-align: center;
}

</style>
