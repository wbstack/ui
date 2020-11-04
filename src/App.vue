<template>
  <v-app id="app">
      <Navbar></Navbar>

      <v-container class="full-height-content">
        <v-row >
          <v-col cols="1"></v-col>
          <v-col cols="10">
            <router-view></router-view>
          </v-col>
          <v-col cols="1"></v-col>
        </v-row>
      </v-container>

      <Foot></Foot>
  </v-app>
</template>

<script>
import Navbar from '~/components/Layout/Navbar'
import Foot from '~/components/Layout/Foot'

export default {
  name: 'App',
  components: {
    Navbar,
    Foot
  }
}
</script>

<style>
/* https://brizzo.net/tips/hide-recaptcha-v3-badge/ */
.grecaptcha-badge { opacity:0;}

  .full-height-content {
    height: 100%
  }
</style>
