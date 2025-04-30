<template>
    <v-card>
      <v-card-title>Intended use</v-card-title>
        <v-card-text>
            This information describes how you intend to use this Wikibase.
        </v-card-text>

        <v-alert type="warning" dense>
            No intended use selected for this instance. Please provide information on intended use.
        </v-alert>
        <v-card-text>
            What best describes how you intend to use this Wikibase?
            No answer selected
        </v-card-text>
        <v-card-text>
            How long do you plan to use this Wikibase?
            No answer selected
        </v-card-text>

    <v-card-actions>
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" @click="doSetIntendedUse">Set Intended Use</v-btn>
        </template>
      </v-tooltip>
    </v-card-actions>
    <Message ref="message" />
    </v-card>
  </template>
  
  <script>
  import Message from '../Features/Message.vue'
  
  export default {
    name: 'Profile',
    components: {
      Message
    },
    props: [
      'wikiId'
    ],
    data () {
      return {
        skins: [
          {
            value: 'vector',
            text: 'Vector'
          },
          {
            value: 'modern',
            text: 'Modern'
          },
          {
            value: 'timeless',
            text: 'Timeless'
          }
        ],
        skinId: '',
        message: false
      }
    },
    created () {
      this.skinId = this.$store.state.wikis.currentWikiSettings.wgDefaultSkin
    },
    computed: {
      skin () {
        return this.skins.find(skin => skin.value === this.skinId)
      }
    },
    methods: {
      doSetSkin () {
        const wiki = this.wikiId
        const value = this.skin.value
  
        this.$store
          .dispatch('updateSkin', { wiki, value })
          .then(() => {
            this.$refs.message.show('success', `Your intended  skin has been updated to ${this.skin.text}.`)
          })
          .catch(err => {
            console.error(err.response)
            this.$refs.message.show('error', 'Something went wrong while updating your default skin. Please try again.')
          })
      }
    }
  }
  </script>
  
  <style lang="css" scoped>
  </style>
  