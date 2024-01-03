<template>
  <v-card>
    <v-card-title>Import from a Wikibase (Alpha)</v-card-title>
    <v-card-subtitle>This should only be performed on empty Wikibases to avoid an incomplete import.</v-card-subtitle>
    <v-card-text>
      <v-select
        :items="items"
        label="Template"
        prepend-icon="mdi-code-braces"
        v-model="template"
        :disabled="disabled"
        :error-messages="error"
      ></v-select>
      <div v-if="template">
        Explore <a :href="template.source" target="_blank">{{template.source}}</a>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          v-on="on"
          :disabled="!template || disabled"
          @click="doImport"
        >
          Import
        </v-btn>
        </template>
        <span>It may take a while for changes to be reflected on your wiki</span>
      </v-tooltip>
    </v-card-actions>
    <v-progress-linear
      v-if="disabled"
      color="deep-purple"
      height="10"
      indeterminate
    />
  </v-card>
</template>

<script>
export default {
  name: 'Template',
  props: [
    'wikiId'
  ],
  data () {
    return {
      items: [
        {
          text: 'Museum',
          value: {
            source: 'https://museum.wikibase.cloud',
            pages: []
          }
        },
        {
          text: 'Art Gallery',
          value: {
            source: 'https://gallery.wikibase.cloud',
            pages: []
          }
        }
      ],
      template: '',
      disabled: false,
      error: ''
    }
  },
  methods: {
    async doImport () {
      try {
        this.disabled = true
        const target = await this.$api.wikiDetails({ wiki: this.wikiId })
        console.log({
          target: target.domain,
          source: this.template.source,
          pages: this.template.pages
        })
      } catch (error) {
        console.log(error.response)
        alert('Something went wrong.')
      }
    }
  }
}
</script>

<style lang="css" scoped>
</style>
