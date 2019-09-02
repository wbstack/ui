<template>
  <v-card class="elevation-12">
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
      <v-btn @click="login" color="primary" :disabled="loggingIn">{{buttonText}}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'

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
      error: '',
      loggingIn: false
    }
  },
  created () {
    this.redirectIfLoggedIn()
  },
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    }
  },
  methods: {
    redirectIfLoggedIn() {
      if (this.isLoggedIn) {
        this.$router.replace(this.$route.query.redirect || '/dashboard')
      }
    },
    login () {
      this.loggingIn = true
      let email = this.email;
      let password = this.password;
      this.$store
        .dispatch("login", { email, password })
        .then(() => this.$router.push("/dashboard"))
        .catch(err => {
          console.log(err);
          // TODO better error messages..
          this.error = 'Login failed!'
          this.loggingIn = false;
        })
    }
  }
}
</script>

<style lang="css" scoped>
</style>
