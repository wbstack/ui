<template>
  <v-card>
    <v-card-title>Set Skin</v-card-title>
    <v-card-text>
      <v-select
        :items="items"
        label="Skin"
        placeholder="Pick a Skin"
        hint="The default skin is Vector legacy (2010)."
        persistent-hint
        prepend-icon="mdi-web"
        v-model="skinName"
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
    <v-snackbar :color="message.status" elevation="24" v-model="message.show">
      {{ message.text }}
      <template v-slot:action>
        <v-btn
          text
          variant="text"
          @click="message.show = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
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
      skins: {
        'Vector legacy (2010)': 'vector',
        'Vector (2022)': 'vector-2022',
        MinervaNeue: 'minerva',
        Modern: 'modern',
        Timeless: 'timeless'
      },
      skinName: '',
      message: false
    }
  },
  computed: {
    items () {
      return Object.entries(this.skins).map(([skinName, skin]) => skinName)
    }
  },
  created () {
    const defaultSkin = this.$store.state.wikis.currentWikiSettings.wgDefaultSkin
    this.skinName = Object.entries(this.skins).find(
      ([skinName, skin]) => defaultSkin === skin
    )?.[0]
  },
  methods: {
    doSetSkin () {
      const wiki = this.wikiId
      const skin = this.skins[this.skinName]

      this.$store
        .dispatch('updateSkin', { wiki, skin })
        .then(() => {
          this.showMessage('success', `Your default skin has been updated to ${this.skinName}.`)
        })
        .catch(err => {
          console.log(err.response)
          this.showMessage('error', 'Something went wrong while updating your default skin. Please try again.')
        })
    },
    showMessage (status, message) {
      this.message = { status: status, text: message, show: true }
    }
  }
}
</script>

<style lang="css" scoped>
</style>
