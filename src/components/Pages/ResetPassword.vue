<template>
    <v-content>
      <v-container class="fill-height" fluid >
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <ResetPasswordCard title="Reset password" buttonText="Reset" :email="this.email" :token="this.token"/>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
</template>

<script>
import ResetPasswordCard from '@/components/Cards/ResetPassword'

export default {
  name: 'ResetPassword',
  components: {
    ResetPasswordCard
  },
  data () {
    return {
      email: null,
      token: null
    }
  },
  created () {
    this.email = this.$route.query.email
    this.token = this.$route.query.token
  }
}
</script>

<style lang="css" scoped>

  .needs-padding{
    padding-top: 45px;
    text-align: center;
  }

</style>
