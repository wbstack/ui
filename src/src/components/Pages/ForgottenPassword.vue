<template>
    <v-content>
      <v-container class="fill-height" fluid >
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <ForgottenPasswordCard title="Forgotten password" buttonText="Reset"/>
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
