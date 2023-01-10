<template>
    <v-main>
      <v-container class="fill-height" fluid >
        <v-row align="center" justify="center">
            <LoginCard title="Log in" buttonText="Log in"/>
        </v-row>
        <v-row class="pt-12" justify="center" >
          <div>
            Need an account?
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
