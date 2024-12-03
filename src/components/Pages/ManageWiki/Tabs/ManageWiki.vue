<template>
  <v-main>
    <v-container>
      <v-row v-if="wikiId != 0">
        <!--Col 1-->
        <v-col>
          <v-row>
            <v-col class="card-column">
              <Details :wikiId="this.wikiId"/>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="card-column">
              <Skin :wikiId="this.wikiId"/>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="card-column">
              <Logo :wikiId="this.wikiId"/>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="card-column">
              <QuestyCaptcha :wikiId="this.wikiId"/>
            </v-col>
          </v-row>
        </v-col>
        <!--Col 2-->
        <v-col>
          <v-row>
            <v-col class="card-column">
              <Registration :wikiId="this.wikiId"/>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="card-column">
              <Wikibase :wikiId="this.wikiId"/>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="card-column">
              <EntityImport :wikiId="this.wikiId"/>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="card-column">
          <Delete :wikiId="this.wikiId"/>
        </v-col>
      </v-row>
      <v-row v-if="wikiId == 0">
        <v-col class="card-column">
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
  </v-main>
</template>

<script>
import Details from '~/components/Pages/ManageWiki/Cards/Details'
import Logo from '~/components/Pages/ManageWiki/Cards/Logo'
import Skin from '~/components/Pages/ManageWiki/Cards/Skin'
import Registration from '~/components/Pages/ManageWiki/Cards/Registration'
import Wikibase from '~/components/Pages/ManageWiki/Cards/Wikibase'
import EntityImport from '~/components/Pages/ManageWiki/Cards/EntityImport'
import Delete from '~/components/Pages/ManageWiki/Cards/Delete'
import QuestyCaptcha from '../Cards/QuestyCaptcha'

export default {
  name: 'ManageWiki',
  components: {
    QuestyCaptcha,
    Details,
    Logo,
    Skin,
    Registration,
    Wikibase,
    Delete,
    EntityImport
  },
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
  .red-notice-highlight{
    background-color: red;
  }
.v-main >>> .col {
  max-width: 656px;
}
</style>
