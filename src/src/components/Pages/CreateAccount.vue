<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center column>
      <v-flex xs12 sm8 md4>
      <CreateAccountCard title="Lets get started" buttonText="Create Account"/>
      </v-flex>
      <v-flex class="needs-padding">
        <p>Already have an account?</p>
        <router-link to="/login">Login now.</router-link>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import CreateAccountCard from '@/components/Cards/CreateAccount'

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
