<template>
  <div class="wrapper border border-light md-layout">
      <div class="md-layout-item md-alignment-center-center" >
        <form @submit.prevent="login">
          <h2>Log in to your account.</h2>
          <!-- TODO allow email or username -->
          <md-field v-bind:class="{ 'md-invalid':error }">
            <label for="inputEmail">Email</label>
            <md-input :disabled="loggingIn" v-model="email" id="inputEmail" name="Email address" type="email" required></md-input>
            <span class="md-error" v-if="error">Unable to log in</span>
          </md-field>
          <md-field v-bind:class="{ 'md-invalid':error }">
            <label for="inputPassword">Password</label>
            <md-input :disabled="loggingIn" v-model="password" id="inputPassword" name="Password" type="password" required></md-input>
            <span class="md-error" v-if="error">Unable to log in</span>
          </md-field>
          <!-- TODO link to TOS-->
          <p>By clicking the button below you accept out Terms of Service.</p>
          <div class="md-button-wrapper">
            <md-button :disabled="loggingIn" class="md-raised md-primary" type="submit">Log In</md-button>
          </div>
        </form>
        <div class="login-no-account-yet">
          <p>Not yet got an account?</p>
          <router-link to="/create-account">Create one now.</router-link>
        </div>
      </div>
  </div>
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
      localStorage.username = req.data.username
      localStorage.email = this.email
      this.$store.dispatch('login')
      this.$router.replace(this.$route.query.redirect || '/')
    },
    loginFailed () {
      this.loggingIn = false
      this.error = 'Login failed!'
      this.$store.dispatch('logout')
      delete localStorage.auth
      delete localStorage.email
      delete localStorage.username
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
  form {
    min-width: 200px;
    max-width: 500px;
    margin: 0 auto;
  }

  .md-button-wrapper{
    text-align: center;
  }

  .login-no-account-yet{
    align-items: center;
    text-align: center;
    margin: 0 auto;
  }

  .wrapper{
    padding-left: 10px;
    padding-right: 10px;
    margin: 0 auto;
  }

</style>
