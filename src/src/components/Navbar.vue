<template>
  <v-toolbar>
    <v-toolbar-title>
      <router-link to="/">
        Open Cura
      </router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <template v-if="currentUser">
        <v-btn flat to="/logout">Logout</v-btn>
      </template>
      <template v-if="!currentUser">
        <v-btn flat to="/login">Login</v-btn>
        <v-btn flat color="primary" to="/create-account">Get Started</v-btn>
      </template>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'Navbar',
  computed: {
    ...mapGetters({currentUser: 'currentUser'})
  }
}
</script>

<style lang="scss">
</style>
