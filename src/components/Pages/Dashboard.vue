<template>
  <v-main>
    <v-container class="fill-height" fluid >
      <v-row>
        <v-col cols="12" lg="4" md="4">
          <v-container fluid class="rightpaddingonly">
            <v-row>
              <v-col>
                <v-container>
                    <h3 class="ml-4">Your Wikibases</h3>
                    <v-list v-if="currentUser.verified == 1">
                      <v-list-item v-for="wiki in wikis" :key="wiki.id" :wiki="wiki">
                        <v-list-item-content>
                          <v-list-item-title>{{wiki.sitename}}</v-list-item-title>
                        </v-list-item-content>
                            <v-list-item-icon>
                              <v-btn icon small icontarget="_blank" rel="noopener noreferrer" :href="'//' + wiki.domain"><v-icon>mdi-home</v-icon></v-btn>
                            </v-list-item-icon>
                            <v-list-item-icon>
                              <v-btn icon small :to="{ name: 'TabSettings', params: { id: wiki.id } }"><v-icon>mdi-cog</v-icon></v-btn>
                            </v-list-item-icon>
                      </v-list-item>
                    </v-list>
                  <v-container v-if="status == 'loading' && count == 0">
                    <v-container class="d-flex justify-center">
                      <v-progress-circular indeterminate color="primary"></v-progress-circular>
                    </v-container>
                  </v-container>
                  <v-container v-if="currentUser.verified == 1">
                        <v-btn color="primary mb-2" dark class="space" v-bind="attrs" v-on="on" to="/wikis/create">
                            Create new Wiki
                        </v-btn>
                    <p class="caption">{{count}} of {{limit == false ? '∞' : limit}} Wikis used</p>
                  </v-container>
                  <v-card-text v-if="currentUser.verified == 0" >
                    <p><strong>Your email address is not yet verified.</strong></p>
                    <p>You can trigger another verification link from the <router-link to="/user">account page</router-link>.</p>
                  </v-card-text>
                </v-container>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
        <v-col cols="12" lg="6" md="5" class="mt-3">
          <h3>Welcome to wikibase.cloud</h3>
          <p>You can create and manage wikis from this central dashboard.</p>
          <p>Check out our <a href="https://www.mediawiki.org/wiki/Wikibase/Wikibase.cloud">cloud service documentation</a> as well as general documentation on <a href="https://www.mediawiki.org/wiki/Wikibase">Wikibase</a>.</p>
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
    },
    count: function () {
      return this.$store.getters.wikiCount
    },
    limit: function () {
      return this.$store.getters.wikiLimit
    },
    status: function () {
      return this.$store.getters.wikisStatus
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
