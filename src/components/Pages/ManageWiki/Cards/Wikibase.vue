<template>
  <v-card>
    <v-card-title>Wikibase Options</v-card-title>
    <v-card-text>
      <h4>Value lengths</h4>
      <p>Longer than default lengths (which are used on Wikidata) is generally untested and might have some unexpected outcomes.</p>
      <p>The default values for both fo these fields is <strong>400 characters</strong>. The maximum you can set here is <strong>2500</strong></p>
      <v-text-field
        v-model="stringLengthString"
        label="String"
        :rules="[rules.min(400), rules.max(2500)]"
      ></v-text-field>
      <v-text-field
        v-model="stringLengthMonoText"
        label="Monolingual text"
        :rules="[rules.min(400), rules.max(2500)]"
      ></v-text-field>
      <h4>Multilang (term) lengths</h4>
      <p>Longer than default lengths (which are used on Wikidata) is generally untested and might have some unexpected outcomes.</p>
      <p>The default values for this field is <strong>250 characters</strong>. The maximum you can set here is <strong>2500</strong></p>
      <v-text-field
        v-model="stringLengthMultilang"
        :rules="[rules.min(250), rules.max(2500)]"
        label="Multilang (labels, descriptions and such)"
      ></v-text-field>
    </v-card-text>
    <v-card-actions>
      <v-btn :disabled="this.stringLengthString == '' && this.stringLengthMonoText == '' && this.stringLengthMultilang == ''" @click="doSubmit">Set Options</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'Wikibase',
  props: [
    'wikiId'
  ],
  data () {
    return {
      stringLengthString: '',
      stringLengthMonoText: '',
      stringLengthMultilang: '',
      inFlight: false,
      rules: {
        min (minNum) {
          return v => v >= minNum || `Minimum ${minNum} required`
        },
        max (maxNum) {
          return v => v <= maxNum || `Maximum ${maxNum} exceeded`
        }
      }
    }
  },
  created () {
    this.stringLengthString = this.$store.state.wikis.currentWikiSettings.wwWikibaseStringLengthString
    this.stringLengthMonoText = this.$store.state.wikis.currentWikiSettings.wwWikibaseStringLengthMonolingualText
    this.stringLengthMultilang = this.$store.state.wikis.currentWikiSettings.wwWikibaseStringLengthMultilang
  },
  methods: {
    doSubmit () {
      const wiki = this.wikiId
      const promises = []

      if (this.stringLengthString) {
        const setting = 'wwWikibaseStringLengthString'
        const value = this.stringLengthString
        promises.push(
          this.$store.dispatch('updateSetting', { wiki, setting, value })
        )
      }

      if (this.stringLengthMonoText) {
        const setting = 'wwWikibaseStringLengthMonolingualText'
        const value = this.stringLengthMonoText
        promises.push(
          this.$store.dispatch('updateSetting', { wiki, setting, value })
        )
      }

      if (this.stringLengthMultilang) {
        const setting = 'wwWikibaseStringLengthMultilang'
        const value = this.stringLengthMultilang
        promises.push(
          this.$store.dispatch('updateSetting', { wiki, setting, value })
        )
      }

      Promise.all(promises)
        .then(() => {
          alert('Update success!')
        })
        .catch(err => {
          console.log(err.response)
          alert('Something went wrong.')
        })
    }
  }
}
</script>

<style lang="css" scoped>
</style>
