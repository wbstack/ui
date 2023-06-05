<template>
  <v-card>
    <v-card-title>
      Details
      <v-spacer></v-spacer>
      <v-tooltip right>
        <template v-slot:activator="{ on }">
          <v-icon v-on="on">mdi-information-outline</v-icon>
        </template>
        <span>During Alpha if you would like to change these details please contact us.</span>
      </v-tooltip>
    </v-card-title>
    <v-card-text>
      <strong>Please check your emails for your log in details.</strong><br/>
      <span>Status: Published</span><br/>
      <span>Site Name: {{apiData['sitename']}}</span><br/>
      <span>Domain: <a target="_blank" rel="noopener noreferrer" :href="'//' + apiData['domain']" >{{apiData['domain']}}</a></span><br/>
      <span>Date Created: {{apiData['created_at']}}</span><br/>

      <!-- TODO actually get this from the API?-->
      <!--<span>Tier: Free-->
      <!--<v-tooltip right>-->
      <!--<template v-slot:activator="{ on }">-->
      <!--<v-icon small v-on="on">info_outline</v-icon>-->
      <!--</template>-->
      <!--<span>During Alpha only the Free tier is available.</span>-->
      <!--</v-tooltip>-->
      <!--</span><br/>-->

      <template v-if="apiData['wiki_db_version']">
        <span>Database Version: {{apiData['wiki_db_version']['version']}}</span>
      </template>
      <template v-else>
        <span>Version: Unknown</span>
      </template>
      <br/>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'Details',
  props: [
    'wikiId'
  ],
  data () {
    return {
      apiData: []
    }
  },
  created () {
    // TODO get the data about the wiki if the user can see it...
    this.$api.wikiDetails(
      { wiki: this.wikiId }
    )
      .then(details => this.buildDataFromDetails(details))
      .catch(() => { alert('Failed to retrieve wiki details!') })
  },
  methods: {
    buildDataFromDetails (data) {
      this.apiData = data
    }
  }
}
</script>

<style lang="css" scoped>
</style>
