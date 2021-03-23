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
            v-model="userConfirmationInput"
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
  props: ['wikiId'],
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
      this.hideModal()
      // TODO This should go somehwere else
      this.$store
        .dispatch('enableFederatedProperties', { wiki })
        .then(() => this.$router.push('/dashboard'))
        .catch(err => {
          console.log(err.response)
          alert('Something went wrong.')
          this.$router.push('/dashboard')
        })
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
