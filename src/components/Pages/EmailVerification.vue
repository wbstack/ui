<template>
    <v-content>
      <v-card>
        <v-toolbar dark :color=color>
          <v-toolbar-title>Email Verification</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          {{state}}
        </v-card-text>
      </v-card>
    </v-content>
</template>

<script>
export default {
  name: 'EmailVerification',
  computed: {},
  data () {
    return {
      state: 'Verifying...',
      color: 'primary',
      token: 0
    }
  },
  created () {
    this.token = this.$route.params.token
    this.$api.verifyEmail({ token: this.token })
      .then(message => this.success(message))
      .catch(expired => this.fail(expired))
  },
  methods: {
    success (message) {
      this.state = message
      this.color = 'green'
      this.$store.dispatch('markAsVerified', {})
    },
    fail (expired) {
      if (expired) {
        this.state = 'Verification token expired, or you are already verified!'
        this.color = 'orange'
      } else {
        this.state = 'Verification failed for unknown reason!'
        this.color = 'red'
      }
    }
  }
}
</script>

<style>
</style>
