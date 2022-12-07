<template>
  <v-container class="fill-height" fluid >
    <v-row align="center" justify="center">
      <CreateAccountCard title="Lets get started" buttonText="Create Account"/>
    </v-row>
      <v-row align="center" justify="center">
      <v-col class="needs-padding">
        <p>Already have an account?</p>
        <router-link to="/login">Log in now.</router-link>
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
