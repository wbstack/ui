<template>
  <v-card>
    <v-card-title>Registration Options</v-card-title>
    <v-card-text>
      <p>Disable direct account creation and require the approval of new accounts by a site <a href="https://www.mediawiki.org/wiki/Bureaucrat">bureaucrat</a>.</p>
      <p>This is powered by the <a href="https://www.mediawiki.org/wiki/Extension:ConfirmAccount">ConfirmAccount</a> extension.</p>
      <v-switch
        v-model="requestAccount"
        label="Accounts must be requested"
      >
      </v-switch>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="doSubmit">Set Options</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'Registration',
  props: [
    'wikiId'
  ],
  data () {
    return {
      requestAccount: false,
      inFlight: false,
      error: ''
    }
  },
  methods: {
    doSubmit () {
      const wiki = this.wikiId
      const promises = []

      const setting = 'wwExtEnableConfirmAccount'
      const value = this.requestAccount
      promises.push(
        this.$store.dispatch('updateSetting', { wiki, setting, value })
      )

      Promise.all(promises)
        .then(() => {
          alert('Update success!')
          this.$router.go()
        })
        .catch(err => {
          console.log(err.response)
          alert('Something went wrong.')
          this.$router.go()
        })
    }
  }
}
</script>

<style lang="css" scoped>
</style>
