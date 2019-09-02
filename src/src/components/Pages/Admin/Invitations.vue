<template>
<div>
<h2>Create new</h2>

<v-layout row>
  <v-flex>
    <v-text-field
    id="inputInvitation"
    name="invitation"
    label="Invitation code"
    required
    v-model="newInvitationCode"
    :disabled="newInvitationCodeDisabled"
    :error-messages="newInvitationCodeError"
    />
  </v-flex>
  <v-flex>
    <v-btn
      depressed
      tile
      @click="registerNewInvitationCode"
      class="ma-0"
      color="primary"
      :disabled="newInvitationCodeDisabled"
      >
      Create
    </v-btn>
  </v-flex>
</v-layout>

<h2>Current Invitations</h2>
<v-list-tile v-for="invite in invitations" :key="invite.code" :invite="invite">
  <v-list-tile-content>
    <div class="fullwidth">
      {{invite.code}}
      <div class="rightfloat">
        <v-btn icon small class="nomargin" @click="deleteInvitationCode(invite.code)"><v-icon>delete</v-icon></v-btn>
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
      invitations: [],
      newInvitationCode: '',
      newInvitationCodeError: '',
      newInvitationCodeDisabled: false
    }
  },
  created () {
    this.$http.post(
      '/admin/invitation/list'
    )
      .then(request => this.buildInvitationsList(request.data.data))
      .catch(() => { alert('Failed to retrieve invitations!') })
  },
  methods: {
    buildInvitationsList (data) {
      this.invitations = data
    },
    deleteInvitationCode (codeToDelete) {
      this.$http.post(
        '/admin/invitation/delete',
        {code: codeToDelete}
      )
        .then(request => this.deleteInvitationCodeSuccess(request))
        .catch((error) => this.deleteInvitationCodeFail(error))
    },
    deleteInvitationCodeSuccess (req) {
      this.invitations.splice(this.invitations.indexOf(req.data.code), 1)
    },
    deleteInvitationCodeFail (error) {
      alert('Invite code deletion failed')
    },
    registerNewInvitationCode () {
      if (this.newInvitationCode == '') {
        this.newInvitationCodeError = 'A code must be provided'
        return
      }

      this.newInvitationCodeDisabled = true
      this.newInvitationCodeError = ''
      this.$http.post(
        '/admin/invitation/create',
        {code: this.newInvitationCode}
      )
        .then(request => this.newInvitationCodeSuccess(request))
        .catch((error) => this.newInvitationCodeFail(error))
    },
    newInvitationCodeSuccess (req) {
      if (!req.data.success) {
        this.newInvitationCodeError = 'Unknown error'
      } else {
        this.newInvitationCode = ''
      }
      this.newInvitationCodeDisabled = false
      // Add code to the list being shown
      this.invitations.unshift({code: req.data.code})
    },
    newInvitationCodeFail (error) {
      this.newInvitationCodeDisabled = false
      if (error.response.data.code) {
        this.newInvitationCodeError = error.response.data.code[0]
      } else {
        this.newInvitationCodeError = 'Something went wrong, please try again.'
      }
    }
  }
}
</script>

<style scoped>
.rightfloat {
  float: right;
}
</style>
