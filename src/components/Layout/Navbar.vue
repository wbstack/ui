<template>
  <v-toolbar>
    <a href="/" style="height:64px">
      <img src="../../assets/logo.svg" style="height:64px">
    </a>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <template v-if="isLoggedIn">
        <v-btn class="text-none no-button-pointer-events" text> Hi {{ currentUser.email }}</v-btn>
        <v-btn id="nav-dashboard" text to="/dashboard">Dashboard</v-btn>
        <v-btn id="nav-user" text to="/user">Account</v-btn>
        <v-btn id="nav-logout" text to="/logout">Logout</v-btn>
      </template>
      <template v-if="!isLoggedIn">
        <v-btn id="nav-login" text to="/login">Log in</v-btn>
        <v-btn id="nav-create-account" ext color="primary" to="/create-account">Sign up</v-btn>
      </template>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  name: 'Navbar',
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn
    },
    currentUser: function () {
      return this.$store.getters.currentUser
    }
  }
}
</script>

<style scoped>
.no-button-pointer-events{
  pointer-events: none
}
a{
text-decoration-line: none;
}
a:active, a:hover{
text-decoration-line: underline;
}
</style>
