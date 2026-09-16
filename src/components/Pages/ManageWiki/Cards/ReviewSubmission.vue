<!-- The component is shown to submit a review not to edit or view the status of an existing one-->
<template>
  <v-card>
    <v-card-title>Submit for review</v-card-title>
    <v-card-subtitle>This instance is temporary. To keep it, submit it for review by the hosting policy review committee.</v-card-subtitle>
    <v-card-text>
      
      <v-form ref="form">
        <!--TODO: figure out best practice for required-->
        We need to know some details about your use case. The form to fill out these details is in an <external-link :url='"https://wikimedia.sslsurvey.de/WBC-Hosting-Policy-Review-Submission/?" + this.wikiId'>external survey tool</external-link>. Please submit your answers there and come back to this page. 
        <v-checkbox v-model="checkbox1"
      label="I confirm that I have filled out the questionnaire for this Wikibase in the external tool."></v-checkbox>
      <!--TODO: figure out best practice for external link, add CC0 link-->
      We require that the structured data hosted on the platform is in the public domain or released under <ExternalLink url="https://creativecommons.org/publicdomain/zero/1.0/">CC0</ExternalLink>, and the license for the text in other namespaces allows commercial and non-commercial use and derivatives. 
      <v-checkbox v-model="checkbox2">
        <template v-slot:label>
          <!--TODO: add link dependent on wikiId, also link seems to be not clickable because it's part of selecting the checkbox-->
          I confirm that the licensing rules for this Wikibase are compliant with the requirements above and described on the<ExternalLink url="https://anton12.wikibase.cloud/wiki/Project:Copyrights">Project:Copyrights</ExternalLink> page.
        </template>
      </v-checkbox>
      <!--TODO: add link dependent on wikiId-->
      Visitors to your Wikibase should be able to understand what your project is about and whether they are welcome to contribute, reuse or refer to this data. We require making this clear in the information on the <ExternalLink>main</ExternalLink> or <ExternalLink>Project:About</ExternalLink> page. 
      <v-checkbox v-model="checkbox3">
        <template v-slot:label>
                    I confirm that the information describing the project to external users is
                    visible on my Wikibase.</template>
      </v-checkbox>
      <v-checkbox v-model="checkbox4">
        <template v-slot:label>
                    I confirm that I intend to take further care of the instance and ensure its
                    compliance with Wikibase Cloud policies, stay reachable or pass my
                    responsibilities over to another manager with Terms of Use-based
                    responsibility.
          </template>
      </v-checkbox>
      <!--TODO: add rule to assert length -->
      <v-textarea :value="additionalInformation" outlined counter="1000" placeholder="Feel free to pass on any additional information to the review committee to support your submission."/>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <!--TODO: add status line; see how this works vs form validation-->
      <!--TODO: align right -->
      <v-spacer/>
      <v-btn color="primary" v-on:click="submitReview">Submit for Review</v-btn>
    </v-card-actions>
  </v-card>

</template>

<script>
import ExternalLink from '../../../Components/ExternalLink.vue';


export default {
  name: 'ReviewSubmission',
  props: [
    'wikiId',
  ],
  components: {
    ExternalLink
  },
  computed: {
    formUrl: function () {
  }
  },
  data: () => ({
    additionalInformation: ''
  }),
  methods: {
    submitReview: function() {
      this.$api.submitReview({wikiId: this.wikiId, additionalInformation: this.additionalInformation})
    }
  }
  // Add something here for what submitting should do.
}
</script>

<style lang="css" scoped>

</style>
