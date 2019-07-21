<template>
  <v-app id="app">
      <Navbar></Navbar>
      <router-view></router-view>
      <Foot></Foot>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import Navbar from '@/components/Navbar'
import Foot from '@/components/Foot'

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
