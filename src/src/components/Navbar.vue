<template>
  <md-toolbar>
    <div class="md-layout-item md-alignment-center-left">
      <span class="md-title">
        <router-link to="/">WikWiki</router-link>
      </span>
    </div>
    <template v-if="currentUser">
      <md-button class="md-raised" to="/logout">Logout</md-button>
    </template>
    <template v-if="!currentUser">
      <md-button class="md-raised" to="/login">Login</md-button>
      <md-button class="md-raised md-primary" to="/create-account">Get Started</md-button>
    </template>
  </md-toolbar>
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
