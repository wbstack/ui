<template>
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center>
          <v-flex xs8>
            <template v-if="id != 0">
              <v-card>
                <v-toolbar dark color="primary">
                  <v-toolbar-title>Manage Wiki {{id}}</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <h3>Managers</h3>

                  <v-list-tile v-for="manager in managers" :key="manager.email" :manager="manager">
                    <v-list-tile-content>
                      <div class="fullwidth">
                        {{manager.email}}
                        <!--
                        <div class="rightfloat">
                          <v-btn icon small class="nomargin" @click="deleteInvitationCode(invite.code)"><v-icon>delete</v-icon></v-btn>
                        </div>
                      -->
                      </div>
                  </v-list-tile-content>
                  </v-list-tile>

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
export default {
  name: 'ManageWiki',
  data () {
    return {
      id: 0,
      managers: []
    }
  },
  computed: {},
  created () {
    this.id = this.$route.params.id
    // TODO get the data about the wiki if the user can see it...
    this.$http.post(
      '/wiki/managers/list',
      { wiki: this.id },
      {headers: {'Authorization': localStorage.auth}}
    )
      .then(request => this.buildManagersList(request.data.data))
      .catch(() => { alert('Failed to retrieve managers!') })
  },
  methods: {
    buildManagersList (data) {
      this.managers = data
    },
  }
}
</script>

<style>
</style>
