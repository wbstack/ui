<template>
  <v-card>
    <v-card-title>Wikibase Options</v-card-title>
    <v-card-text>
      <h4>Value lengths (max characters)</h4>
      <p>Changing these values will allow your Wikibase to store values of longer lengths.</p>
      <p>Longer than default lengths (which are used on Wikidata) is generally untested and might have some unexpected outcomes.</p>
      <p>The default values for both fo these fields is <strong>400 characters</strong>. The maximum you can set here is <strong>2500</strong></p>
      <v-text-field
        v-model="stringLengthString"
        label="String"
      ></v-text-field>
      <v-text-field
        v-model="stringLengthMonoText"
        label="Monolingual text"
      ></v-text-field>
    </v-card-text>
    <v-card-actions>
      <v-btn :disabled="this.stringLengthString == '' && this.stringLengthMonoText == ''" @click="doSubmit">Set Options</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    name: 'Wikibase',
    props: [
      'wikiId',
    ],
    data () {
      return {
        stringLengthString: '',
        stringLengthMonoText: '',
        inFlight: false,
        error: ''
      }
    },
    methods: {
      doSubmit () {
        let wiki = this.wikiId
        let promises = [];

        if(this.stringLengthString) {
          let setting = 'wikibaseStringLengthString';
          let value = this.stringLengthString;
          promises.push(
            this.$store.dispatch('updateSetting', { wiki, setting, value })
          )
        }

        if(this.stringLengthMonoText) {
          let setting = 'wikibaseStringLengthMonolingualText';
          let value = this.stringLengthMonoText;
          promises.push(
            this.$store.dispatch('updateSetting', { wiki, setting, value })
          )
        }

        Promise.all(promises)
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
