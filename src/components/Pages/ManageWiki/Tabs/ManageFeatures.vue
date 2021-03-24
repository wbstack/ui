<template>
  <v-content>
    <FederatedProperties :wikiId="this.wikiId" />
    <v-divider class="space"></v-divider>
    <EntityMapping :wikiId="this.wikiId" />
  </v-content>
</template>

<script>
import FederatedProperties from '../Features/FederatedProperties.vue'
import EntityMapping from '../Features/EntityMapping.vue'

export default {
  name: 'ManageFeatures',
  components: { FederatedProperties, EntityMapping },

  data () {
    return {
      wikiId: 0
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
