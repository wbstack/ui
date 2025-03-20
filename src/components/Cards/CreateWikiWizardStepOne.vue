<template>
    <v-card class="elevation-12">
      <v-toolbar dark color="primary">
        <v-toolbar-title>{{ title }}</v-toolbar-title>
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
          v-model="value.sitename"
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
  
        <v-radio-group 
          row 
          v-model="value.domainRadioChoice" 
          :mandatory="true"
        >
          <v-radio label="Free Subdomain" value="sub"></v-radio>
          <v-radio label="Custom Domain" value="own"></v-radio>
        </v-radio-group>
  
        <v-text-field v-if="value.domainRadioChoice === 'sub'"
          id="inputSubdomain"
          prepend-icon="mdi-web"
          name="subdomain"
          label="e.g., goat-collective"
          v-model="value.subdomain"
          :suffix="SUBDOMAIN_SUFFIX"
          :disabled="inFlight"
          :error-messages="error['siteaddress']"
          :hint="errorMessages.domainFormat"
        />
  
        <v-text-field v-if="value.domainRadioChoice === 'own'"
          id="inputDomain"
          prepend-icon="mdi-web"
          name="domain"
          label="e.g., goat-collective.com"
          v-model="value.domain"
          :disabled="inFlight"
          :error-messages="error['siteaddress']"
        />
  
        <p v-if="value.domainRadioChoice === 'own'">This domain should have a CNAME record pointing to:</p>
        <p v-if="value.domainRadioChoice === 'own'">"{{ CNAME_RECORD }}"</p>
  
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
          v-model="value.username"
          :disabled="inFlight"
          :error-messages="error['username']"
        />
        <!-- I should be on card three -->
        <h3>Terms of use</h3>
        <v-checkbox
          v-model="value.terms"
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
          type="button"
          color="primary"
          :disabled="inFlight"
          @click="$emit('next-step')"
        >
          Next &gt;
        </v-btn>
      </v-card-actions>
    </v-card>
  </template>
  
  <script>
  export default {
    name: 'StepOneCard',
    props: {
      title: String,
      inFlight: Boolean,
      value: Object,
      error: Array,
      SUBDOMAIN_SUFFIX: String,
      CNAME_RECORD: String,
      errorMessages: Object
    }
  }
  </script>