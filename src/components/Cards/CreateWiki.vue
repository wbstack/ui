<template>
  <v-card class="elevation-12">
    <v-toolbar dark color="primary">
      <v-toolbar-title>{{title}}</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-form>

        <h3>Site Name
          <v-tooltip right>
            <template v-slot:activator="{ on }">
              <v-icon v-on="on">info_outline</v-icon>
            </template>
            <span>The main name of your site</span><br/>
            <span>Will appear in your page titles and can be changed at any time</span><br/>
            <span>In MediaWiki terms this is $wgSitename</span><br/>
          </v-tooltip>
        </h3>

        <v-text-field
        id="inputSiteName"
        prepend-icon="title"
        name="sitename"
        label="E.g., Goat Collective"
        v-model="sitename"
        :disabled="inFlight"
        :error-messages="error['sitename']"
        />

        <h3>Site Domain
          <v-tooltip right>
            <template v-slot:activator="{ on }">
              <v-icon v-on="on">info_outline</v-icon>
            </template>
            <span>A domain name is the site address people type into their browser to visit your site</span><br/>
            <span>If you already own a domain you can use it by selecting "Custom Domain"</span><br/>
            <span>If not you can use a "Free Subdomain"</span><br/>
          </v-tooltip>
        </h3>

        <v-radio-group row v-model="domainRadioChoice" :mandatory="true">
          <v-radio label="Free Subdomain" value="sub"></v-radio>
          <v-radio label="Custom Domain" value="own"></v-radio>
        </v-radio-group>

        <v-text-field v-if="domainRadioChoice === 'sub'"
                      id="inputSubdomain"
                      prepend-icon="web"
                      name="subdomain"
                      label="E.g. goat-collective"
                      v-model="subdomain"
                      :suffix="SUBDOMAIN_SUFFIX"
                      :disabled="inFlight"
                      :error-messages="error['siteaddress']"
        />

        <v-text-field v-if="domainRadioChoice === 'own'"
                      id="inputDomain"
                      prepend-icon="web"
                      name="domain"
                      label="E.g. goat-collective.com"
                      v-model="domain"
                      :disabled="inFlight"
                      :error-messages="error['siteaddress']"
        />

        <p v-if="domainRadioChoice === 'own'">This domain should have a CNAME record pointing to:</p>
        <p v-if="domainRadioChoice === 'own'">"sites-1.dyna.wbstack.com"</p>

        <h3>Your User
          <v-tooltip right>
            <template v-slot:activator="{ on }">
              <v-icon v-on="on">info_outline</v-icon>
            </template>
            <span>Choose the username of your user and the first admin user on the site</span><br/>
            <span>You will receive an email with log in details for this account</span><br/>
          </v-tooltip>
        </h3>

        <v-text-field
        id="inputUsername"
        prepend-icon="person"
        name="username"
        label="E.g., Addshore"
        v-model="username"
        :disabled="inFlight"
        :error-messages="error['username']"
        />

        <h3>Terms of Use</h3>
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
      SUBDOMAIN_SUFFIX: config.SUBDOMAIN_SUFFIX
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
        this.error.siteaddress = errors.domain[0]
      }
      if (errors.username) {
        this.hasError = true
        this.error.username = errors.username[0]
      }
      if (errors.terms) {
        this.hasError = true
        this.error.terms = errors.terms[0]
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

<style>
</style>
