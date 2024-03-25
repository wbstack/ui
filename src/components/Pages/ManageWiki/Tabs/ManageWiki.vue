<template>
  <v-main>
    <v-container class="fill-height" fluid>
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
          <v-row>
            <v-col>
              <QuestyCaptcha :wikiId="this.wikiId"/>
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
  </v-main>
</template>

<script>
import Details from '~/components/Pages/ManageWiki/Cards/Details'
import Logo from '~/components/Pages/ManageWiki/Cards/Logo'
import Skin from '~/components/Pages/ManageWiki/Cards/Skin'
import Registration from '~/components/Pages/ManageWiki/Cards/Registration'
import Wikibase from '~/components/Pages/ManageWiki/Cards/Wikibase'
import Delete from '~/components/Pages/ManageWiki/Cards/Delete'
import QuestyCaptcha from '../Cards/QuestyCaptcha'
import ConfirmDelete from "@/components/Pages/ManageWiki/Cards/ConfirmDelete.vue";

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
    ConfirmDelete
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

</style>
