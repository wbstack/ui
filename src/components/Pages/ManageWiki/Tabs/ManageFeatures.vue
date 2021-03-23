<template>
  <v-content>
    <FederatedProperties :wikiId="wikiId" />
  </v-content>
</template>

<script>
import FederatedProperties from '../Features/FederatedProperties.vue'

export default {
  name: 'ManageFeatures',
  components: { FederatedProperties },
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
</style>
