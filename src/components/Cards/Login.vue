<template>
  <v-form @submit="login">
    <v-card class="elevation-12 mt-16 card-width">
      <v-toolbar dark color="primary">
        <v-toolbar-title>{{title}}</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-alert
          v-if="errorMessage"
          outlined
          color="error"
          type="error"
          dense
          border="left"
          :icon=false
        >
        {{ errorMessage }}
        </v-alert>
        <v-text-field
          id="inputEmail"
          prepend-icon="mdi-email"
          name="login"
          label="Email address"
          type="email"
          required
          v-model="email"
        />
        <v-text-field
          id="inputPassword"
          prepend-icon="mdi-lock"
          name="password"
          label="Password"
          type="password"
          required
          v-model="password"
          ref="passwordField"
        />
        <router-link to="/forgotten-password" style="text-decoration: none">Forgot your password?</router-link>
      </v-card-text>
      <v-card-actions class="pb-4 pr-4">
        <v-spacer></v-spacer>
        <v-btn class="pr-4 pl-4" type="submit" color="primary" :disabled="loggingIn">{{buttonText}}</v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
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
      errorMessage: '',
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
    login (evt) {
      evt.preventDefault()
      this.loggingIn = true
      const email = this.email
      const password = this.password
      this.errorMessage = ''

      this.$store
        .dispatch('login', { email, password })
        .then(() => this.$router.push('/dashboard'))
        .catch(err => {
          console.log(err.response)

          this.errorMessage = 'Incorrect username or password. Please try again.'

          this.password = ''

          this.$nextTick(() => {
            this.$refs.passwordField.$el.querySelector('input').focus()
          })

          this.loggingIn = false
        })
    }
  }
}
</script>

<style lang="css" scoped>
.card-width {
  width: 477px;
}

@media (max-width: 620px) {
  .card-width {
    width: calc(100%);
    margin-right: 110px;
  }
}
</style>
