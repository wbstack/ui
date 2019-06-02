<template>
  <div>
    <LoggedOut v-if="!currentUser"></LoggedOut>
    <LoggedIn v-if="currentUser"></LoggedIn>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import LoggedIn from '@/components/Home/LoggedIn'
import LoggedOut from '@/components/Home/LoggedOut'

export default {
  name: 'Home',
  computed: {
    ...mapGetters({currentUser: 'currentUser'})
  },
  components: {
    LoggedIn,
    LoggedOut
  }
}
</script>

<style scoped>
</style>
