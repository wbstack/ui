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

        <h3>Resource Tier</h3>
        <p>What resource level would you like to allocate to your site?</p>
        <p>During Alpha only the free tier is supported.</p>
        <v-select
          v-model="freeSelected"
          :items="resourceTiers"
          label="Resource tier"
          solo
        ></v-select>

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
      freeSelected: 'free',
      resourceTiers: [
        {
          text: 'Free',
          value: 'free',
        },
        {
          text: 'Personal',
          value: 'personal',
          disabled: true
        },
        {
          text: 'Premium',
          value: 'premium',
          disabled: true
        },
        {
          text: 'Pro',
          value: 'pro',
          disabled: true
        }
      ],
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
        .catch((error) => this.createFail(error))
    },
    createSuccess (req) {
      this.hasError = false
      this.error = []
      // this.$router.replace(this.$route.query.redirect || '/wikis/manage/' + req.data.data.id)
      this.$router.replace('/wikis/manage/' + req.data.data.id)
    },
    createFail () {
      this.hasError = true
      this.error['sitename'] = 'Creation failed!'
      this.error['siteaddress'] = 'Creation failed!'
      this.error['username'] = 'Creation failed!'
      this.error['terms'] = 'Creation failed!'
      this.inFlight = false
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
