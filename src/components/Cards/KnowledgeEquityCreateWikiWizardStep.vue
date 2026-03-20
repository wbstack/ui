<template>
  <v-card class="elevation-12">
    <v-toolbar dark color="primary">
      <v-toolbar-title>{{ title }}</v-toolbar-title>
    </v-toolbar>

    <v-card-text>
      <v-form ref="form">
        <div class="text-body-1">
          We want to
          <a href="https://meta.wikimedia.org/wiki/Strategy/Wikimedia_movement/2017#Our_strategic_direction:_Service_and_Equity" target="_blank">
            support knowledge equity</a>
          in the Wikibase ecosystem and to understand who currently sees their Wikibase contributing towards it.
          We welcome open responses and any additional feedback via our <a href="/contact" target="_blank">contact form</a>
          in addition to the options provided below.
        </div>
        <v-radio-group
          label="Do you believe that this Wikibase contributes positively to knowledge equity in the Wikibase ecosystem in any way?"
          v-model="value.selectedOption"
          :error-messages="error"
          :rules="[() => !!value.selectedOption || 'Please select an option.']"
        >
          <template v-slot:label>
            <h3>Do you believe that this Wikibase contributes positively to knowledge equity in the Wikibase ecosystem in any way?</h3>
          </template>
          <v-radio value="yes" label="Yes, I believe it does"/>
          <v-radio value="no" label="No, I don't believe it does"/>
          <v-radio value="unsure" label="I'm not sure"/>
          <v-radio value="unsaid" label="I prefer not to say"/>
        </v-radio-group>

        <v-textarea
          class="mb-2"
          outlined
          placeholder="If you’d like, please tell us in what way(s). For example, through the knowledge it contributes and/or the people holding and sharing it."
          counter="3000"
          v-model="value.freeTextResponse"
          :rules="[() => value.freeTextResponse.length <= 3000 || 'Text must be 3000 characters or less.' ]"
        />
        <v-alert
          outlined
          text
          type="warning"
          icon="mdi-alert-outline"
        >
          Please avoid sharing any personal or sensitive information. This information will be visible to WMDE employees and external members of the <a href="https://www.mediawiki.org/wiki/Wikibase/Wikibase.cloud/Hosting_policy_draft_v0.1#4.7_Review_Committee" target="_blank">review committee</a>.
        </v-alert>
      </v-form>
    </v-card-text>

    <v-card-actions>
      <v-btn
        type="button"
        :disabled="inFlight"
        @click="previousStep"
      >
        &lt; Previous
      </v-btn>
      <v-btn
        type="button"
        color="primary"
        :disabled="inFlight"
        @click="submitForm"
      >
        Create Wiki
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'KnowledgeEquityCreateWikiWizardStep',
  props: {
    title: String,
    inFlight: Boolean,
    value: Object,
    error: Array
  },
  methods: {
    previousStep () {
      this.$emit('previous-step')
    },
    submitForm () {
      if (this.$refs.form.validate() === false) {
        return
      }

      this.$emit('submit')
    }
  }
}
</script>

<style lang="css" scoped>
.v-card__actions {
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 8px;
}
</style>
