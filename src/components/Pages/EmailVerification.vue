<template>
    <v-main>
      <v-card>
        <v-toolbar dark :color=state.color>
          <v-toolbar-title>Email Verification</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          {{state.message}}
        </v-card-text>
        <v-card-text v-if="showLoginLink">
          <router-link to="/login">Log in to your account.</router-link>
        </v-card-text>
      </v-card>
    </v-main>
</template>

<script>

const STATES = Object.freeze({
  PENDING: { color: 'primary', message: 'Verifying...' },
  EXPIRED_TOKEN: { color: 'orange', message: 'Verification token expired, or you are already verified!' },
  FAILED: { color: 'red', message: 'Verification failed for unknown reason!' },
  VERIFIED: { color: '', message: 'Email verified!' },
})

export default {
  name: 'EmailVerification',
  computed: {
    showLoginLink () {
      return this.state === STATES.VERIFIED && !this.$store.getters.isLoggedIn
    },
  },
  data () {
    return {
      state: STATES.PENDING,
    }
  },
  created () {
    this.$api.verifyEmail({ token: this.$route.params.token })
      .then(() => this.success())
      .catch(expired => this.fail(expired))
  },
  methods: {
    success () {
      this.state = STATES.VERIFIED
      if (this.$store.getters.isLoggedIn) {
        this.$api.checkVerified()
          .then(verified => verified && this.$store.dispatch('markAsVerified'))
          .catch(err => console.error(err))
      }
    },
    fail (expired) {
      if (expired) {
        this.state = STATES.EXPIRED_TOKEN
      } else {
        this.state = STATES.FAILED
      }
    },
  },
}
</script>
