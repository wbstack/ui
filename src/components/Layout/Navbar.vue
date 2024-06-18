<template>
  <v-toolbar height="64px">
    <a class="pr-4 logo" href="/">
      <img data-test-id="logo" class="logo" src="../../assets/logo.svg">
    </a>
    <v-spacer></v-spacer>
    <template v-if="!isInitializing">
      <template v-if="isLoggedIn">
        <v-btn class="text-none no-button-pointer-events" text> Hi {{ currentUser.email }}</v-btn>
        <v-btn id="nav-dashboard" text to="/dashboard">Dashboard</v-btn>
        <v-btn id="nav-user" text to="/user">Account</v-btn>
        <v-btn id="nav-logout" text to="/logout">Logout</v-btn>
      </template>
      <v-menu content-class="menu" internal-activator offset-y transition="scale-transition" v-if="($vuetify.breakpoint.width < 600) && !isLoggedIn">
        <template v-slot:activator="{ on, attrs }">
          <v-btn data-test-id="dots-button" icon class="dots-button mr-4" v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-horizontal</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item class="text-no-wrap" to="/login" style="text-decoration: none;">
            <v-list-item-title>Log In</v-list-item-title>
          </v-list-item>
          <v-list-item class="text-no-wrap" to="/create-account" style="text-decoration: none;">
            <v-list-item-title>Sign Up</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <template v-if="($vuetify.breakpoint.width >= 600) && !isLoggedIn">
        <v-btn
          data-test-id="nav-login"
          class="mr-4"
          large
          text
          style="text-decoration: none;"
          to="/login"
        >
          Log In
        </v-btn>
        <v-btn
          data-test-id="nav-create-account"
          class="mr-4"
          large
          elevation="0"
          color="primary"
          style="text-decoration: none;"
          to="/create-account"
        >
          Sign Up
        </v-btn>
      </template>
    </template>
  </v-toolbar>
</template>

<script>
export default {
  name: 'Navbar',
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn
    },
    isInitializing: function () {
      return this.$store.getters.authStatus === 'initializing'
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
.dots-button{
  box-shadow: none;
  background-color: transparent !important;
}
.menu{
  margin-top: 2px;
  margin-left: -5px;
}
.theme--light.v-btn--active:before {
  opacity: 0;
}
</style>
