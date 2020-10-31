<template>
  <v-card>
    <v-card-title>Set Logo</v-card-title>
    <v-card-text>
      <v-file-input
        hint="Upload a square PNG logo that is at least 135x135 pixels."
        label="Logo"
        placeholder="Pick a Logo"
        prepend-icon="branding_watermark"
        accept="image/png"
        :show-size="true"
        :persistent-hint="true"
        @change="onLogoFileChanged"
      ></v-file-input>
    </v-card-text>
    <v-card-actions>
      <v-btn :disabled="this.selectedLogoFile === null" @click="doLogoUpload">Set Logo</v-btn>
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
        selectedLogoFile: null
      }
    },
    methods: {
      onLogoFileChanged (event) {
        this.selectedLogoFile = event;
      },
      doLogoUpload () {
        let wikiId = this.wikiId
        let file = this.selectedLogoFile
        let fileName = this.selectedLogoFile.name

        this.$store
          .dispatch('updateLogo', { wikiId, file, fileName })
          .then(() => {
            alert('Upload success!')
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
