<template>
  <v-main>
    <EntityMapping :wikiId="wikiId"/>
    <Lexeme :wikiId="wikiId" />
  </v-main>
</template>

<script>
import Lexeme from '../Features/Lexeme.vue'
import EntityMapping from '../Features/EntityMapping.vue'

export default {
  name: 'ManageFeatures',
  components: { Lexeme, EntityMapping },
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
.v-main >>> .col {
  max-width: 912px;
}
</style>
