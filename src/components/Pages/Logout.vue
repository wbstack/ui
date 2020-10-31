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
      this.$store
        .dispatch('logout')
        .then(() => this.$router.push('/'))
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>
</style>
