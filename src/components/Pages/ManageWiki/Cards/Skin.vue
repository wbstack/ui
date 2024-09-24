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
        v-model="skin"
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
        'Vector legacy (2010)':'vector',
        'Vector (2022)':'vector-2022',
        'MinervaNeue':'minerva',
        'Modern':'modern',
        'Timeless':'timeless'
      },
      skin: '',
      message: false
    }
  },
  computed: {
    items() {
      return Object.entries(this.skins).map(([key, value]) => key);
    }
  },
  created () {
    const skin = this.$store.state.wikis.currentWikiSettings.wgDefaultSkin
    this.skin = Object.entries(this.skins).find(
      ([key, value]) => value === skin
    )?.[0]; // use first result from 'find' if it exists
  },
  methods: {
    doSetSkin () {
      const wiki = this.wikiId
      const value = this.skins[this.skin]

      this.$store
        .dispatch('updateSkin', { wiki, value })
        .then(() => {
          this.showMessage('success', 'Your default skin has been updated.')
        })
        .catch(err => {
          console.log(err.response)
          this.showMessage('error', `Something went wrong while saving your default skin. Please try again.`)
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
