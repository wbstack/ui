<template>
    <v-container fluid>
      <v-layout>
        <v-flex xs3>
          <v-container fluid>
            <v-layout column>
              <v-flex>
                <h4>Hi {{ currentUser.email }}!</h4>
              </v-flex>
              <v-flex>
                <v-card>
                  <v-toolbar>
                    <v-toolbar-title>Your Wikis</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                      <v-btn fab color="primary" to="/wikis/create"><v-icon dark>add</v-icon></v-btn>
                    </v-toolbar-items>
                  </v-toolbar>
                  <v-card-text>
                    <v-list>
                      <v-list-tile v-for="wiki in wikis" :key="wiki.id" :wiki="wiki">
                        <v-list-tile-content>
                          <a :href="wiki.homesrc">{{wiki.sitename}}</a>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-list>
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex>
                <v-card>
                  <v-toolbar>
                    <v-toolbar-title>Your Teams</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                    </v-toolbar-items>
                  </v-toolbar>
                  <v-card-text>
                    <p>Teams are not yet implemented.</p>
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
        <v-flex xs6>
          <h3>Recent activity</h3>
          <p>Not yet implemented</p>
        </v-flex>
        <v-flex xs3>
          <h4>Notices</h4>
          <p>Not yet implemented</p>
          <h4>Discover</h4>
          <p>Not yet implemented</p>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'LoggedIn',
  data () {
    return {
      wikis: []
    }
  },
  computed: {
    ...mapGetters({currentUser: 'currentUser'})
  },
  created () {
    this.$http.get('/wiki/list')
      .then(request => this.buildWikiList(request.data.data))
      .catch(() => { alert('Something went wrong!') })
  },
  methods: {
    buildWikiList (data) {
      this.wikis = data
    }
  },
  components: {}
}
</script>

<style scoped>

</style>
