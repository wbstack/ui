<template>
  <v-content>
    <v-container class="fill-height" fluid >
      <v-row>
        <v-col>
          <v-tabs>
            <v-tab>Dashboard</v-tab>
            <v-tab-item>Nothig here yet</v-tab-item>
            <v-tab>Users</v-tab>
            <v-tab-item><p>Nothing here yet</p></v-tab-item>
            <v-tab>Wikis</v-tab>
            <v-tab-item><p>Nothing here yet</p></v-tab-item>
            <v-tab>Invitaitons</v-tab>
            <v-tab-item><AdminInvitations/></v-tab-item>
            <v-tab>Interests</v-tab>
            <v-tab-item><AdminInterests/></v-tab-item>
            <v-tab>Jobs</v-tab>
            <v-tab-item><p>Nothing here yet</p></v-tab-item>
          </v-tabs>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import AdminInvitations from '@/components/Pages/Admin/Invitations'
import AdminInterests from '@/components/Pages/Admin/Interests'

export default {
  name: 'Admin',
  components: {
    AdminInvitations,
    AdminInterests
  },
  data () {
    return {}
  }
}
</script>

<style scoped>
</style>
