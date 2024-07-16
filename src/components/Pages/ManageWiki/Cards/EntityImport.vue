<template>
  <v-form ref="form" @submit="doSubmit">
    <v-card>
      <v-card-title>Import base set of entities to your Wikibase instance</v-card-title>
      <v-card-text>
        You can import a preselected subset of items and properties to help you get started with your Wikibase instance.
        <a href="https://www.wikidata.org" target="_blank">See exact list of entities here.</a>
      </v-card-text>
      <v-card-actions>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" type="submit">Copy entities</v-btn>
          </template>
          <span>You can only import the base set once per Wikibase instance.</span>
        </v-tooltip>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
export default {
  name: 'EntityImport',
  props: [
    'wikiId'
  ],
  data () {
    return {}
  },
  created () {
  },
  methods: {
    doSubmit (evt) {
      evt.preventDefault()
    }
  }
}
</script>

<style lang="css" scoped>
</style>
