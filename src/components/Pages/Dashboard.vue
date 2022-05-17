<template>
  <v-main>
    <v-container class="fill-height" fluid >
      <v-row>
        <v-col cols="12" lg="3" md="4">
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
                              <v-btn icon small :to="{ name: 'TabSettings', params: { id: wiki.id } }"><v-icon>settings</v-icon></v-btn>
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
        <v-col cols="12" lg="6" md="4">
          <h3>Welcome to wikibase.cloud</h3>
          <p>Feel free to try out the platform!</p>
          <p>Create wikis using the + button to the left</p>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
export default {
  name: 'Dashboard',
  data () {
    return {
      stats: [
        'Active Wikis: 100+',
        'Edits: 1.7+ million',
        'Pages: 1.3+ million'
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
