<template>
    <v-content>
      <v-container class="fill-height" fluid >
        <v-row align="center" justify="center">
          <v-col>
            <v-card>
              <v-toolbar dark color="primary">
                <v-toolbar-title>Email Verification</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                {{state}}
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
</template>

<script>
export default {
  name: 'EmailVerification',
  computed: {},
  data () {
    return {
      state: "Verifying... Please don't leave the page.",
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
    },
    fail () {
      this.state = 'Verification failed!'
    }
  }
}
</script>

<style>
</style>
