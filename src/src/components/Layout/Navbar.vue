<template>
  <v-toolbar>
    <v-toolbar-title>
      <span>Open Cura</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <template v-if="currentUser">
        <v-btn class="text-none no-button-pointer-events" flat> Hi {{ currentUser.email }}</v-btn>
        <v-btn flat to="/">Dashboard</v-btn>
        <v-btn flat to="/user">Account</v-btn>
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

<style scoped>
.no-button-pointer-events{
  pointer-events: none
}
</style>
