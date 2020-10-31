  <template>
    <v-content>
      <v-container class="fill-height" fluid >
        <v-row justify="center">
          <v-col cols="6">
            <h1>Private Profile</h1>
            <p>To change any details or to remove your account please contact us.</p>
            <v-form>
              <v-text-field
              id="inputEmail"
              prepend-icon="email"
              label="Email address"
              type="email"
              v-model="currentUser.email"
              :disabled=true
              />
              <template v-if="currentUser.verified == 0">
                <v-btn :disabled="sentVerifyEmail == 1" @click="sendVerifyEmail" color="red">Email not verified. Click to send another verification email.</v-btn>
              </template>
            </v-form>
            <!-- TODO add date account registered? -->
          </v-col>
        </v-row>
      </v-container>
    </v-content>
</template>

<script>
export default {
  name: 'User',
  data () {
    return {
      sentVerifyEmail: false
    }
  },
  computed: {
    currentUser: function () {
      return this.$store.getters.currentUser
    }
  },
  methods: {
    buildData (data) {
      this.apiData = data
    },
    sendVerifyEmail () {
      this.$http.post(
        '/user/sendVerifyEmail'
      )
        .then(( response ) => {
          this.sentVerifyEmail = true
          if(response.data.message === 'Already verified') {
            this.$store.dispatch( 'markAsVerified', {} )
          }
        })
        .catch(() => { alert('Failed to send user verification email!') })
    }
  }
}
</script>

<style>
</style>
