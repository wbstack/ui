<template>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center column>
          <v-flex xs12 sm8 md4>
            <ForgottenPasswordCard title="Forgotten password" buttonText="Reset"/>
          </v-flex>
          <v-flex class="needs-padding">
            <p>Not got an account yet?</p>
            <router-link to="/create-account">Create one now.</router-link>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
</template>

<script>
import ForgottenPasswordCard from '@/components/Cards/ForgottenPassword'

export default {
  name: 'ForgottenPassword',
  components: {
    ForgottenPasswordCard
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
