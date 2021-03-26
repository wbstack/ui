<template>
  <v-main>
    <EntityMapping :wikiId="wikiId" />
    <v-divider class="space"></v-divider>
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
