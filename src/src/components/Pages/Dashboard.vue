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
          <p>Join the telegram group <a target="_blank" rel="noopener noreferrer" href="https://t.me/joinchat/FgqAnxNQYOeAKmyZTIId9g">here</a>.</p>
          <h4>Known limitations</h4>
          <p>You can not:</p>
          <ul>
            <li>Upload a custom logo</li>
            <li>Delete Wikis (please request this on telegram)</li>
          </ul>
        </v-flex>
        <v-flex xs3>
          <BlogPostList headerElement="h4" ></BlogPostList>
          <HeadedSpanList headerElement="h4" headerText="Manual Stats (March)" :items="stats" ></HeadedSpanList>
          <HeadedSpanList headerElement="h4" headerText="Notices" emptyText="Not yet implemented" ></HeadedSpanList>
          <HeadedSpanList headerElement="h4" headerText="Recent activity" emptyText="Not yet implemented" ></HeadedSpanList>
          <HeadedSpanList headerElement="h4" headerText="Discover" emptyText="Not yet implemented" ></HeadedSpanList>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import BlogPostList from '@/components/Content/BlogPostList'
import HeadedSpanList from '@/components/Elements/HeadedSpanList'

export default {
  name: 'Dashboard',
  components: {
    HeadedSpanList,
    BlogPostList
  },
  data () {
    return {
      'stats': [
        'Users: 80',
        'Wikis: 150',
        'Edits: 160k'
      ]
    }
  },
  computed: {
    currentUser: function () {
      return this.$store.getters.currentUser
    },
    wikis: function () {
      return this.$store.getters.wikis
    }
  },
  created () {
    this.$store.dispatch('refreshWikis')
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
