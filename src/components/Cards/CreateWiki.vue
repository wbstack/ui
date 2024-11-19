<template>
  <v-form @submit="createwiki">
    <v-card class="elevation-12">
      <v-toolbar dark color="primary">
        <v-toolbar-title>{{title}}</v-toolbar-title>
      </v-toolbar>
      <v-card-text>

        <h3>Site name
          <v-tooltip right>
            <template v-slot:activator="{ on }">
              <v-icon v-on="on">mdi-information-outline</v-icon>
            </template>
            <span>The main name of your site</span><br/>
            <span>Will appear in your page titles and can be changed at any time</span><br/>
            <span>In MediaWiki terms this is $wgSitename</span><br/>
          </v-tooltip>
        </h3>

        <v-text-field
        id="inputSiteName"
        prepend-icon="mdi-format-title"
        name="sitename"
        label="e.g., Goat Collective"
        v-model="sitename"
        :disabled="inFlight"
        :error-messages="error['sitename']"
        />

        <h3>Site domain
          <v-tooltip right>
            <template v-slot:activator="{ on }">
              <v-icon v-on="on">mdi-information-outline</v-icon>
            </template>
            <span>A domain name is what people type into their browser to visit your site.</span><br/>
            <span>If you own your own domain, you can use it for Wikibase Cloud by selecting "Custom Domain".</span><br/>
            <span>Otherwise, choose your own name to be a subdomain of wikibase.cloud (five characters minimum, only a-z, 0-9 and "-") by selecting "Free Subdomain". Example: your-name-here1.wikibase.cloud</span><br/>
          </v-tooltip>
        </h3>

        <v-radio-group row v-model="domainRadioChoice" :mandatory="true">
          <v-radio label="Free Subdomain" value="sub"></v-radio>
          <v-radio label="Custom Domain" value="own"></v-radio>
        </v-radio-group>

        <v-text-field v-if="domainRadioChoice === 'sub'"
                      id="inputSubdomain"
                      prepend-icon="mdi-web"
                      name="subdomain"
                      label="e.g., goat-collective"
                      v-model="subdomain"
                      :suffix="SUBDOMAIN_SUFFIX"
                      :disabled="inFlight"
                      :error-messages="error['siteaddress']"
                      :hint="errorMessages.domainFormat"
        />

        <v-text-field v-if="domainRadioChoice === 'own'"
                      id="inputDomain"
                      prepend-icon="mdi-web"
                      name="domain"
                      label="e.g., goat-collective.com"
                      v-model="domain"
                      :disabled="inFlight"
                      :error-messages="error['siteaddress']"
        />

        <p v-if="domainRadioChoice === 'own'">This domain should have a CNAME record pointing to:</p>
        <p v-if="domainRadioChoice === 'own'">"{{ CNAME_RECORD }}"</p>

        <h3>Your user
          <v-tooltip right>
            <template v-slot:activator="{ on }">
              <v-icon v-on="on">mdi-information-outline</v-icon>
            </template>
            <span>Choose the username of your user and the first admin user on the site</span><br/>
            <span>You will receive an email with log in details for this account</span><br/>
          </v-tooltip>
        </h3>

        <v-text-field
        id="inputUsername"
        prepend-icon="mdi-account"
        name="username"
        label="e.g., Addshore"
        v-model="username"
        :disabled="inFlight"
        :error-messages="error['username']"
        />

        <h3>Terms of use</h3>
        <v-checkbox
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
                    Terms of Use</a>
                </template>
                Opens in new window
              </v-tooltip>.
            </div>
          </template>
        </v-checkbox>

      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          type="submit"
          color="primary"
          :disabled="inFlight"
        >
          {{buttonText}}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
import config from '~/config'

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
      domainRadioChoice: 'sub',
      subdomain: '',
      domain: '',
      username: '',
      terms: false,
      hasError: false,
      error: [],
      inFlight: false,
      SUBDOMAIN_SUFFIX: config.SUBDOMAIN_SUFFIX,
      CNAME_RECORD: config.CNAME_RECORD,
      errorMessages: {
        domainTaken: "The domain has already been taken.",
        domainFormat: "The subdomain must be at least five characters long and may contain only lowercase Latin letters (a-z), digits (0-9) and hyphens (-)."
      }
    }
  },
  created () {
    this.checkCurrentLogin()
  },
  updated () {
    this.checkCurrentLogin()
  },
  methods: {
    createwiki (evt) {
      evt.preventDefault()

      this.inFlight = true
      this.hasError = false
      this.error = []

      // Terms are not checked by the API? so check this here...?
      // TODO do an initial round of validation here too!
      // https://vuejs.org/v2/cookbook/form-validation.html
      if (!this.terms) {
        this.hasError = true
        this.error.terms = 'You must accept the Terms of Service.'
      }

      if (this.hasError) {
        this.inFlight = false
        return
      }

      // Figure out the actual domain to submit to the api!
      let domainToSubmit = ''
      if (this.domainRadioChoice === 'sub') {
        domainToSubmit = this.subdomain + this.SUBDOMAIN_SUFFIX
      }
      if (this.domainRadioChoice === 'own') {
        domainToSubmit = this.domain
      }

      this.$api.createWiki(
        {
          domain: domainToSubmit,
          sitename: this.sitename,
          username: this.username
        }
      )
        .then(wikiDetails => this.createSuccess(wikiDetails))
        .catch(errors => this.createFail(errors))
    },
    createSuccess (wikiDetails) {
      this.hasError = false
      this.error = []
      // this.$router.replace(this.$route.query.redirect || '/wikis/manage/' + req.data.data.id)
      this.$router.replace('/wikis/manage/' + wikiDetails.id)
    },
    createFail (errors) {
      this.error = []

      if (errors.sitename) {
        this.hasError = true
        this.error.sitename = errors.sitename[0]
      }
      if (errors.domain) {
        this.hasError = true
        if (errors.domain[0] === "The domain has already been taken.") {
          this.error.siteaddress = this.errorMessages.domainTaken
        } else {
          this.error.siteaddress = this.errorMessages.domainFormat
        }
      }
      if (errors.username) {
        this.hasError = true
        this.error.username = errors.username[0]
      }
      if (errors.terms) {
        this.hasError = true
        this.error.terms = errors.terms[0]
      }
      if (errors.tooManyWikis) {
        this.hasError = true
        this.displayGenericError(errors.message)
      }
      if (errors.dbNotReady) {
        this.hasError = true
        this.displayGenericError('No databases ready, please report this!')
      }

      // Otherwise show a general error state
      if (!this.hasError) {
        this.hasError = true
        this.displayGenericError('Creation failed!')
      }

      this.inFlight = false
    },
    displayGenericError (message) {
      this.error.sitename = message
      this.error.siteaddress = message
      this.error.username = message
      this.error.terms = message
    },
    checkCurrentLogin () {
      if (!this.currentUser) {
        this.$router.replace(this.$route.query.redirect || '/')
      }
    }
  }
}
</script>

<style scoped>
>>> .v-messages__message {
  margin-bottom: 10px;
}
</style>
