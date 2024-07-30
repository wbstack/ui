<template>
  <v-form ref="form" @submit="doSubmit">
    <v-card>
      <v-card-title>Import base set of entities to your Wikibase instance</v-card-title>
      <v-card-text>
        You can import a preselected subset of items and properties to help you get started with your Wikibase instance.
      </v-card-text>
      <v-card-actions>
        <v-btn :disabled="hasPending || hasSuccess" type="submit">Copy entities</v-btn>
      </v-card-actions>
      <v-card-text v-if="hasError || (!hasPending && !hasSuccess && hasFailed)">
        <span class="font-italic">Your entity import failed. Please try again.</span>
      </v-card-text>
      <v-card-text v-if="!hasPending && hasSuccess">
        <span class="font-italic">You can only import the base set once per Wikibase instance.</span>
      </v-card-text>
      <v-card-text v-if="hasPending">
        <span class="font-italic">The wiki currently has an entity import in progress.</span>
      </v-card-text>
      <Interval
        v-if="hasPending"
        :callback="pollForStatus"
        :interval="3000"
      />
    </v-card>
  </v-form>
</template>

<script>
import Interval from '@/components/Util/Interval'

export default {
  components: {
    Interval
  },
  name: 'EntityImport',
  props: [
    'wikiId'
  ],
  computed: {
    hasError () {
      return this.$store.getters.currentWikiEntityImportError !== null
    },
    hasPending () {
      return this.$store.getters.currentWikiEntityImports.some((i) => i.status === 'pending')
    },
    hasSuccess () {
      return this.$store.getters.currentWikiEntityImports.some((i) => i.status === 'success')
    },
    hasFailed () {
      return this.$store.getters.currentWikiEntityImports.some((i) => i.status === 'failed')
    }
  },
  methods: {
    doSubmit (evt) {
      evt.preventDefault()
      this.$store.dispatch('triggerEntityImport', this.wikiId)
    },
    pollForStatus () {
      this.$store.dispatch('updateEntityImports', this.wikiId)
    }
  }
}
</script>

<style lang="css" scoped>
</style>
