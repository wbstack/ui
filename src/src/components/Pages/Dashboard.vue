<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout>
        <v-flex xs3>
          <v-container fluid class="rightpaddingonly">
            <v-layout column>
              <v-flex>
                <v-card>
                  <v-toolbar>
                    <v-toolbar-title>Your Wikis</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                      <v-btn fab small color="primary" to="/wikis/create"><v-icon dark>add</v-icon></v-btn>
                    </v-toolbar-items>
                  </v-toolbar>
                  <v-card-text>
                    <v-list>
                      <v-list-tile v-for="wiki in wikis" :key="wiki.id" :wiki="wiki">
                        <v-list-tile-content>
                          <div class="fullwidth">
                            {{wiki.sitename}}
                            <div class="rightfloat">
                              <v-btn icon small class="nomargin" :href="'//' + wiki.domain"><v-icon>home</v-icon></v-btn>
                              <v-btn icon small class="nomargin" :to="{ name: 'ManageWiki', params: { id: wiki.id } }"><v-icon>settings</v-icon></v-btn>
                            </div>
                          </div>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-list>
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
  </v-content>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'Dashboard',
  data () {
    return {
      wikis: []
    }
  },
  computed: {
    currentUser: function () {
      return this.$store.getters.currentUser
    }
  },
  created () {
    this.$http.post(
      '/wiki/mine'
    )
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

<style lang="css" scoped>
.fullwidth {
  width: 100%;
}
.rightfloat {
  float: right;
}
.nomargin {
  margin: 0;
}
.rightpaddingonly {
  padding-left: 0;
  padding-top: 0;
  padding-bottom: 0;
}
</style>
