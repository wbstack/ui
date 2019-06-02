<template>
  <div class="wrapper">
    <form @submit.prevent="createwiki">
      <h2>Create a wiki</h2>
      <p>Please answer the questions below in order to create a wiki.</p>
      <div v-if="error">{{ error }}</div>
      <h3>Site Access</h3>
      <!-- TODO make this configurable from somewhere.... -->
      <p>Wikis by default are accessible at [project].[owner].mw.ww.10.0.75.2.xip.io</p>
      <md-field>
        <label for="inputSubdomainProject">Project Name</label>
        <md-input :disabled="inFlight" v-model="subdomainProject" id="inputSubdomainProject" name="project" type="text" required="true"></md-input>
      </md-field>
      <md-field>
        <label for="inputSubdomainOwner">Owner / Org Name</label>
        <md-input :disabled="inFlight" v-model="subdomainOwner" id="inputSubdomainOwner" name="Owner or organization name" type="text" required="true"></md-input>
      </md-field>

      <h3>Site Settings</h3>
      <p>These roughly correlate to MediaWiki Settings...</p>

      <!-- TODO Provide docs?! -->
      <md-field>
        <label for="inputSiteName">Site Name</label>
        <md-input :disabled="inFlight" v-model="sitename" id="inputSiteName" name="Site name" type="text" required="true"></md-input>
      </md-field>
      <md-field>
        <label for="inputMetaNamespace">Meta Namespace</label>
        <md-input :disabled="inFlight" v-model="metaNamespace" id="inputMetaNamespace" name="Meta namespace" type="text" required="true"></md-input>
      </md-field>
      <md-button :disabled="inFlight" class="md-raised md-primary" type="submit">Create Wiki</md-button>
    </form>
  </div>
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
  form {
    min-width: 200px;
    max-width: 600px;
    margin: 0 auto;
  }
  .wrapper{
    padding-left: 10px;
    padding-right: 10px;
    margin: 0 auto;
  }
</style>
