<template>
  <v-form ref="form" @submit="doSubmit">
    <v-overlay
      :value="showOverlay"
    >
      <v-dialog width="500" v-model="showOverlay">
        <v-card>
          <v-card-title>
            Entities for import
          </v-card-title>
          <v-card-text>
            <h4 class="mb-0 mt-4">Properties</h4>
            <ul>
              <li><a target="_blank" rel="noopener nofollow" href="https://www.wikidata.org/wiki/Property:P25">Mother</a></li>
              <li><a target="_blank" rel="noopener nofollow" href="https://www.wikidata.org/wiki/Property:P22">Father</a></li>
              <li><a target="_blank" rel="noopener nofollow" href="https://www.wikidata.org/wiki/Property:P40">Child</a></li>
              <li><a target="_blank" rel="noopener nofollow" href="https://www.wikidata.org/wiki/Property:P18">Image</a></li>
              <li><a target="_blank" rel="noopener nofollow" href="https://www.wikidata.org/wiki/Property:P31">Instance of</a></li>
              <li><a target="_blank" rel="noopener nofollow" href="https://www.wikidata.org/wiki/Property:P279">Subclass of</a></li>
            </ul>
            <h4 class="mb-0 mt-4">Items</h4>
            <ul>
              <li><a href="https://www.wikidata.org/wiki/Q1" target="_blank" rel="noopener nofollow">Universe</a></li>
              <li><a href="https://www.wikidata.org/wiki/Q2" target="_blank" rel="noopener nofollow">World</a></li>
              <li><a href="https://www.wikidata.org/wiki/Q5" target="_blank" rel="noopener nofollow">Human</a></li>
              <li><a href="https://www.wikidata.org/wiki/Q64" target="_blank" rel="noopener nofollow">Berlin</a></li>
              <li><a href="https://www.wikidata.org/wiki/Q42" target="_blank" rel="noopener nofollow">Douglas Adams</a></li>
              <li><a href="https://www.wikidata.org/wiki/Q3107329" target="_blank" rel="noopener nofollow">The Hitchhiker's Guide to the Galaxy</a></li>
            </ul>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="primary"
              text
              @click="showOverlay = false"
            >
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-overlay>
    <v-card>
      <v-card-title>
        Import base entities
        <v-spacer />
        <v-btn plain right @click="showOverlay = true">
          <v-icon>
            mdi-information-outline
          </v-icon>
            More info
        </v-btn>
      </v-card-title>
      <v-card-text>
        You can import a curated subset of items and properties to help you get started with your Wikibase instance.
      </v-card-text>
      <v-card-actions>
        <v-btn :disabled="hasPending || hasSuccess" type="submit">Import entities</v-btn>
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
  data () {
    return {
      showOverlay: false
    }
  },
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
