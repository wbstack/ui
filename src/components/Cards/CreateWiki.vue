<template>
  <v-form @submit="createWiki">
    <SiteDetailsCreateWikiWizardStep
      v-show="step === Steps.SITE_DETAILS"
      :title="title"
      :inFlight="inFlight"
      v-model="siteDetails"
      :error="error"
      :SUBDOMAIN_SUFFIX="SUBDOMAIN_SUFFIX"
      :CNAME_RECORD="CNAME_RECORD"
      :errorMessages="errorMessages"
      @next-step="goToStep(Steps.AUDIENCE_AND_PURPOSE)"
    />

    <AudienceAndPurposeWizardStep
      v-show="step === Steps.AUDIENCE_AND_PURPOSE"
      :title="title"
      :inFlight="inFlight"
      :dismissable="false"
      v-model="audienceAndPurpose"
      @previous-step="goToStep(Steps.SITE_DETAILS)"
      @next-step="goToStep(Steps.TEMPORALITY)"
    />

    <TemporalityCreateWikiWizardStep
      v-show="step === Steps.TEMPORALITY"
      :title="title"
      :inFlight="inFlight"
      :error="error"
      :dismissable="false"
      v-model="temporality"
      @previous-step="goToStep(Steps.AUDIENCE_AND_PURPOSE)"
      @submit="createWiki"
    />
  </v-form>
</template>

<script>
import config from '~/config'
import SiteDetailsCreateWikiWizardStep from './SiteDetailsCreateWikiWizardStep.vue'
import AudienceAndPurposeWizardStep from './AudienceAndPurposeWizardStep.vue'
import TemporalityCreateWikiWizardStep from './TemporalityCreateWikiWizardStep.vue'

const Steps = Object.freeze({
  SITE_DETAILS: 'SiteDetails',
  AUDIENCE_AND_PURPOSE: 'AudienceAndPurpose',
  TEMPORALITY: 'Temporality'
});

export default {
  name: 'CreateWiki',
  components: {
    SiteDetailsCreateWikiWizardStep,
    AudienceAndPurposeWizardStep,
    TemporalityCreateWikiWizardStep
  },
  props: [
    'title'
  ],
  computed: {
    currentUser: function () {
      return this.$store.getters.currentUser
    }
  },
  data () {
    return {
      siteDetails: {
        sitename: '',
        domainRadioChoice: 'sub',
        subdomain: '',
        domain: '',
        username: ''
      },
      audienceAndPurpose: {
        purpose: '',
        otherPurpose: '',
        audience: '',
        otherAudience: ''
      },
      temporality: {
        temporality: '',
        otherTemporality: ''
      },
      hasError: false,
      error: [],
      inFlight: false,
      SUBDOMAIN_SUFFIX: config.SUBDOMAIN_SUFFIX,
      CNAME_RECORD: config.CNAME_RECORD,
      errorMessages: {
        domainTaken: 'The domain has already been taken.',
        domainFormat: 'The subdomain must be at least five characters long and may contain only lowercase Latin letters (a-z), digits (0-9) and hyphens (-).'
      },
      Steps,
      step: Steps.SITE_DETAILS
    }
  },
  created () {
    this.checkCurrentLogin()
  },
  updated () {
    this.checkCurrentLogin()
  },
  methods: {
    goToStep (stepName) {
      this.step = stepName
    },
    createWiki (evt) {
      if (evt) {
        evt.preventDefault()
      }

      this.inFlight = true
      this.hasError = false
      this.error = []

      if (this.hasError) {
        this.inFlight = false
        return
      }

      // Figure out the actual domain to submit to the api!
      let domainToSubmit = ''
      if (this.siteDetails.domainRadioChoice === 'sub') {
        domainToSubmit = this.siteDetails.subdomain + this.SUBDOMAIN_SUFFIX
      }
      if (this.siteDetails.domainRadioChoice === 'own') {
        domainToSubmit = this.siteDetails.domain
      }

      const profileJSObject = {
        purpose: this.audienceAndPurpose.purpose,
        ...(this.audienceAndPurpose.otherPurpose && { purpose_other: this.audienceAndPurpose.otherPurpose }),
        ...(this.audienceAndPurpose.audience && { audience: this.audienceAndPurpose.audience }),
        ...(this.audienceAndPurpose.otherAudience && { audience_other: this.audienceAndPurpose.otherAudience }),
        temporality: this.temporality.temporality,
        ...(this.temporality.otherTemporality && { temporality_other: this.temporality.otherTemporality })
      }
      const profileJsonString = JSON.stringify(profileJSObject)

      this.$api.createWiki(
        {
          domain: domainToSubmit,
          sitename: this.siteDetails.sitename,
          username: this.siteDetails.username,
          profile: profileJsonString
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
      // Probably we want to go back to the first step that has an error in this case.
      this.error = []
      // all these errors are shown on the first step.
      this.goToStep(Steps.SITE_DETAILS)
      if (errors.sitename) {
        this.hasError = true
        this.error.sitename = errors.sitename[0]
      }
      if (errors.domain) {
        this.hasError = true
        if (errors.domain[0] === 'The domain has already been taken.') {
          this.error.siteaddress = this.errorMessages.domainTaken
        } else {
          this.error.siteaddress = this.errorMessages.domainFormat
        }
      }
      if (errors.username) {
        this.hasError = true
        this.error.username = errors.username[0]
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
.v-tooltip__content {
  max-width: 448px;
}
</style>
