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
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" @click="doSubmit">Set Options</v-btn>
        </template>
        <span>It may take up to 10 seconds for changes to be reflected on your wiki</span>
      </v-tooltip>
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
  created () {
    this.requestAccount = this.$store.state.wikis.currentWikiSettings.wwExtEnableConfirmAccount
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
          this.$store.dispatch('setEnableConfirmAccount', value)
          alert('Update success!')
        })
        .catch(err => {
          console.log(err.response)
          alert('Something went wrong.')
        })
    }
  }
}
</script>

<style lang="css" scoped>
</style>
