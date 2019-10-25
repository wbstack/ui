<template>
    <v-content>
      <v-container fluid fill-height grid-list-xl >
        <v-layout>
            <template v-if="id != 0">
              <v-flex>
              <v-card>
                <v-toolbar>
                  <v-toolbar-title>
                    Details
                    <v-tooltip right>
                      <template v-slot:activator="{ on }">
                        <v-icon v-on="on">info_outline</v-icon>
                      </template>
                      <span>During Alpha if you would like to change the details please contact us.</span>
                    </v-tooltip>
                  </v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <!-- TODO display this data in a nice table? -->
                    <!-- TODO get status from the api? archived? deleted? pending delete? creating? upgrading?-->
                    <strong>Please check your emails for your log in details.</strong>
                    <span>Status: Published</span></br>
                    <span>Site Name: {{apiData['sitename']}}</span></br>
                    <span>Domain: {{apiData['domain']}}</span></br>
                    <span>Date Created: {{apiData['created_at']}}</span></br>

                    <!-- TODO actually get this from the API?-->
                    <!--<span>Tier: Free-->
                    <!--<v-tooltip right>-->
                      <!--<template v-slot:activator="{ on }">-->
                        <!--<v-icon small v-on="on">info_outline</v-icon>-->
                      <!--</template>-->
                      <!--<span>During Alpha only the Free tier is available.</span>-->
                    <!--</v-tooltip>-->
                    <!--</span></br>-->

                    <!-- TODO actually get a different app version?-->
                    <span>Application Version: {{apiData['wiki_db_version']['version']}}</span></br>
                    <template v-if="apiData['wiki_db_version']">
                      <span>Database Version: {{apiData['wiki_db_version']['version']}}</span>
                    </template>
                    <template v-else>
                      <span>Version: Unknown</span>
                    </template>
                  </br>
                </v-card-text>
              </v-card>
            </v-flex>
            <!-- TODO finish managers idea once alpha is done -->
            <!-- <v-flex>
              <v-card>
                <v-toolbar>
                  <v-toolbar-title>Managers</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <v-layout row>
                    <v-flex>
                      <v-text-field
                      id="inputAddManager"
                      name="manager"
                      label="Manager Email"
                      required
                      v-model="inputAddManager"
                      :disabled="inputAddManagerDisabled"
                      :error-messages="inputAddManagerError"
                      />
                    </v-flex>
                    <v-flex>
                      <v-btn icon small class="nomargin" @click="addManager()"><v-icon>add</v-icon></v-btn>
                    </v-flex>
                  </v-layout>
                  <v-list-tile v-for="manager in apiData['wiki_managers']" :key="manager.email" :manager="manager">
                    <v-list-tile-content>
                      <div class="fullwidth">
                        {{manager.email}}
                        <div class="rightfloat">
                          <v-btn icon small class="nomargin" @click="deleteManager(manager.email)"><v-icon>delete</v-icon></v-btn>
                        </div>
                      </div>
                  </v-list-tile-content>
                  </v-list-tile>

                </v-card-text>
              </v-card>
            </v-flex> -->
            <v-flex>
            <v-card>
              <v-toolbar>
                <v-toolbar-title>
                  Actions
                </v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <!-- TODO action to actually delete the site -->
                <span><v-btn @click="deleteSite" color="red">Delete site.</v-btn></span>
              </v-card-text>
            </v-card>
          </v-flex>
            </template>
            <template v-if="id == 0">
              <v-flex>
              <v-card>
                <v-toolbar dark color="primary">
                  <v-toolbar-title>Wiki Managment</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  No wiki for you to manage.
                </v-card-text>
              </v-card>
              </v-flex>
            </template>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
</template>

<script>
export default {
  name: 'ManageWiki',
  data () {
    return {
      id: 0,
      apiData: []
    }
  },
  computed: {},
  created () {
    this.id = this.$route.params.id
    // TODO get the data about the wiki if the user can see it...
    this.$http.post(
      '/wiki/details',
      { wiki: this.id }
    )
      .then(request => this.buildDataFromDetails(request.data.data))
      .catch(() => { alert('Failed to retrieve wiki details!') })
  },
  methods: {
    buildDataFromDetails (data) {
      this.apiData = data
    },
    addManager () {
      alert('Not yet implemented')
    },
    deleteManager () {
      alert('Not yet implemented')
    },
    deleteSite () {
      alert('Not yet implemented ;)')
    }
  }
}
</script>

<style scoped>
.rightfloat {
  float: right;
}
</style>
