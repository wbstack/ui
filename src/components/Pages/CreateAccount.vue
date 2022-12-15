<template>
  <v-container class="fill-height" fluid >
    <v-row align="center" justify="center">
      <CreateAccountCard title="Sign up" buttonText="Create Account"/>
    </v-row>
      <v-row align="center" justify="center">
      <v-col class="needs-padding">
        <div>
          Already have an account?
          <v-btn
            class="ms-6"
            to="/login"
            :disabled="inFlight"
          >Log in
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CreateAccountCard from '~/components/Cards/CreateAccount'

export default {
  name: 'CreateAccount',
  components: {
    CreateAccountCard
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
