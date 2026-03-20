<template>
  <v-card class="elevation-12">
    <v-toolbar dark color="primary">
      <v-toolbar-title>{{ title }}</v-toolbar-title>
    </v-toolbar>

    <v-card-text>
      <v-form ref="form">
        <div>
          We want to
          <a href="https://meta.wikimedia.org/wiki/Strategy/Wikimedia_movement/2017#Our_strategic_direction:_Service_and_Equity" target="_blank">
            support knowledge equity
          </a>
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
            <div>Do you believe that this Wikibase contributes positively to knowledge equity in the Wikibase ecosystem in any way?</div>
          </template>
          <v-radio value="yes" label="Yes, I believe it does"/>
          <v-radio value="no" label="No, I don't believe it does"/>
          <v-radio value="unsure" label="I'm not sure"/>
          <v-radio value="unsaid" label="I prefer not to say"/>
        </v-radio-group>
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
