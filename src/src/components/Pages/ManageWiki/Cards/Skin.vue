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
      <v-btn @click="doSetSkin">Set Skin</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    name: 'Skin',
    props: [
      'wikiId',
    ],
    data () {
      return {
        items: [
          'Vector',
          'Modern',
          'Timeless',
        ],
        skin: '',
        inFlight: false,
        error: ''
      }
    },
    methods: {
      doSetSkin () {
        let wiki = this.wikiId
        // API needs the skin ID which is lower case..
        let value = this.skin.toLowerCase()

        this.$store
          .dispatch('updateSkin', { wiki, value })
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
