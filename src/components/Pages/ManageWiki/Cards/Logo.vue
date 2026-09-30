<template>
  <v-card>
    <v-card-title>Set Logo</v-card-title>
    <v-card-text>
      <v-file-input
        hint="Upload a square SVG (recommended) or PNG of at least 135x135 pixels. Maximum file size: 2 MiB. SVGs must be self-contained and are sanitised for safety."
        label="Logo"
        prepend-icon="mdi-watermark"
        accept="image/png,image/svg+xml,.png,.svg"
        :show-size="true"
        :persistent-hint="true"
        @change="onLogoFileChanged"
      ></v-file-input>
      <v-img v-if="logo" :src="logo" max-width="135" />
    </v-card-text>
    <v-card-actions>
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
        <v-btn :disabled="selectedLogoFile === null" v-bind="attrs" v-on="on" @click="doLogoUpload">Set Logo</v-btn>
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
    'wikiId',
  ],
  data () {
    return {
      selectedLogoFile: null,
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
          console.error(err)
          const errors = err.response && err.response.data && err.response.data.errors
          alert(errors && errors.logo ? errors.logo.join('\n') : 'The logo could not be uploaded. Please try again.')
        })
    },
  },
  computed: {
    logo () {
      return this.$store.state.wikis.currentWikiSettings.wgLogo
    },
  },
}
</script>
