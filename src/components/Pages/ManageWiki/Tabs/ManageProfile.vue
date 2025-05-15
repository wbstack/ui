<template>
  <v-main>
    <v-container>
      <v-row>
        <v-col class="card-column">
          <Details :wikiId="this.wikiId"/>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="card-column">
          <Profile :wikiId="this.wikiId"/>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import Details from '~/components/Pages/ManageWiki/Cards/Details'
import Profile from '~/components/Pages/ManageWiki/Cards/Profile'

export default {
  name: 'ManageWiki',
  components: {
    Details,
    Profile
  },
  computed: {
    wikiId: function () {
      return this.$route.params.id
    }
  }
}
</script>

<style scoped>
.v-main >>> .col {
  max-width: 656px;
  width: 100vw;
}
</style>
