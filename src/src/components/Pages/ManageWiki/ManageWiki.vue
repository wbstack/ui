<template>
  <v-content>
    <v-container class="fill-height" fluid>
      <v-row v-if="wikiId != 0">
        <h4>This page allows you to alter settings of the site, but it will not currently show you the current settings.</h4>
      </v-row>
      <v-row v-if="wikiId != 0">
        <!--Col 1-->
        <v-col>
          <v-row>
            <v-col>
              <Details :wikiId="this.wikiId"/>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <Skin :wikiId="this.wikiId"/>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <Logo :wikiId="this.wikiId"/>
            </v-col>
          </v-row>
        </v-col>
        <!--Col 2-->
        <v-col>
          <v-row>
            <v-col>
              <Registration :wikiId="this.wikiId"/>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <Wikibase :wikiId="this.wikiId"/>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <Delete :wikiId="this.wikiId"/>
        </v-col>
      </v-row>
      <v-row v-if="wikiId == 0">
        <v-col>
          <v-card>
            <v-toolbar dark color="primary">
              <v-toolbar-title>Wiki Management</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              No wiki for you to manage.
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
  import Details from '@/components/Pages/ManageWiki/Cards/Details'
  import Logo from '@/components/Pages/ManageWiki/Cards/Logo'
  import Skin from '@/components/Pages/ManageWiki/Cards/Skin'
  import Registration from '@/components/Pages/ManageWiki/Cards/Registration'
  import Wikibase from '@/components/Pages/ManageWiki/Cards/Wikibase'
  import Delete from '@/components/Pages/ManageWiki/Cards/Delete'

  export default {
    name: 'ManageWiki',
    components: {
      Details,
      Logo,
      Skin,
      Registration,
      Wikibase,
      Delete
    },
    data() {
      return {
        wikiId: 0
      }
    },
    created() {
      this.wikiId = this.$route.params.id
    }
  }
</script>

<style scoped>
</style>
