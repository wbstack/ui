<template>
    <v-content>
      <v-container class="fill-height" fluid >
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <LoginCard title="Log in to your account" buttonText="Login"/>
          </v-col>
          <v-col class="needs-padding">
            <p>Not got an account yet?</p>
            <router-link to="/create-account">Create one now.</router-link>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
</template>

<script>
import LoginCard from '@/components/Cards/Login'

export default {
  name: 'Login',
  components: {
    LoginCard
  },
  data () {
    return {}
  }
}
</script>

<style lang="css" scoped>

  .needs-padding{
    padding-top: 45px;
    text-align: center;
  }

</style>
