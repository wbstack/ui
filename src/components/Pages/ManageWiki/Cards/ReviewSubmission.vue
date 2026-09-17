<!-- The component is shown to submit a review not to edit or view the status of an existing one-->
<template>
  <v-card>
    <v-card-title>Submit for review</v-card-title>
    <v-card-subtitle>This instance is temporary. To keep it, submit it for review by the hosting policy review committee.</v-card-subtitle>
    <v-card-text>

      <v-form v-model="isFormValid" ref="reviewForm">
        We need to know some details about your use case. The form to fill out these details is in an <external-link :url='"https://wikimedia.sslsurvey.de/WBC-Hosting-Policy-Review-Submission/?" + this.wikiId'>external survey tool</external-link>. Please submit your answers there and come back to this page.
      <RequiredCheckbox>
        I confirm that I have filled out the questionnaire for this Wikibase in the external tool.
      </RequiredCheckbox>
      We require that the structured data hosted on the platform is in the public domain or released under <ExternalLink url="https://creativecommons.org/publicdomain/zero/1.0/">CC0</ExternalLink>, and the license for the text in other namespaces allows commercial and non-commercial use and derivatives.
      <RequiredCheckbox>
        <!--TODO: add link dependent on wikiId-->
          I confirm that the licensing rules for this Wikibase are compliant with the requirements above and described on the <ExternalLink @click.stop url="https://anton12.wikibase.cloud/wiki/Project:Copyrights">Project:Copyrights</ExternalLink> page.
      </RequiredCheckbox>
      <!--TODO: add link dependent on wikiId-->
      Visitors to your Wikibase should be able to understand what your project is about and whether they are welcome to contribute, reuse or refer to this data. We require making this clear in the information on the <ExternalLink>main</ExternalLink> or <ExternalLink>Project:About</ExternalLink> page.
      <RequiredCheckbox>I confirm that the information describing the project to external users is visible on my Wikibase.</RequiredCheckbox>
      <RequiredCheckbox>I confirm that I intend to take further care of the instance and ensure its
                    compliance with Wikibase Cloud policies, stay reachable or pass my
                    responsibilities over to another manager with Terms of Use-based
                    responsibility.</RequiredCheckbox>
      <!--TODO: add rule to assert length or just hard limit? -->
      <v-textarea :value="additionalInformation" outlined maxlength="1000" counter="1000" no-resize placeholder="Feel free to pass on any additional information to the review committee to support your submission."/>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <span v-if="!isFormValid">Tick all four confirmations to submit.</span>
      <span v-if="isFormValid">Ready to submit.</span>
      <v-spacer/>
      <v-btn color="primary" v-on:click="submitReview">Submit for Review</v-btn>
    </v-card-actions>
  </v-card>

</template>

<script>
import ExternalLink from '../../../Components/ExternalLink.vue'
import RequiredCheckbox from '../../../Components/RequiredCheckbox.vue'

export default {
  name: 'ReviewSubmission',
  props: [
    'wikiId',
  ],
  components: {
    ExternalLink,
    RequiredCheckbox,
  },
  computed: {
    formUrl: function () {
    },
  },
  data: () => ({
    additionalInformation: '',
    isFormValid: false,
  }),
  methods: {
    submitReview: function () {
      this.$refs.reviewForm.validate()
      if (this.$refs.reviewForm.validate() === true) {
        this.$api.submitReview({ wikiId: this.wikiId, additionalInformation: this.additionalInformation })
      }
    },
  },
  // Add something here for what submitting should do.
}
</script>

<style lang="css" scoped>

</style>
