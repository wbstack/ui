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
                    id="inputUsername"
                    prepend-icon="person"
                    name="username"
                    label="Username"
                    required
                    v-model="username"
                    :disabled="inFlight"
                    :error-messages="error['inputUsername']"
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
                    <p>By clicking the button below you accept out Terms of Service.</p>
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
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      error: false,
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
    resetErrorState() {
      this.error = []
    },
    setGeneralErrorState (error = 'Something went wrong.') {
      this.resetErrorState()
      this.error['inputEmail'] = error
      this.error['inputUsername'] = error
      this.error['inputPassword'] = error
      this.error['inputPasswordConfirmation'] = error
      this.inFlight = false
    },
    createaccount () {
      // Reset errors
      this.error = false
      this.inFlight = true

      // Check for matching confirmed password
      if (this.password !== this.passwordConfirmation) {
        this.error = []
        this.error['inputPassword'] = 'Passwords do not match.'
        this.error['inputPasswordConfirmation'] = 'Passwords do not match.'
        this.inFlight = false
        return
      }
      // TODO once emailing is setup add emailVerificationRequired option to user model in model-config.json
      this.$http.post(
        '/user/register',
        {
          username: this.username,
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
      if(error.response.data.email) {
        this.error['inputEmail'] = error.response.data.email[0]
      }
      if(error.response.data.username) {
        this.error['inputUsername'] = error.response.data.username[0]
      }
      if(!this.error){
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
      localStorage.username = req.data.username
      localStorage.email = this.email
      this.$store.dispatch('login')
      this.$router.replace(this.$route.query.redirect || '/')
    },
    loginFailed () {
      this.setGeneralErrorState('Post account creation authentication failed!')
      this.$store.dispatch('logout')
      delete localStorage.auth
      delete localStorage.username
      delete localStorage.email
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
