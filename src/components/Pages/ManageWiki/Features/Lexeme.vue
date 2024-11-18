<template>
  <v-col>
    <v-form ref="form" v-model="valid" @submit="handleSubmit" id="formLexeme">
      <v-card class="padding">
        <v-card-title>Lexeme</v-card-title>
        <v-card-text>
        Lexeme allows modeling of lexical entities such as words and phrases.<br>
        <span v-if="isEnabled">If you turn this off, and confirm the warning, lexeme entities used on your wikibase will no longer be accessible, but will still appear as broken pages. You may want to delete all of your lexeme entities first.</span>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="showModal" color="red" class="white--text" v-if="isEnabled">Disable Lexeme</v-btn>
          <v-btn v-else type="submit">Enable Lexeme</v-btn>
        </v-card-actions>
      </v-card>
      <v-dialog v-model="dialog" width="500" v-if="dialog">
        <v-card>
          <v-toolbar flat dark color="primary">
              <v-toolbar-title>Change Lexeme settings</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon dark @click="hideModal">
                <v-icon>mdi-close</v-icon>
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
            > {</v-text-field>
          </v-card-text>
          <v-divider>
          }</v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on" color="primary" type="submit" form="formLexeme">
                  I understand
                </v-btn>
              </template>
              <span>It may take up to 10 seconds for changes to be reflected on your wiki</span>
            </v-tooltip>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-form>
  </v-col>
</template>

<script>
export default {
  name: 'Lexeme',
  props: ['wikiId', 'setting'],
  data () {
    const data = {
      valid: false,
      dialog: false,
      userConfirmationString: 'wbstack-important-change',
      rules: {}
    }
    data.rules.match = (v) => {
      v = v && v.trim()
      return v === data.userConfirmationString || v === 'Please enter the confirmation'
    }
    return data
  },
  computed: {
    isEnabled () {
      return this.$store.state.wikis.currentWikiSettings.wwExtEnableWikibaseLexeme
    }
  },
  methods: {
    toggleSetting (validationPassed) {
      const updatedValue = !this.isEnabled
      if (updatedValue === false && !validationPassed) {
        // disabling the features requires user confirmation
        // which is checked by validating the form
        return
      }

      const wiki = this.wikiId
      const setting = 'wwExtEnableWikibaseLexeme'

      this.$store.dispatch('updateSetting', { wiki, setting, value: updatedValue })
        .then(() => this.$store.dispatch('setLexemeEnabled', updatedValue))
        .catch(err => {
          console.log(err.response)
          alert('Something went wrong.')
        })

      this.hideModal()
    },
    handleSubmit (e) {
      e.preventDefault()
      this.toggleSetting(this.$refs.form.validate())
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
