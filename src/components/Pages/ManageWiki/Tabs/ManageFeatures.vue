<template>
  <v-content>
    <FederatedProperties :wikiId="this.wikiId" />
  </v-content>
</template>

<script>
import FederatedProperties from '../Features/FederatedProperties.vue'

export default {
  name: 'ManageFeatures',
  components: { FederatedProperties },
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

</style>
