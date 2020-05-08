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
      state: "Verifying...",
      color: "primary",
      token: 0
    }
  },
  created () {
    this.token = this.$route.params.token
    this.$http.post(
      '/user/verifyEmail',
      { token: this.token }
    )
      .then(request => this.success(request))
      .catch((error) => this.fail(error))
  },
  methods: {
    success (request) {
      this.state = request.data.message
      this.color = 'green';
      this.$store.dispatch( 'markAsVerified', {} )
    },
    fail (error) {
      if(error.response.status === 422) {
        this.state = 'Verification token expired, or you are already verified!'
        this.color = 'orange';
      } else {
        this.state = 'Verification failed for unknown reason!'
        this.color = 'red';
      }
    }
  }
}
</script>

<style>
</style>
