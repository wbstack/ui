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
          <h3>Welcome to WBStack</h3>
          <p>WBStack is currently in Alpha</p>
          <p>WMDE work around “Wikibase as a Service” is planned during the second half of 2020</p>
          <p>For more info contact <a href="mailto:samantha.alipio@wikimedia.de">Samantha Alipio</a></p>
          <p>Feel free to try out the platform!</p>
          <p>Create wikis using the + button to the left</p>
          <p>Stay up to date with the blog posts on the right</p>
          <p>Join the telegram group <a href="https://t.me/joinchat/FgqAnxNQYOeAKmyZTIId9g">here</a>.</p>
          <h4>Known limitations</h4>
          <p>You can not:</p>
          <ul>
            <li>Upload a custom logo</li>
            <li>Delete Wikis (please request this on telegram)</li>
          </ul>
        </v-flex>
        <v-flex xs3>
          <h4>Blog Posts</h4>
          <ul>
            <li><a href="https://addshore.com/2020/01/wbstack-infrastructure/">Infrastructure overview</a></li>
            <li><a href="https://addshore.com/2019/11/wbstack-november-review">November review</a></li>
            <li><a href="https://addshore.com/2019/11/an-introduction-to-wbstack/">October introduction</a></li>
          </ul>
          <h4>Manual Stats (March)</h4>
          <ul>
            <li><span>Users: 80</span></li>
            <li><span>Wikis: 150</span></li>
            <li><span>Edits: 160k</span></li>
          </ul>
          <h4>Notices</h4>
          <span>Not yet implemented</span>
          <h4>Recent activity</h4>
          <span>Not yet implemented</span>
          <h4>Discover</h4>
          <span>Not yet implemented</span>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    currentUser: function () {
      return this.$store.getters.currentUser
    },
    wikis: function () {
      return this.$store.getters.wikis
    },
  },
  created () {
    this.$store.dispatch('refreshWikis');
  }
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
