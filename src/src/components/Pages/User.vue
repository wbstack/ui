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
              <template v-if="currentUser.verified == 0">
                <span><v-btn :disabled="sentVerifyEmail == 1" @click="sendVerifyEmail" color="red">Send another verification email.</v-btn></span>
              </template>
            </v-form>
            <!-- TODO add date account registered? -->
            <p>To change any details or to remove your account please contact us.</p>
          </v-flex>
        </v-layout>
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
        .then(() => { this.sentVerifyEmail = true })
        .catch(() => { alert('Failed to send user verification email!') })
    }
  }
}
</script>

<style>
</style>
