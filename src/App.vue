<template>
  <v-app id="app">
      <ErrorSnackBar/>
      <Navbar></Navbar>
      <div v-if="!failedToGetMissingPolicies" class="content">
        <PolicyAcceptanceModal v-if="hasMissingPolicies"/>
        <router-view v-if="customLayout"/>
        <v-container v-else class="full-height-content">
          <router-view></router-view>
        </v-container>
      </div>
      <Foot :class="['padding-footer', { 'tall-footer': customLayout }]"></Foot>
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
import PolicyAcceptanceModal from '@/components/Modals/PolicyAcceptanceModal'
import ErrorSnackBar from '@/components/Components/ErrorSnackBar'

export default {
  name: 'App',
  components: {
    Navbar,
    Foot,
    Interval,
    PolicyAcceptanceModal,
    ErrorSnackBar,
  },
  computed: {
    customLayout: function () {
      return this.$route.meta.customLayout
    },
    hasMissingPolicies: function () {
      return this.$route.meta.requiresAuth &&
        !this.$route.meta.requiresAuth.excludeFromPolicyChecks &&
        this.$store.getters.missingPolicies?.length
    },
    failedToGetMissingPolicies: function () {
      return this.$store.getters.failedToGetMissingPolicies
    },
  },
  methods: {
    checkVerified () {
      this.$api
        .checkVerified()
        .then(verified => verified && this.$store.dispatch('markAsVerified'))
    },
  },
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

<style scoped>
.content {
  position: relative;
  height: 100%;
  padding-bottom: 56px;
}
</style>
