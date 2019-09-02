<template>
<div>
<h2>Current Interests</h2>
<v-list-tile v-for="item in list" :key="item.id" :invite="item">
  <v-list-tile-content>
    <div class="fullwidth">
      {{item.email}}
      <div class="rightfloat">
        <v-btn>TODO Send Invitation</v-btn>
        <!-- TODO button to send the user an invitiation code? -->
        <!-- TODO track if an invitation has already been sent? -->
        <!-- <v-btn icon small class="nomargin" @click="deleteInvitationCode(invite.code)"><v-icon>delete</v-icon></v-btn> -->
      </div>
    </div>
</v-list-tile-content>
</v-list-tile>
</div>
</template>
<script>
export default {
  name: 'AdminInvitations',
  data () {
    return {
      list: []
    }
  },
  created () {
    this.$http.post(
      '/admin/interest/list'
    )
      .then(request => this.buildList(request.data.data))
      .catch(() => { alert('Failed to retrieve interests!') })
  },
  methods: {
    buildList (data) {
      this.list = data
    }
  }
}
</script>

<style scoped>
.rightfloat {
  float: right;
}
</style>
