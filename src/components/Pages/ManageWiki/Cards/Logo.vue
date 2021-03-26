<template>
  <v-card>
    <v-card-title>Set Logo</v-card-title>
    <v-card-text>
      <v-file-input
        hint="Upload a square PNG logo that is at least 135x135 pixels."
        label="Logo"
        prepend-icon="branding_watermark"
        accept="image/png"
        :show-size="true"
        :persistent-hint="true"
        @change="onLogoFileChanged"
      ></v-file-input>
      <v-img v-if="logo" :src="logo" max-width="135" />
    </v-card-text>
    <v-card-actions>
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
        <v-btn :disabled="this.selectedLogoFile === null" v-bind="attrs" v-on="on" @click="doLogoUpload">Set Logo</v-btn>
        </template>
        <span>It may take up to 10 seconds for changes to be reflected on your wiki</span>
      </v-tooltip>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'Logo',
  props: [
    'wikiId'
  ],
  data () {
    return {
      selectedLogoFile: null
    }
  },
  methods: {
    onLogoFileChanged (event) {
      this.selectedLogoFile = event
    },
    doLogoUpload () {
      const wikiId = this.wikiId
      const file = this.selectedLogoFile
      const fileName = this.selectedLogoFile.name

      this.$store
        .dispatch('updateLogo', { wikiId, file, fileName })
        .then(() => {
          alert('Upload success!')
        })
        .catch(err => {
          console.log(err.response)
          alert('Something went wrong.')
          this.$router.go()
        })
    }
  },
  computed: {
    logo () {
      return this.$store.state.wikis.currentWikiSettings.logoUrl
    }
  }
}
</script>

<style lang="css" scoped>
</style>
