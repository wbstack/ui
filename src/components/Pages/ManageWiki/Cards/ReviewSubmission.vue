<template>
  <v-card>
    <v-card-title>Submit for review</v-card-title>
    <v-card-subtitle>This instance is temporary. To keep it, submit it for review by the hosting policy review committee.</v-card-subtitle>
    <v-card-text>
      
      <v-form ref="form">
        <!--TODO: figure out best practice for required-->
        <!--TODO: figure out best practice for external link-->
        We need to know some details about your use case. The form to fill out these details is in an <a href="https://wikimedia.sslsurvey.de/WBC-Hosting-Policy-Review-Submission/?<wiki_id>">external survey tool</a>. Please submit your answers there and come back to this page. 
        <v-checkbox v-model="checkbox1"
      label="I confirm that I have filled out the questionnaire for this Wikibase in the external tool."></v-checkbox>
      <!--TODO: figure out best practice for external link, add CC0 link-->
      We require that the structured data hosted on the platform is in the public domain or released under CC0, and the license for the text in other namespaces allows commercial and non-commercial use and derivatives. 
      <v-checkbox v-model="checkbox2">
        <template v-slot:label>
          <!--TODO: figure out best practice for external link, add link dependent on wikiId-->
          I confirm that the licensing rules for this Wikibase are compliant with the requirements above and described on the <a href="https://anton12.wikibase.cloud/wiki/Project:Copyrights" target="_blank">Project:Copyrights</a> page.
        </template>
      </v-checkbox>
      <!--TODO: figure out best practice for external link, add link dependent on wikiId-->
      Visitors to your Wikibase should be able to understand what your project is about and whether they are welcome to contribute, reuse or refer to this data. We require making this clear in the information on the main or Project:About page. 
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
      <v-textarea outlined counter="1000" placeholder="Feel free to pass on any additional information to the review committee to support your submission."/>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <!--TODO: add status line; see how this works vs form validation-->
      <!--TODO: align right -->
      <v-btn color="primary">Submit for Review</v-btn>
    </v-card-actions>
  </v-card>

</template>

<script>

export default {
  name: 'ReviewSubmission',
  props: [
    'wikiId',
  ]
}
</script>

<style lang="css" scoped>

</style>
