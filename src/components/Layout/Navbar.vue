<template>
  <v-toolbar>
    <a class="pr-4 logo" href="/">
      <img class="logo" src="../../assets/logo.svg">
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
.v-toolbar {
  max-height: 64px;
}
.no-button-pointer-events{
  pointer-events: none
}
a{
text-decoration-line: none;
}
a:active, a:hover{
text-decoration-line: underline;
}
/deep/ .v-toolbar__content {
  padding: 4px 0 4px 0 !important;
}
.logo{
  height: 64px;
}
</style>
