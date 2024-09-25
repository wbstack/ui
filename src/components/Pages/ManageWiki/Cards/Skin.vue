<template>
  <v-card>
    <v-card-title>Set Skin</v-card-title>
    <v-card-text>
      <v-select
        :items="skins"
        label="Skin"
        placeholder="Pick a Skin"
        hint="The default skin is Vector legacy (2010)."
        persistent-hint
        prepend-icon="mdi-web"
        v-model="skinId"
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
      skins: [
        {
          value: 'vector',
          text:  'Vector legacy (2010)'
        },
        {
          value: 'vector-2022',
          text:  'Vector (2022)'
        },
        {
          value: 'minerva',
          text:  'MinervaNeue'
        },
        {
          value: 'modern',
          text:  'Modern'
        },
        {
          value: 'timeless',
          text:  'Timeless'
        },
      ],
      skinId: '',
      message: false
    }
  },
  created () {
    const defaultSkin = this.$store.state.wikis.currentWikiSettings.wgDefaultSkin
    this.skinId = this.getSkinBySkinId(defaultSkin).value
  },
  methods: {
    getSkinBySkinId (skinId) {
      const skin = Object.entries(this.skins).find(
        ([key, skinObject]) => skinObject.value === skinId
      )?.[1]

      return skin
    },
    doSetSkin () {
      const wiki = this.wikiId
      const skin = this.getSkinBySkinId(this.skinId)
      const value = skin.value

      this.$store
        .dispatch('updateSkin', { wiki, value })
        .then(() => {
          this.showMessage('success', `Your default skin has been updated to ${skin.text}.`)
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
