<!-- This is the final step in the flow. It warns the user about the temporary nature of the Wiki and that the policies they have already accepted still apply -->

<template>
  <v-card class="elevation-12">
    <v-toolbar dark color="primary">
      <v-toolbar-title>{{ title }}</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-form ref="inputForm" v-on:submit.prevent>
        <div class="text-h6">This Wikibase will go offline on {{ suspensionDate }}</div>
        unless it is submitted for review and approved.
        <v-alert border="left" colored-border color="primary">
          <p class="font-weight-bold">All Wikibases on our platform are temporary by default.</p>
          <p>Once you're confident you want to keep this Wikibase for more than 3 months, submit it for review.</p>
          <p>Some uses can't be approved for a longer stay - for example, primarily commercial or promotional projects, or content under non-free licenses. To make sure your use case qualifies, check the <a href="/hosting-policy">Hosting Policy</a> before you invest time in building anything.</p>
        </v-alert>
      <RequiredCheckbox>I understand that this Wikibase will go offline on {{ suspensionDate }} unless it is submitted for review and approved to stay.</RequiredCheckbox>
      <!-- TODO: should we refactor this out into a separate reusable component? -->
      <div v-if="policiesError" class="body-2 red--text" >
          Failed to load policies. Please
          <a
            class="text-decoration-underline red--text"
            @click.prevent="getCurrentPolicies()"
          >click here</a>
          to retry.
        </div>
        <v-skeleton-loader
          v-else
          type="image"
          :loading="policiesLoading"
          height="50px"
        >
          <div class="body-2">
            Previously accepted
            <PolicyList
              :policies="policies"
              article=""
            />
            still apply.
          </div>
        </v-skeleton-loader>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn
        type="button"
        :disabled="inFlight"
        @click="$emit('previous-step')"
      >
        &lt; Previous
      </v-btn>

      <v-btn
        type="button"
        color="primary"
        :disabled="inFlight || policiesLoading || policiesError"
        @click="createWiki"
      >
        Create Wiki
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import PolicyList from '../Components/PolicyList'
import RequiredCheckbox from '../Components/RequiredCheckbox'

export default {
  name: 'SubmitCreateWikiWizardStep',
  components: {
    RequiredCheckbox,
    PolicyList,
  },
  props: {
    title: String,
    inFlight: Boolean,
  },
  computed: {
    suspensionDate () {
      const date = new Date()
      date.setDate(date.getDate() + 91)

      return date.toLocaleDateString(
        'en-GB',
        { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' },
      )
    },
  },
  methods: {
    createWiki () {
      if (this.$refs.inputForm.validate() === true) {
        this.$emit('submit')
      }
    },
    async getCurrentPolicies () {
      this.policiesLoading = true
      this.policiesError = false

      try {
        // TODO: Should we get this from the store?
        this.policies = await this.$api.getCurrentPolicies()
      } catch (error) {
        console.error(error)
        this.policiesError = true
      } finally {
        this.policiesLoading = false
      }
    },
  },
  data () {
    return {
      policies: [],
      policiesLoading: true,
      policiesError: false,
    }
  },
  created () {
    this.getCurrentPolicies()
  },
}
</script>
