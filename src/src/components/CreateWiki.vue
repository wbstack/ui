<template>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center column>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Create a Wiki</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <p>Please answer the questions below in order to create a wiki.</p>
                <v-form>

                  <h3>Site Access</h3>
                  <!-- TODO make this configurable from somewhere.... -->
                  <p>Wikis by default are accessible at [project].[owner].mw.ww.10.0.75.2.xip.io</p>
                  <p>Or maybe at [project].[owner].wiki.opencura.com</p>

                  <v-text-field
                  id="inputSubdomainProject"
                  prepend-icon="person"
                  name="project"
                  label="Project Name"
                  required
                  v-model="subdomainProject"
                  :disabled="inFlight"
                  :error-messages="error"
                  />
                  <v-text-field
                  id="inputSubdomainOwner"
                  prepend-icon="person"
                  name="owner"
                  label="Owner or Organization name"
                  required
                  v-model="subdomainOwner"
                  :disabled="inFlight"
                  :error-messages="error"
                  />

                  <h3>Site Settings</h3>
                  <p>These roughly correlate to MediaWiki Settings...</p>

                  <v-text-field
                  id="inputSiteName"
                  prepend-icon="person"
                  name="sitename"
                  label="Site Name"
                  required
                  v-model="sitename"
                  :disabled="inFlight"
                  :error-messages="error"
                  />
                  <v-text-field
                  id="inputMetaNamespace"
                  prepend-icon="person"
                  name="metanamespace"
                  label="Meta Namespace"
                  required
                  v-model="metaNamespace"
                  :disabled="inFlight"
                  :error-messages="error"
                  />
                  <p>By clicking the button below you accept out Terms of Service.</p>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                @click="createwiki"
                color="primary"
                :disabled="inFlight"
                >
                Create Wiki
              </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'CreateWiki',
  computed: {
    ...mapGetters({ currentUser: 'currentUser' })
  },
  data () {
    return {
      subdomainProject: '',
      subdomainOwner: 'owner',
      sitename: '',
      metaNamespace: '',
      error: false,
      inFlight: false
    }
  },
  created () {
    this.checkCurrentLogin()
    // Set the default subdomainOwner to be the currently logged in user.
    this.subdomainOwner = this.currentUser.username
  },
  updated () {
    this.checkCurrentLogin()
  },
  methods: {
    createwiki () {
      this.inFlight = true
      this.$http.post(
        '/wiki/create',
        {
          // TODO configurable second part of the sub domain..
          subdomain: this.subdomainProject + '.' + this.currentUser.username,
          sitename: this.sitename,
          metanamespace: this.metaNamespace
        },
        {headers: {'Authorization': localStorage.auth}}
      )
        .then(request => this.createSuccess(request))
        .catch((error) => this.createFail(error))
    },
    createSuccess (req) {
      this.error = false
      // TODO redirect to a success page? / link to the page entry for the wiki?
      this.$router.replace(this.$route.query.redirect || '/')
    },
    createFail () {
      this.error = 'Creation failed!'
      this.inFlight = false
    },
    checkCurrentLogin () {
      if (!this.currentUser) {
        this.$router.replace(this.$route.query.redirect || '/')
      }
    }
  }
}
</script>

<style lang="css" scoped>
</style>
