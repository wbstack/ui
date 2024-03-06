<template>
  <v-app id="app">
      <Navbar></Navbar>
      <router-view v-if="customLayout"/>
      <v-container v-else class="full-height-content">
        <v-row >
          <v-col>
            <router-view></router-view>
          </v-col>
        </v-row>
      </v-container>
      <Foot :class="{'tall-footer': customLayout}"></Foot>
      <Interval
        v-if="this.$store.getters.isLoggedIn && !this.$store.getters.currentUser.verified"
        :callback="checkVerified"
        :interval="3000"
      />
  </v-app>
</template>

<script>
import Navbar from '@/components/Layout/Navbar'
import Foot from '@/components/Layout/Foot'
import Interval from '@/components/Util/Interval'

export default {
  name: 'App',
  components: {
    Navbar,
    Foot,
    Interval
  },
  computed: {
    customLayout: function () {
      return this.$route.meta.customLayout
    }
  },
  methods: {
    checkVerified () {
      this.$api
        .checkVerified()
        .then(verified => verified && this.$store.dispatch('markAsVerified'))
    }
  }
}
</script>

<style>
/* https://brizzo.net/tips/hide-recaptcha-v3-badge/ */
.grecaptcha-badge { opacity:0;}

  .full-height-content {
    height: 100%
  }

.tall-footer.footer {
  height: 100%;
}
</style>
