<!-- This is the final step in the flow. It warns the user about the temporary nature of the Wiki and that the policies they have already accepted still apply -->

<template>
  <v-card class="elevation-12">
    <v-toolbar dark color="primary">
      <v-toolbar-title>{{ title }}</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-form ref="inputForm" v-on:submit.prevent>
        <div class="text-h6">This Wikibase will go offline on 15 December 2026</div>
        unless it is submitted for review and approved.
        <v-alert border="left" colored-border color="primary">
          <p class="font-weight-bold">All Wikibases on our platform are temporary by default.</p>
          <p>Once you're confident you want to keep this Wikibase for more than 3 months, submit it for review.</p>
          <p>Some uses can't be approved for a longer stay - for example, primarily commercial or promotional projects, or content under non-free licenses. To make sure your use case qualifies, check the <a href="/hosting-policy">Hosting Policy</a> before you invest time in building anything.</p>
        </v-alert>
        
      </v-form>
      <RequiredCheckbox>I understand that this Wikibase will go offline on 15 December 2026 unless it is submitted for review and approved to stay.</RequiredCheckbox>
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
        :disabled="inFlight || policiesLoading || policiesError"
        @click="primaryBtnAction"
      >
        Create Wiki
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import RequiredCheckbox from './../Components/RequiredCheckbox.vue';
export default {
  name: 'SubmitCreateWikiWizardStep',
  components: {
    RequiredCheckbox
  },
  props: [
    "title"
  ]
}
</script>