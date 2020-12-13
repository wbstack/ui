<template>
    <v-content>
      <v-card>
        <v-toolbar dark :color=state.color>
          <v-toolbar-title>Email Verification</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          {{state.message}}
        </v-card-text>
      </v-card>
    </v-content>
</template>

<script>

const STATES = Object.freeze({
  PENDING: { color: 'primary', message: 'Verifying...' },
  EXPIRED_TOKEN: { color: 'orange', message: 'Verification token expired, or you are already verified!' },
  FAILED: { color: 'red', message: 'Verification failed for unknown reason!' },
  VERIFIED: { color: '', message: 'Email verified!' }
})

export default {
  name: 'EmailVerification',
  computed: {},
  data () {
    return {
      state: this.$store.getters.currentUser.verified ? STATES.VERIFIED : STATES.PENDING
    }
  },
  created () {
    if (!this.$store.getters.currentUser.verified) {
      this.$api.verifyEmail({ token: this.$route.params.token })
        .then(message => this.success())
        .catch(expired => this.fail(expired))
    }
  },
  methods: {
    success (message) {
      this.state = STATES.VERIFIED
      this.$store.dispatch('markAsVerified', {})
    },
    fail (expired) {
      if (expired) {
        this.state = STATES.EXPIRED_TOKEN
      } else {
        this.state = STATES.FAILED
      }
    }
  }
}
</script>

<style>
</style>
