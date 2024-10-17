<template>
  <v-card>
    <v-card-title>Set Skin</v-card-title>
    <v-card-text>
      <v-select
        :items="skins"
        label="Skin"
        placeholder="Pick a Skin"
        hint="The default skin is Vector."
        persistent-hint
        prepend-icon="mdi-web"
        :disabled="inFlight"
        :error-messages="error"
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
    <Message ref="message" />
  </v-card>
</template>

<script>
import Message from '../Features/Message.vue'

export default {
  name: 'Skin',
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
          this.$refs.message.show('success', `Your default skin has been updated to ${this.skin.text}.`)
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
