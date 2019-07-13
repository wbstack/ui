<template>
  <div class="wrapper">
    <form @submit.prevent="createaccount">
      <h2>Let's get started.</h2>
      <md-field>
        <label for="inputEmail">Email address</label>
        <md-input :disabled="inFlight" v-model="email" id="inputEmail" name="Email address" type="email" required></md-input>
        <span class="md-error" v-if="error">Something is wrong with you input.</span>
      </md-field>
      <md-field>
        <label for="inputUsername">Username</label>
        <md-input :disabled="inFlight" v-model="username" id="inputUsername" name="Username" required></md-input>
        <span class="md-error" v-if="error">Something is wrong with you input.</span>
      </md-field>
      <md-field v-bind:class="{ 'md-invalid':error['inputPassword'] }">
        <label for="inputPassword">Password</label>
        <md-input :disabled="inFlight" v-model="password" id="inputPassword" name="Password" type="password" required></md-input>
        <span class="md-error" v-if="error['inputPassword']">{{error['inputPassword']}}</span>
      </md-field>
      <md-field v-bind:class="{ 'md-invalid':error['inputPasswordConfirmation']}">
        <label for="inputPasswordConfirmation">Confirm Password</label>
        <md-input :disabled="inFlight" v-model="passwordConfirmation" id="inputPasswordConfirmation" name="Confirm Password" type="password" required></md-input>
        <span class="md-error" v-if="error['inputPasswordConfirmation']">{{error['inputPasswordConfirmation']}}</span>
      </md-field>
      <!-- TODO link to TOS-->
      <p>By clicking the button below you accept out Terms of Service.</p>
      <md-button :disabled="inFlight" class="md-raised md-primary" type="submit">Create your account</md-button>
    </form>
    <div class="register-already-have-account">
      <p>Already have an account?</p>
      <router-link to="/login">Login now.</router-link>
    </div>
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
    setGeneralErrorState (error = 'Something went wrong.') {
      this.error = []
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
    createFailed (/* error */) {
      this.setGeneralErrorState()
      this.$store.dispatch('logout')
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
  form {
    min-width: 200px;
    max-width: 500px;
    margin: 0 auto;
  }

  .md-button{
    width: 100%;
  }

  .register-already-have-account{
    align-items: center;
    text-align: center;
    margin: 0 auto;
  }

  .wrapper {
    padding-left: 10px;
    padding-right: 10px;
    margin: 0 auto;
  }

</style>
