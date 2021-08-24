<template>
  <v-card color="#fad1d0">
    <v-card-title>Delete Site</v-card-title>
    <v-card-text>
      Selecting Confirm Deletion will permanently delete the selected Wikibase instance.<br>
      All data associated with this instance will be purged permanently in 30 days.<br>
      <br>
      The domain will <strong>not</strong> be available for reuse.
    </v-card-text>
    <v-card-actions>
      <v-btn v-if="!expandDelete" @click="expandDelete = true" color="red">Delete site</v-btn>
      <v-btn v-if="expandDelete" @click="expandDelete = false" color="blue">Cancel deletion</v-btn>
      <v-btn v-if="expandDelete" @click="doDelete" color="red">Confirm deletion</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'Delete',
  props: [
    'wikiId'
  ],
  data () {
    return {
      expandDelete: false
    }
  },
  methods: {
    doDelete () {
      const wiki = this.wikiId

      this.$store
        .dispatch('deleteWiki', { wiki })
        .then(() => this.$router.push('/dashboard'))
        .catch(err => {
          console.log(err.response)
          alert('Something went wrong.')
          this.$router.push('/dashboard')
        })
    }
  }
}
</script>

<style lang="css" scoped>
</style>
