<template>
  <v-form @submit="createWiki">
    <step-one-card 
      v-if="step === 1" 
      :title="title"
      :inFlight="inFlight"
      v-model="stepOneData"
      :error="error"
      :SUBDOMAIN_SUFFIX="SUBDOMAIN_SUFFIX"
      :CNAME_RECORD="CNAME_RECORD"
      :errorMessages="errorMessages"
      @next-step="goToStep(2)"
    />
    
    <step-two-card 
      v-if="step === 2" 
      :title="title"
      :inFlight="inFlight"
      v-model="stepTwoData"
      @previous-step="goToStep(1)"
      @submit="createWiki"    />
  </v-form>
</template>

<script>
import config from '~/config'
import StepOneCard from './CreateWikiWizardStepOne.vue'
import StepTwoCard from './CreateWikiWizardStepTwo.vue'

export default {
  name: 'CreateWiki',
  components: {
    StepOneCard,
    StepTwoCard
  },
  props: [
    'title',
    'buttonText'
  ],
  computed: {
    currentUser: function () {
      return this.$store.getters.currentUser
    },
    stepOneData: {
      get() {
        return {
          sitename: this.sitename,
          domainRadioChoice: this.domainRadioChoice,
          subdomain: this.subdomain,
          domain: this.domain,
          username: this.username,
          terms: this.terms
        }
      },
      set(data) {
        this.sitename = data.sitename
        this.domainRadioChoice = data.domainRadioChoice
        this.subdomain = data.subdomain
        this.domain = data.domain
        this.username = data.username
        this.terms = data.terms
      }
    },
    stepTwoData: {
      get() {
        return {
          purpose: this.purpose,
          otherPurpose: this.otherPurpose
        }
      },
      set(data) {
        this.purpose = data.purpose
        this.otherPurpose = data.otherPurpose
      }
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
      purpose: '',
      otherPurpose: '',
      hasError: false,
      error: [],
      inFlight: false,
      SUBDOMAIN_SUFFIX: config.SUBDOMAIN_SUFFIX,
      CNAME_RECORD: config.CNAME_RECORD,
      errorMessages: {
        domainTaken: 'The domain has already been taken.',
        domainFormat: 'The subdomain must be at least five characters long and may contain only lowercase Latin letters (a-z), digits (0-9) and hyphens (-).'
      },
      step: 1
    }
  },
  created () { 
    // what's this for?
    // this.buttonText = this.buttonTexts.next;
    this.checkCurrentLogin()
  },
  updated () {
    this.checkCurrentLogin()
  },
  methods: {
    goToStep(stepNumber) {
      this.step = stepNumber
    },
    createWiki (evt) {
      // is this needed?
      if (evt) {
        evt.preventDefault()
      }

      this.inFlight = true
      this.hasError = false
      this.error = []

      // Terms are not checked by the API? so check this here...?
      // Probably should be moved to form validation?
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
          username: this.username,
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
.v-tooltip__content {
  max-width: 448px;
}
</style>
