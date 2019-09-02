<template>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center column>
          <v-flex>
            <v-card>
              <v-toolbar dark color="primary">
                <v-toolbar-title>Email Verification</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                {{state}}
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
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
      .then(request => this.success())
      .catch((error) => this.fail(error))
  },
  methods: {
    success () {
      this.state = 'Successfully verified!'
    },
    fail () {
      this.state = 'Verification failed!'
    }
  }
}
</script>

<style>
</style>
