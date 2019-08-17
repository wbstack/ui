<template>
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center>
          <v-flex xs8>
            <template v-if="id != 0">
              <v-card>
                <v-toolbar dark color="primary">
                  <v-toolbar-title>Manage - {{apiData['sitename']}}</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <h3>Details</h3>
                    <p>Site Name: {{apiData['sitename']}}</p>
                    <p>Domain: {{apiData['domain']}}</p>
                    <p>Date Created: {{apiData['created_at']}}</p>
                    <template v-if="apiData['wiki_db_version']['version']">
                      <p>Version: {{apiData['wiki_db_version']['version']}}</p>
                    </template>
                    <template v-else>
                      <p>Version: Unknown</p>
                    </template>

                  <h3>Managers</h3>
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
            </template>
            <template v-if="id == 0">
              <v-card>
                <v-toolbar dark color="primary">
                  <v-toolbar-title>Wiki Managment</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  No wiki for you to manage.
                </v-card-text>
              </v-card>
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
      { wiki: this.id },
      {headers: {'Authorization': localStorage.auth}}
    )
      .then(request => this.buildDataFromDetails(request.data.data))
      .catch(() => { alert('Failed to retrieve wiki details!') })
  },
  methods: {
    buildDataFromDetails (data) {
      this.apiData = data
    },
    addManager() {
      alert('Not yet implemented')
    },
    deleteManager() {
      alert('Not yet implemented')
    }
  }
}
</script>

<style scoped>
.rightfloat {
  float: right;
}
</style>
