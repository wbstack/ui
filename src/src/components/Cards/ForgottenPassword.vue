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
        name="reset"
        label="Email address"
        type="email"
        required
        v-model="email"
        :disabled="inFlight"
        :error-messages="error"
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn @click="reset" color="primary" :disabled="inFlight">{{buttonText}}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'ForgottenPasswordCard',
  props: [
    'title',
    'buttonText'
  ],
  data () {
    return {
      email: '',
      error: '',
      inFlight: false
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
    reset () {
      this.inFlight = true
      let email = this.email
      this.error = ''

      this.$store
        .dispatch('forgottenPassword', { email })
        .then(() => this.$router.push('/'))
        .catch(err => {
          console.log(err.response)
          this.error = 'Something went wrong.'
          this.inFlight = false
        })
    }
  }
}
</script>

<style lang="css" scoped>
</style>
