<template>
    <v-content>
      <v-container class="fill-height" fluid >
        <v-row>
            <template v-if="id != 0">
              <v-col>
                <v-row>
                  <v-col>
                    <v-card>
                      <v-card-title>
                        Details
                        <v-spacer></v-spacer>
                        <v-tooltip right>
                          <template v-slot:activator="{ on }">
                            <v-icon v-on="on">info_outline</v-icon>
                          </template>
                          <span>During Alpha if you would like to change these details please contact us.</span>
                        </v-tooltip>
                      </v-card-title>
                      <v-card-text>
                        <strong>Please check your emails for your log in details.</strong><br/>
                        <span>Status: Published</span><br/>
                        <span>Site Name: {{apiData['sitename']}}</span><br/>
                        <span>Domain: <a target="_blank" rel="noopener noreferrer" :href="'//' + apiData['domain']" >{{apiData['domain']}}</a></span><br/>
                        <span>Date Created: {{apiData['created_at']}}</span><br/>

                        <!-- TODO actually get this from the API?-->
                        <!--<span>Tier: Free-->
                        <!--<v-tooltip right>-->
                        <!--<template v-slot:activator="{ on }">-->
                        <!--<v-icon small v-on="on">info_outline</v-icon>-->
                        <!--</template>-->
                        <!--<span>During Alpha only the Free tier is available.</span>-->
                        <!--</v-tooltip>-->
                        <!--</span><br/>-->

                        <!-- TODO actually get a different app version?-->
                        <span>Application Version: {{apiData['wiki_db_version']['version']}}</span><br/>
                        <template v-if="apiData['wiki_db_version']">
                          <span>Database Version: {{apiData['wiki_db_version']['version']}}</span>
                        </template>
                        <template v-else>
                          <span>Version: Unknown</span>
                        </template>
                        <br/>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
            </v-col>
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
            <v-col>
              <v-row><v-col>
                <v-card>
                  <v-card-title>Set Logo</v-card-title>
                  <v-card-text>
                    <v-file-input
                      hint="Upload a square PNG logo that is at least 135x135 pixels."
                      label="Logo"
                      placeholder="Pick a Logo"
                      prepend-icon="branding_watermark"
                      accept="image/png"
                      :show-size="true"
                      :persistent-hint="true"
                      @change="onLogoFileChanged"
                    ></v-file-input>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn :disabled="this.selectedLogoFile === null" @click="doLogoUpload">Set Logo</v-btn>
                  </v-card-actions>
                </v-card>
              </v-col></v-row>
              <v-row><v-col>
                <v-card color="#fad1d0">
                  <v-card-title>Delete Site</v-card-title>
                  <v-card-text>
                    This will permanently delete the selected wiki.<br>
                    The used domain will not immediately be available for re use.
                  </v-card-text>
                  <v-card-actions>
                    <v-btn v-if="!expandDelete" @click="expandDelete = true" color="red">Delete site</v-btn>
                    <v-btn v-if="expandDelete" @click="expandDelete = false" color="blue">Cancel deletion</v-btn>
                    <v-btn v-if="expandDelete" @click="doDelete" color="red">Confirm deletion</v-btn>
                  </v-card-actions>
                </v-card>
              </v-col></v-row>
          </v-col>
            </template>
            <template v-if="id == 0">
              <v-col>
              <v-card>
                <v-toolbar dark color="primary">
                  <v-toolbar-title>Wiki Managment</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  No wiki for you to manage.
                </v-card-text>
              </v-card>
              </v-col>
            </template>
        </v-row>
      </v-container>
    </v-content>
</template>

<script>
export default {
  name: 'ManageWiki',
  data () {
    return {
      id: 0,
      apiData: [],
      selectedLogoFile: null,
      expandDelete: false
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
    doDelete () {
      let wiki = this.id

      this.$store
        .dispatch('deleteWiki', { wiki })
        .then(() => this.$router.push('/dashboard'))
        .catch(err => {
          console.log(err.response)
          alert('Something went wrong.')
          this.$router.push('/dashboard')
        })
    },
    onLogoFileChanged (event) {
      this.selectedLogoFile = event;
    },
    doLogoUpload () {
      let wiki = this.id
      let file = this.selectedLogoFile
      let fileName = this.selectedLogoFile.name

      this.$store
        .dispatch('updateLogo', { wiki, file, fileName })
        .then(() => {
          alert('Upload success!')
          this.$router.go()
        })
        .catch(err => {
          console.log(err.response)
          alert('Something went wrong.')
          this.$router.go()
        })
    }
  }
}
</script>

<style scoped>
</style>
