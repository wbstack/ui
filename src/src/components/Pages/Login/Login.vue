<template>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center column>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Log in to your account</v-toolbar-title>
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
                  :disabled="loggingIn"
                  :error-messages="error"
                  />
                  <v-text-field
                  id="inputPassword"
                  prepend-icon="lock"
                  name="password"
                  label="Password"
                  type="password"
                  required
                  v-model="password"
                  :disabled="loggingIn"
                  :error-messages="error"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="login" color="primary" :disabled="loggingIn">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
          <v-flex class="needs-padding">
            <p>Not got an account yet?</p>
            <router-link to="/create-account">Create one now.</router-link>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Login',
  computed: {
    ...mapGetters({ currentUser: 'currentUser' })
  },
  data () {
    return {
      email: '',
      password: '',
      error: false,
      loggingIn: false
    }
  },
  created () {
    this.checkCurrentLogin()
  },
  updated () {
    this.checkCurrentLogin()
  },
  methods: {
    login () {
      this.loggingIn = true
      this.$http.post('/auth/login', {email: this.email, password: this.password})
        .then(request => this.loginSuccessful(request))
        .catch(() => this.loginFailed())
    },
    loginSuccessful (req) {
      if (!req.data.token) {
        this.loginFailed()
        return
      }

      this.error = false
      localStorage.auth = req.data.token
      localStorage.email = req.data.email
      localStorage.isAdmin = req.data.isAdmin
      this.$store.dispatch('login')
      this.$router.replace(this.$route.query.redirect || '/')
    },
    loginFailed () {
      this.loggingIn = false
      this.error = 'Login failed!'
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
