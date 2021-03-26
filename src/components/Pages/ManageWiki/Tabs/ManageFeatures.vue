<template>
  <v-main>
    <div class="space"></div>
    <v-banner elevation="6" icon="open_in_new">
       <a href="https://docs.google.com/forms/d/e/1FAIpQLSfXI4SmbNVV0cF5gxpUalHYhvmrRudbALr5fmTjMxLnUihXug/viewform?usp=sf_link" target="_blank">
          Please give Wikimedia Germany feedback
        </a>
        on Federated Properties to help direct future development efforts.
    </v-banner>
    <div class="space"></div>
    <EntityMapping :wikiId="wikiId"/>
    <div class="space"></div>
    <FederatedProperties :wikiId="wikiId" />
  </v-main>
</template>

<script>
import FederatedProperties from '../Features/FederatedProperties.vue'
import EntityMapping from '../Features/EntityMapping.vue'

export default {
  name: 'ManageFeatures',
  components: { FederatedProperties, EntityMapping },
  data () {
    return {
      wikiId: null
    }
  },

  created () {
    this.wikiId = this.$route.params.id
  }
}
</script>

<style scoped>
.space {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
