<template>
    <v-main class="pa-1">
      <v-container class="fill-height" fluid >
        <v-row align="center" justify="center">
            <LoginCard title="Log in" buttonText="Log in"/>
        </v-row>
        <v-row justify="center" >
          <div>
            <div class="pa-4">Need an account?</div>
            <v-btn
              class="ms-6"
              to="/create-account"
              :disabled="inFlight"
            >SIGN UP
            </v-btn>
          </div>
        </v-row>
      </v-container>
    </v-main>
</template>

<script>
import LoginCard from '~/components/Cards/Login'

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
