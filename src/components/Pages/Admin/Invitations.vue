<template>
<div>
<h2>Create new</h2>

<v-row >
  <v-col>
    <v-text-field
    id="inputInvitation"
    name="invitation"
    label="Invitation code"
    required
    v-model="newInvitationCode"
    :disabled="newInvitationCodeDisabled"
    :error-messages="newInvitationCodeError"
    />
  </v-col>
  <v-col>
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
  </v-col>
</v-row>

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
    this.$api.listInvitations()
      .then(invitations => this.buildInvitationsList(invitations))
      .catch(() => { alert('Failed to retrieve invitations!') })
  },
  methods: {
    buildInvitationsList (data) {
      this.invitations = data
    },
    deleteInvitationCode (codeToDelete) {
      this.$api.deleteInvitation({code: codeToDelete})
        .then(code => this.deleteInvitationCodeSuccess(code))
        .catch(() => this.deleteInvitationCodeFail())
    },
    deleteInvitationCodeSuccess (code) {
      this.invitations.splice(this.invitations.indexOf(code), 1)
    },
    deleteInvitationCodeFail () {
      alert('Invite code deletion failed')
    },
    registerNewInvitationCode () {
      if (this.newInvitationCode === '') {
        this.newInvitationCodeError = 'A code must be provided'
        return
      }

      this.newInvitationCodeDisabled = true
      this.newInvitationCodeError = ''
      this.$api.createInvitation({code: this.newInvitationCode})
        .then(code => this.newInvitationCodeSuccess(code))
        .catch((error) => this.newInvitationCodeFail(error))
    },
    newInvitationCodeSuccess (code) {
      this.newInvitationCode = ''
      this.newInvitationCodeDisabled = false
      // Add code to the list being shown
      this.invitations.unshift({code})
    },
    newInvitationCodeFail (errors) {
      this.newInvitationCodeDisabled = false
      if (errors) {
        this.newInvitationCodeError = errors[0]
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
