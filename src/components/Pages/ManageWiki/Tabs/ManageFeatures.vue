<template>
  <v-main>
    <div class="space"></div>
    <EntityMapping :wikiId="wikiId"/>
    <div class="space"></div>
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
.space {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
