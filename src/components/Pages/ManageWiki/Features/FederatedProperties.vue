<template>
  <v-form ref="form" v-model="valid">
    <v-card color="#fad1d0">
      <v-card-title>Federated properties</v-card-title>
      <v-card-text>
      Federated properties allows you to use the properties of Wikidata on your Wikibase instance.<br>
      If you turn this on, and confirm the warning, any existing properties on your wikibase will no longer be accessible!
      </v-card-text>
      <v-card-actions>
        <v-btn @click="showModal" color="red">Enable Federated Properties</v-btn>
      </v-card-actions>
    </v-card>
    <v-dialog v-model="dialog" width="500" v-if="dialog">
      <v-card>
        <v-toolbar flat dark color="primary">
            <v-toolbar-title>Change Federated properties settings</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon dark @click="hideModal">
              <v-icon>close</v-icon>
            </v-btn>
          </v-toolbar>
        <br />
        <v-card-text>If you turn this on, and confirm the warning, any existing properties on your wikibase will no longer be accessible!</v-card-text>
        <v-card-text>
          <v-text-field
            :label="`Please type ${userConfirmationString} to confirm`"
            :rules="[rules.match]"
          ></v-text-field>
        </v-card-text>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="confirmAction">I understand</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-form>
</template>

<script>
export default {
  name: 'FederatedProperties',
  props: ['wikiId', 'setting'],
  data () {
    return {
      valid: false,
      dialog: false,
      userConfirmationString: 'wbstack-important-change',
      rules: {
        match: (value) =>
          value === this.userConfirmationString || 'Please enter the confirmation'
      }
    }
  },
  methods: {
    enableFeature () {
      const wiki = this.wikiId
      const setting = 'wikibaseFedPropsEnable'
      const value = 1

      this.$store.dispatch('updateSetting', { wiki, setting, value })
        .then(() => this.hideModal())
        .catch(err => {
          console.log(err.response)
          alert('Something went wrong.')
          this.$router.push('/dashboard')
        })

      this.hideModal()
    },
    confirmAction () {
      const formValidation = this.$refs.form.validate()
      if (formValidation) {
        this.enableFeature()
      }
    },
    hideModal () {
      this.dialog = false
    },
    showModal () {
      this.dialog = true
    }
  }
}
</script>

<style lang="css" scoped>
</style>
