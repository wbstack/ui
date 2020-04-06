<template>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center column>
          <v-flex xs12 sm8 md4>
            <ResetPasswordCard title="Reset password" buttonText="Reset" :email="this.email" :token="this.token"/>
          </v-flex>
        </v-layout>
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
