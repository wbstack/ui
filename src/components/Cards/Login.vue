<template>
  <v-card class="elevation-12 mt-16" width="477px">
    <v-toolbar dark color="primary">
      <v-toolbar-title>{{title}}</v-toolbar-title>
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
          :error-messages="error['email']"
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
          :error-messages="error['password']"
        />
      </v-form>
      <router-link to="/forgotten-password" style="text-decoration: none">Forgot your password?</router-link>
    </v-card-text>
    <v-card-actions class="pb-4 pr-4">
      <v-spacer></v-spacer>
      <v-btn class="pr-4 pl-4" @click="login" color="primary" :disabled="loggingIn">{{buttonText}}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'LoginCard',
  props: [
    'title',
    'buttonText'
  ],
  data () {
    return {
      email: '',
      password: '',
      error: [],
      loggingIn: false
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
    login () {
      this.loggingIn = true
      const email = this.email
      const password = this.password
      this.error = []
      this.$store
        .dispatch('login', { email, password })
        .then(() => this.$router.push('/dashboard'))
        .catch(err => {
          console.log(err.response)

          // If the api gave use details of the error, then use them
          if (err.response !== undefined &&
                err.response.data !== undefined &&
                err.response.data.errors !== undefined
          ) {
            if (err.response.data.errors.email) {
              this.error.email = err.response.data.errors.email[0]
            }
            if (err.response.data.errors.password) {
              this.error.password = err.response.data.errors.password[0]
            }
          } else {
            this.error.email = 'Could not log in.'
            this.error.password = 'Could not log in.'
          }

          this.loggingIn = false
        })
    }
  }
}
</script>

<style lang="css" scoped>
</style>
