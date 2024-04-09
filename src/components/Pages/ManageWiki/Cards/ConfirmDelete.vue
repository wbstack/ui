<template>
  <v-dialog v-model="open_dialog" width="auto" persistent>
    <v-card>
      <v-card-title>
        Confirm Deletion
      </v-card-title>
      <v-card-text>
        Before you delete your wikibase instance, <br/>please let us know the reason for your deletion.<br/>
        Please select all that apply. </v-card-text>
      <v-card-text>
        <v-checkbox
          class="ma-0"
          id="testing"
          value="testing"
          v-model="checkedNames"
          @click="deletion_reason='Was only used for testing'"
          label="Was only used for testing"/>
        <v-checkbox
          class="ma-0"
          id="lackingFunctionality"
          value="lackingFunctionality"
          v-model="checkedNames"
          @click="deletion_reason='Lacking essential functionality'"
          label="Lacking essential functionality" />
        <v-checkbox
          class="ma-0"
          id="tooComplex"
          value="tooComplex"
          v-model="checkedNames"
          @click="deletion_reason='Too complex to work with'"
          label="Too complex to work with" />
        <div>
          <v-checkbox
            class="ma-0"
            id="otherReason"
            value="otherReason"
            v-model="checkedNames"
            @click="deletion_reason=''"
            label="Other reasons (please specify)" />
          <p class="ma-0 pa-0 black--text">Please elaborate:</p>
          <v-text-field
            class="ma-0 pa-0"
            variant="outlined"
            hide-details
            single-line
            placeholder="e.g. ran out of space to create new wiki"
          ></v-text-field>
        </div>
      </v-card-text>
      <v-card-actions class="">
        <v-spacer></v-spacer>
        <v-btn text @click='close'>Cancel</v-btn>
        <v-btn text @click="doDelete" variant="light" class="red--text">Delete Wikibase</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: 'ConfirmDelete',
  props: [
    'wikiId'
  ],
  data () {
    return {
      deletion_reason: 'false',
      open_dialog: true
    }
  },
  methods: {
    doDelete () {
      const wiki = this.wikiId
      const deletionReason = this.deletion_reason

      this.$store
        .dispatch('deleteWiki', { wiki, deletionReason })
        .then(() => this.$router.push('/dashboard'))
        .catch(err => {
          console.log(err.response)
          alert('Something went wrong.')
          this.$router.push('/dashboard')
        })
    },
    close () {
      this.$emit('close')
    }
  }
}
</script>
<style>
</style>
