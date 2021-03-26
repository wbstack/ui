<template>
  <v-card>
    <v-card-title>Set Skin</v-card-title>
    <v-card-text>
      <v-select
        :items="items"
        label="Skin"
        placeholder="Pick a Skin"
        hint="The default skin is Vector."
        persistent-hint
        prepend-icon="web"
        v-model="skin"
        :disabled="inFlight"
        :error-messages="error"
      ></v-select>
    </v-card-text>
    <v-card-actions>
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" @click="doSetSkin">Set Skin</v-btn>
        </template>
        <span>It may take up to 10 seconds for changes to be reflected on your wiki</span>
      </v-tooltip>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'Skin',
  props: [
    'wikiId'
  ],
  data () {
    return {
      items: [
        'Vector',
        'Modern',
        'Timeless'
      ],
      skin: '',
      inFlight: false,
      error: ''
    }
  },
  created () {
    const skin = this.$store.state.wikis.currentWikiSettings.wgDefaultSkin
    this.skin = skin.charAt(0).toUpperCase() + skin.slice(1)
  },
  methods: {
    doSetSkin () {
      const wiki = this.wikiId
      // API needs the skin ID which is lower case..
      const value = this.skin.toLowerCase()

      this.$store
        .dispatch('updateSkin', { wiki, value })
        .then(() => {
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
