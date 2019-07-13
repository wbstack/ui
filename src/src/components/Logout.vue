<template>
<div></div>
</template>
<script>
export default {
  name: 'Logout',
  created () {
    this.logout()
  },
  methods: {
    logout (req) {
      delete localStorage.auth
      delete localStorage.email
      this.$store.dispatch('logout')
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
</style>
