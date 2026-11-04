<template>
  <v-main>
    <v-container>
      <!-- <h1>Dashboard</h1> -->
      <v-row>
        <v-col cols="">
          <h2>Your Wikibases</h2>

          <div v-if="status === 'loading' && count === 0" class="text-center">
            <v-progress-circular indeterminate color="primary" />
          </div>

          <template v-if="currentUser.verified === 0">
            <p><strong>Your email address is not yet verified.</strong></p>
            <p>
              You can trigger another verification link from the
              <router-link to="/user">account page</router-link>.
            </p>
          </template>

          <template v-else>
            <v-list>
              <v-list-item v-for="wiki in wikis" :key="wiki.id" :wiki="wiki" class="pl-0">
                <v-list-item-content>
                  <WikiDashboardListElement
                    :wikiTitle="wiki.sitename"
                    :wikiDomain="wiki.domain"
                    :wikiId="wiki.id"
                    :suspensionReason="wiki.latest_suspension.reason"
                    :suspensionActiveFrom="wiki.latest_suspension.active_from"
                    :hasPendingReview="wiki.has_pending_review"
                  />
                </v-list-item-content>

                <v-list-item-action>
                  <v-btn icon small :href="'//' + wiki.domain" target="_blank" aria-label="Open wiki">
                    <v-icon>mdi-home</v-icon>
                  </v-btn>
                </v-list-item-action>

                <v-list-item-action>
                  <v-btn icon small :to="{ name: 'TabSettingsProfileInner', params: { id: wiki.id } }" aria-label="Manage Wiki">
                    <v-icon>mdi-cog</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list>

            <v-btn class="mb-2" color="primary" dark to="/wikis/create">
                Create new Wiki
            </v-btn>
            <p class="caption">{{count}} of {{limit || '∞'}} Wikis used</p>

          </template>
        </v-col>
        <v-col cols="">
          <h2>Welcome to wikibase.cloud</h2>
          <p>You can create and manage wikis from this central dashboard.</p>
          <p>
            Check out our <a href="https://www.mediawiki.org/wiki/Wikibase/Wikibase.cloud">cloud service documentation</a>
            as well as general documentation on <a href="https://www.mediawiki.org/wiki/Wikibase">Wikibase</a>.
          </p>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import WikiDashboardListElement from './Components/WikiDashboardListElement'

export default {
  name: 'Dashboard',
  components: {
    WikiDashboardListElement,
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
    },
  },
  created () {
    this.$store.dispatch('refreshWikis')
  },
}
</script>

<style lang="css" scoped></style>
