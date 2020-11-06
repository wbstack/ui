<template>
  <v-content>
    <v-container class="fill-height" fluid >
      <v-row>
        <v-col cols="3">
          <v-container fluid class="rightpaddingonly">
            <v-row>
              <v-col>
                <v-card>
                  <v-toolbar>
                    <v-toolbar-title>Your Wikis</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                      <v-btn v-if="currentUser.verified == 1" fab small color="primary" to="/wikis/create"><v-icon dark>add</v-icon></v-btn>
                      <v-btn v-if="currentUser.verified == 0" fab small color="red"><v-icon dark>warning</v-icon></v-btn>
                    </v-toolbar-items>
                  </v-toolbar>
                    <v-list v-if="currentUser.verified == 1">
                      <v-list-item v-for="wiki in wikis" :key="wiki.id" :wiki="wiki">
                        <v-list-item-content>
                          <v-list-item-title>{{wiki.sitename}}</v-list-item-title>
                        </v-list-item-content>
                            <v-list-item-icon>
                              <v-btn icon small icontarget="_blank" rel="noopener noreferrer" :href="'//' + wiki.domain"><v-icon>home</v-icon></v-btn>
                            </v-list-item-icon>
                            <v-list-item-icon>
                              <v-btn icon small :to="{ name: 'ManageWiki', params: { id: wiki.id } }"><v-icon>settings</v-icon></v-btn>
                            </v-list-item-icon>
                      </v-list-item>
                    </v-list>
                  <v-card-text v-if="currentUser.verified == 0" >
                    <p><strong>Your email address is not yet verified.</strong></p>
                    <p>You can trigger another verification link from the <router-link to="/user">account page</router-link>.</p>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
        <v-col cols="6">
          <h3>Welcome to WBStack</h3>
          <p>Feel free to try out the platform!</p>
          <p>Create wikis using the + button to the left</p>
          <p>Stay up to date with the blog posts on the right</p>
          <p>Join the telegram group <a target="_blank" rel="noopener noreferrer" href="https://t.me/joinchat/FgqAnxNQYOeAKmyZTIId9g">here</a>.</p>
          <h4>Wikimedia Germany & The Future</h4>
          <p>WMDE work around “Wikibase as a Service” is planned during the second half of 2020</p>
          <p>For more info contact <a href="mailto:samantha.alipio@wikimedia.de">Samantha Alipio</a></p>
        </v-col>
        <v-col cols="3">
          <BlogPostList headerElement="h4" ></BlogPostList>
          <HeadedSpanList headerElement="h4" headerText="Manual Stats (March)" :items="stats" ></HeadedSpanList>
          <HeadedSpanList headerElement="h4" headerText="Notices" emptyText="Not yet implemented" ></HeadedSpanList>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import BlogPostList from '~/components/Content/BlogPostList'
import HeadedSpanList from '~/components/Elements/HeadedSpanList'

export default {
  name: 'Dashboard',
  components: {
    HeadedSpanList,
    BlogPostList
  },
  data () {
    return {
      stats: [
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
