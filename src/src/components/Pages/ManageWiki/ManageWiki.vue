<template>
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center>
          <v-flex xs6>
            <template v-if="id != 0">
              <v-card>
                <v-toolbar dark color="primary">
                  <v-toolbar-title>Manage Wiki {{id}}</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  This component has not yet been implemented. Managing coming soon...
                </v-card-text>
              </v-card>
            </template>
            <template v-if="id == 0">
              <v-card>
                <v-toolbar dark color="primary">
                  <v-toolbar-title>Wiki Managment</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  No wiki for you to manage.
                </v-card-text>
              </v-card>
            </template>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ManageWiki',
  data () {
    return {
      id: 0
    }
  },
  props: ['id'],
  computed: {},
  created () {
    this.id = this.$route.params.id
    // TODO get the data about the wiki if the user can see it...
  }
}
</script>

<style>
</style>
