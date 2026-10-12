<template>
  <v-main>
    <v-container>
      <v-row>
        <v-col>
          <Details :wikiId="this.wikiId"/>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import Details from '~/components/Pages/ManageWiki/Cards/Details'

export default {
  name: 'ManageWiki',
  components: {
    Details,
  },
  computed: {
    wikiId: function () {
      return this.$route.params.id
    },
  },
}
</script>

<style scoped>
</style>
