<template>
  <v-card class="elevation-12" max-width="512" >
    <v-toolbar dark color="primary">
      <v-toolbar-title>{{title}}</v-toolbar-title>
    </v-toolbar>
    <v-card-subtitle>Enter the email address associated with your account. We will email you a link to reset your password. </v-card-subtitle>

    <v-card-text>
      <v-form>
        <v-text-field
        class="mr-2 ml-2"
        id="inputEmail"
        prepend-icon="email"
        name="reset"
        label="Email address"
        type="email"
        required
        v-model="email"
        :disabled="inFlight"
        />
      </v-form>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="reset" color="primary" :disabled="inFlight">{{buttonText}}</v-btn>
      </v-card-actions>
      <v-alert class="mt-8 mr-2 ml-2" outlined type="error" border="left" v-if="error">
        {{error}}
      </v-alert>
      <v-alert class="mt-8 mr-2 ml-2" outlined type="success" border="left" v-if="success">
        An email has been sent to <b>{{email}}</b>
      </v-alert>
      <div class="mr-2 ml-2" v-if="success">If you do not receive this email within a few minutes, check your spam folder or check that you used the correct email address.</div>
    </v-card-text>
    
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
      inFlight: false,
      success: false
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
      const email = this.email
      this.error = ''

      this.$store
        .dispatch('forgottenPassword', { email })
        .then(() => this.success = true)
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
