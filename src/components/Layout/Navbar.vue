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
      <v-menu bottom left v-if="($vuetify.breakpoint.width < 434)  && !isLoggedIn">
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="dots-button" v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-horizontal</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item-group>
            <v-list-item class="text-no-wrap" to="/login" style="text-decoration: none;">
              Log in
            </v-list-item>
            <v-list-item class="text-no-wrap" to="/create-account" style="text-decoration: none;">
              Sign up
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
      <template v-else>
        <v-btn id="nav-create-account" text to="/create-account">Sign up</v-btn>
        <v-btn id="nav-login" color="primary" to="/login">Log in</v-btn>
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
/deep/ .v-toolbar__content {
  padding: 4px 0 4px 0 !important;
}
.logo{
  height: 64px;
}
.dots-button{
  box-shadow: none;
  background-color: transparent !important;
}
</style>
