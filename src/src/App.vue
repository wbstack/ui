<template>
  <v-app id="app">
      <Navbar></Navbar>
      <router-view></router-view>
      <Foot></Foot>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import Navbar from '@/components/Layout/Navbar'
import Foot from '@/components/Layout/Foot'

export default {
  name: 'App',
  computed: {
    ...mapGetters({ currentUser: 'currentUser' })
  },
  components: {
    Navbar,
    Foot
  }
}
</script>

<style>
</style>
