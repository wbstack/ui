<template>
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center>
          <v-flex xs6>
            <h1>Private Profile</h1>
            <v-form>
              <v-text-field
              id="inputEmail"
              prepend-icon="email"
              label="Email address"
              type="email"
              v-model="currentUser.email"
              :disabled=true
              />
              <!-- TODO add date account registered? -->
            </v-form>
            <p>To change any details or to remove your account please contact us.</p>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'User',
  computed: {
    ...mapGetters({currentUser: 'currentUser'})
  }
}
</script>

<style>
</style>
