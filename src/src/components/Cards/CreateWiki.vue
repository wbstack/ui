<template>
  <v-card class="elevation-12">
    <v-toolbar dark color="primary">
      <v-toolbar-title>{{title}}</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-form>

        <h3>Site Name</h3>
        <p>This will appear in your page titles and can be changed at any time.</p>
        <v-text-field
        id="inputSiteName"
        prepend-icon="title"
        name="sitename"
        label="E.g., Goat Collective"
        required
        v-model="sitename"
        :disabled="inFlight"
        :error-messages="error['sitename']"
        />

        <h3>Site Address</h3>
        <p>Choose a subdomain for your site to be accessed at.</p>
        <v-text-field
        id="inputSubdomain"
        prepend-icon="web"
        name="subdomain"
        label="E.g., goat-collective"
        required
        v-model="subdomain"
        suffix=".wiki.opencura.com"
        :disabled="inFlight"
        :error-messages="error['siteaddress']"
        />

        <h3>Initial user</h3>
        <p>Choose the username of the first admin user.</p>
        <p>You will be emailed log in details for this account.</p>
        <v-text-field
        id="inputUsername"
        prepend-icon="person"
        name="username"
        label="E.g., Addshore"
        required
        v-model="username"
        :disabled="inFlight"
        :error-messages="error['username']"
        />

        <h3>Terms of Use</h3>
        <v-checkbox
        required
        v-model="terms"
        :disabled="inFlight"
        :error-messages="error['terms']"
        >
          <template v-slot:label>
            <div>
              I agree to the
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <a
                    target="_blank"
                    href="/terms-of-use"
                    @click.stop
                    v-on="on"
                  >
                    Terms of Use
                  </a>
                </template>
                Opens in new window
              </v-tooltip>
              .
            </div>
          </template>
        </v-checkbox>

      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
      @click="createwiki"
      color="primary"
      :disabled="inFlight"
      >
      {{buttonText}}
    </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'CreateWiki',
  props: [
    'title',
    'buttonText'
  ],
  computed: {
    currentUser: function () {
      return this.$store.getters.currentUser
    }
  },
  data () {
    return {
      sitename: '',
      subdomain: '',
      username: '',
      terms: false,
      hasError: false,
      error: [],
      inFlight: false
    }
  },
  created () {
    this.checkCurrentLogin()
  },
  updated () {
    this.checkCurrentLogin()
  },
  methods: {
    createwiki () {
      this.inFlight = true
      this.hasError = false
      this.error = []

      if (!this.terms) {
        this.hasError = true
        this.error['terms'] = 'You must accept the Terms of Service.'
      }

      if (this.hasError) {
        this.inFlight = false
        return
      }

      this.$http.post(
        '/wiki/create',
        {
          domain: this.subdomain + '.wiki.opencura.com',
          sitename: this.sitename,
          username: this.username
        }
      )
        .then(request => this.createSuccess(request))
        .catch((err) => this.createFail(err))
    },
    createSuccess (req) {
      this.hasError = false
      this.error = []
      // this.$router.replace(this.$route.query.redirect || '/wikis/manage/' + req.data.data.id)
      this.$router.replace('/wikis/manage/' + req.data.data.id)
    },
    createFail (err) {
      this.error = []

      // If the api gave use details of the error, then use them
      if(err.response.data && err.response.data.errors) {
        if (err.response.data.errors.sitename) {
          this.hasError = true
          this.error['sitename'] = err.response.data.errors.sitename[0]
        }
        if (err.response.data.errors.domain) {
          this.hasError = true
          this.error['siteaddress'] = err.response.data.errors.domain[0]
        }
        if (err.response.data.errors.username) {
          this.hasError = true
          this.error['username'] = err.response.data.errors.username[0]
        }
        if (err.response.data.errors.terms) {
          this.hasError = true
          this.error['terms'] = err.response.data.errors.terms[0]
        }
      }

      //IF we get a more specific error do something else
      if( err.response.data.message === 'No databases ready' ) {
        this.hasError = true
        this.displayGenericError(err.response.data.message + ', please report this!')
      }

      // Otherwise show a general error state
      if (!this.hasError) {
        this.hasError = true
        this.displayGenericError('Creation failed!')
      }

      this.inFlight = false
    },
    displayGenericError(message) {
      this.error['sitename'] = message
      this.error['siteaddress'] = message
      this.error['username'] = message
      this.error['terms'] = message
    },
    checkCurrentLogin () {
      if (!this.currentUser) {
        this.$router.replace(this.$route.query.redirect || '/')
      }
    }
  }
}
</script>

<style>
</style>
