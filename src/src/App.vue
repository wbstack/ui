<template>
  <div>
      <Navbar></Navbar>
      <router-view></router-view>
      <md-divider></md-divider>
      <Foot></Foot>
  </div>
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

<style lang="scss">
  @import "~vue-material/dist/theme/engine"; // Import the theme engine

  @include md-register-theme("default", (
    primary: md-get-palette-color(blue, A200), // The primary color of your application
    accent: md-get-palette-color(red, A200) // The accent or secondary color
  ));

  @import "~vue-material/dist/theme/all"; // Apply the theme

  .md-divider{
    margin-top: 10px;
    margin-bottom: 10px;
  }
</style>
