<template>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center column>
          <v-flex xs12 sm8 md4>
            <LoginCard title="Log in to your account" buttonText="Login"/>
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
import LoginCard from '@/components/Cards/Login'

export default {
  name: 'Login',
  components: {
      LoginCard
  },
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
