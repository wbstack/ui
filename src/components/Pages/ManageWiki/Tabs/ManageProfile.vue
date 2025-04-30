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
                <Profile :wikiId="this.wikiId"/>
              </v-col>
            </v-row>
          </v-col>
          <!--Col 2-->
          <v-col>

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
  import Profile from '~/components/Pages/ManageWiki/Cards/Profile'
  
  export default {
    name: 'ManageWiki',
    components: {
      Details,
      Profile,
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
  