<template>
  <v-form ref="form" v-model="valid">
    <v-card elevation="1" class="padding" outlined>
      <v-card-title>Lexeme</v-card-title>
      <v-card-text>
      Lexeme allows modeling of lexical entities such as words and phrases.<br>
      <span v-if="isEnabled">If you turn this off, and confirm the warning, lexeme entities used on your wikibase will no longer be accessible, but will still appear as broken pages. You may want to delete all of your lexeme entities first.</span>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="showModal" color="red" v-if="isEnabled">Disable Lexeme</v-btn>
        <v-btn @click="enableFeature" v-else>Enable Lexeme</v-btn>
      </v-card-actions>
    </v-card>
    <v-dialog v-model="dialog" width="500" v-if="dialog">
      <v-card>
        <v-toolbar flat dark color="primary">
            <v-toolbar-title>Change Lexeme settings</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon dark @click="hideModal">
              <v-icon>close</v-icon>
            </v-btn>
          </v-toolbar>
        <br />
        <v-card-text>
          <span v-if="isEnabled">If you turn this off, and confirm the warning, lexeme entities used on your wikibase will no longer be accessible, but will still appear as broken pages. You may want to delete all of your lexeme entities first.</span>
        </v-card-text>
        <v-card-text>
          <v-text-field
            :label="`Please type ${userConfirmationString} to confirm`"
            :rules="[rules.match]"
          ></v-text-field>
        </v-card-text>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" v-bind="attrs" v-on="on" text @click="confirmAction">I understand</v-btn>
            </template>
            <span>It may take up to 10 seconds for changes to be reflected on your wiki</span>
          </v-tooltip>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-form>
</template>

<script>
export default {
  name: 'Lexeme',
  props: ['wikiId', 'setting'],
  data () {
    return {
      valid: false,
      dialog: false,
      userConfirmationString: 'wiki-important-change',
      rules: {
        match: (value) =>
          value === this.userConfirmationString || 'Please enter the confirmation'
      }
    }
  },
  computed: {
    isEnabled () {
      return this.$store.state.wikis.currentWikiSettings.wwExtEnableWikibaseLexeme
    }
  },
  methods: {
    enableFeature () {
      const wiki = this.wikiId
      const setting = 'wwExtEnableWikibaseLexeme'
      const value = !this.isEnabled

      this.$store.dispatch('updateSetting', { wiki, setting, value })
        .then(() => this.$store.dispatch('setLexemeEnabled', value))
        .catch(err => {
          console.log(err.response)
          alert('Something went wrong.')
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
