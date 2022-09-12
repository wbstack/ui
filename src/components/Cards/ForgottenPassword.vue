<template>
  <v-card class="elevation-12" max-width="512" >
    <v-toolbar dark color="primary">
      <v-toolbar-title>{{title}}</v-toolbar-title>
    </v-toolbar>
    <v-card-subtitle>Enter the email address associated with your account. We will email you a link to reset your password. </v-card-subtitle>

    <v-card-text>
      <v-form
      ref="form">
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
        :rules="[() => !!email || 'This field is required']"
        />
      </v-form>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="reset" color="primary" :disabled="inFlight">{{buttonText}}</v-btn>
      </v-card-actions>
      <v-alert class="mt-8 mr-2 ml-2" outlined type="error" border="left" v-if="error">
        There was a server error ( {{error}} ) sending email to <b>{{email}}</b>. Please double check it or try again later.
      </v-alert>
      <v-alert class="mt-8 mr-2 ml-2" outlined type="success" border="left" v-if="success">
        An email has been sent to <b>{{email}}</b>
      </v-alert>
      <div class="mr-2 ml-2" v-if="success">If you do not receive this email within a few minutes, check your spam folder or verify that you used the correct email address.</div>
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
      inFlight: false
    }
  },
  created () {
    this.redirectIfLoggedIn()
    this.$store.dispatch('clearForgottenPasswordState')
  },
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn
    },
    success: function () {
      return this.$store.getters.wasLastForgottenPasswordSubmitASuccess
    },
    error: function () {
      return this.$store.getters.lastForgottenPasswordError
    }
  },
  methods: {
    redirectIfLoggedIn () {
      if (this.isLoggedIn) {
        this.$router.replace(this.$route.query.redirect || '/dashboard')
      }
    },
    reset () {
      if ( this.$refs.form.validate() === false ) {
        return
      }
      this.inFlight = true
      const email = this.email

      this.$store
        .dispatch('forgottenPassword', { email })
    }
  }
}
</script>

<style lang="css" scoped>
</style>
