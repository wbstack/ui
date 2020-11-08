<template>
  <v-card>
    <v-card-title>WikibaseManifest Options</v-card-title>
    <v-card-text>
      <h4>EquivEntities to Wikidata</h4>
      <p>Specify Entities on your Wikibase as equivalent to entities on Wikidata</p>
      <v-row v-for="item in items" v-bind:key="item.id">
        <v-text-field
          v-model="item.wikidataEntity"
          label="Wikidata Entity Id"
        ></v-text-field>
        <v-text-field
          v-model="item.localEntity"
          label="Local Entity Id"
        ></v-text-field>
      </v-row>
      <v-btn @click="addRow">Add Row</v-btn>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="doSubmit">Set Options</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'Wikibase',
  props: [
    'wikiId'
  ],
  data () {
    return {
      items: [{ id: 0, wikidataEntity: '', localEntity: '' }],
      inFlight: false,
      error: ''
    }
  },
  methods: {
    addRow () {
      const id = this.items.slice(-1)[0].id + 1
      this.items.push({ id, wikidataEntity: '', localEntity: '' })
    },
    doSubmit () {
      const wiki = this.wikiId
      const promises = []

      const setting = 'wikibaseManifestWikidataEquivEntities'
      const value = this.items
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
