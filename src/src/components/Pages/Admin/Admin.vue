<template>
  <v-tabs>
    <v-tab>
      Invitaitons
    </v-tab>
    <v-tab-item>
      <AdminInvitations></AdminInvitations>
    </v-tab-item>
    <v-tab>
      Other
    </v-tab>
    <v-tab-item>
      <p>Nothing here yet</p>
    </v-tab-item>
  </v-tabs>
</template>

<script>
import AdminInvitations from '@/components/Pages/Admin/Invitations'

export default {
  name: 'Admin',
  components: {
    AdminInvitations
  },
  data () {
    return {}
  }
}
</script>

<style scoped>
</style>
