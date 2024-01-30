<template>
  <v-card>
    <v-card-title>Registration Options</v-card-title>
    <v-card-text>
      <p>Disable direct account creation and require the approval of new accounts by a site <a href="https://www.mediawiki.org/wiki/Bureaucrat">bureaucrat</a>.</p>
      <p>This is powered by the <a href="https://www.mediawiki.org/wiki/Extension:ConfirmAccount">ConfirmAccount</a> extension.</p>
      <v-switch
        v-model="requestAccount"
        label="Accounts must be requested"
        hide-details="auto"
        @change="toggle"
        :loading="inFlight"
        :disabled="inFlight"
      >
      </v-switch>
    </v-card-text>
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
      inFlight: false
    }
  },
  created () {
    this.requestAccount = this.$store.state.wikis.currentWikiSettings.wwExtEnableConfirmAccount
  },
  methods: {
    async toggle (enabled) {
      try {
        this.inFlight = true
        await this.$store.dispatch('updateSetting', { wiki: this.wikiId, setting: 'wwExtEnableConfirmAccount', value: enabled })
        await this.$store.dispatch('setEnableConfirmAccount', enabled)
      } catch (error) {
        console.log(error.response)
        alert('Something went wrong.')
        await this.$nextTick()
        this.requestAccount = !enabled
      } finally {
        this.inFlight = false
      }
    }
  }
}
</script>

<style lang="css" scoped>
</style>
