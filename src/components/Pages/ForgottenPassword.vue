<template>
    <v-main>
      <v-container class="fill-height" fluid >
        <v-row align="center" justify="center">
          <ForgottenPasswordCard title="Reset your password" buttonText="Reset Password"/>
        </v-row>
        <v-row align="center" justify="center">
          <v-col class="needs-padding">
            <p>Not got an account yet?</p>
            <router-link to="/create-account">Create one now.</router-link>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
</template>

<script>
import ForgottenPasswordCard from '~/components/Cards/ForgottenPassword'

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
