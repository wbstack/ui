<template>
  <v-dialog v-model="open_dialog" width="auto" persistent>
    <v-card>
      <v-card-title>
        Confirm Deletion
      </v-card-title>
      <v-card-text class="align-start pb-4">
        Before you delete your Wikibase instance, <br/>
        please let us know the reason for your deletion.<br/>
        Please select all that apply.
      </v-card-text>
      <div class="px-4 pb-2">
        <v-checkbox
          class="ma-0" hide-details
          label="Was only used for testing"
          v-model="checkboxReasons"
          value="Was only used for testing"
        />
        <v-checkbox
          class="ma-0"
          hide-details
          label="Lacking essential
          functionality"
          v-model="checkboxReasons"
          value="Lacking essential functionality"
        />
        <v-checkbox
          class="ma-0"
          hide-details
          label="Too complex to work with"
          v-model="checkboxReasons"
          value="Too complex to work with"
        />
        <v-checkbox
          class="ma-0"
          hide-details
          label="Other reasons (please specify)"
          v-model="checkboxReasons"
          value="Other reason"
        />
      </div>
        <div class="px-4 align-self-stretch align-start">
          <p class="ma-0">Please elaborate:</p>
          <v-text-field
            class="ma-0"
            outlined
            dense
            hide-details
            v-model="freeformReason"
            placeholder="e.g. ran out of space to create new wiki"
          ></v-text-field>
        </div>
      <v-card-actions class="justify-end">
        <v-btn
          text
          @click='close'
        >Cancel</v-btn>
        <v-btn
          text
          @click="doDelete"
          variant="light"
          class="red--text"
        >Delete Wikibase</v-btn>
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
      open_dialog: true,
      checkboxReasons: [],
      freeformReason: ''
    }
  },
  methods: {
    doDelete () {
      const wiki = this.wikiId
      const deletionReasons = [...this.checkboxReasons]
      if (this.freeformReason) {
        deletionReasons.push(this.freeformReason)
      }
      this.$store
        .dispatch('deleteWiki', { wiki, deletionReasons })
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
