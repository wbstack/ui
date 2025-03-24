<template>
  <v-form @submit="createWiki">
    <step-one-card 
      v-show="step === 1" 
      :title="title"
      :inFlight="inFlight"
      v-model="stepOne"
      :error="error"
      :SUBDOMAIN_SUFFIX="SUBDOMAIN_SUFFIX"
      :CNAME_RECORD="CNAME_RECORD"
      :errorMessages="errorMessages"
      @next-step="goToStep(2)"
    />
    
    <step-two-card 
      v-show="step === 2" 
      :title="title"
      :inFlight="inFlight"
      v-model="stepTwo"
      @previous-step="goToStep(1)"
      @next-step="goToStep(3)"
    />

    <step-three-card 
      v-show="step === 3" 
      :title="title"
      :inFlight="inFlight"
      :error="error"
      v-model="stepThree"
      @previous-step="goToStep(2)"
      @submit="createWiki"
    />
  </v-form>
</template>

<script>
import config from '~/config'
import StepOneCard from './CreateWikiWizardStepOne.vue'
import StepTwoCard from './CreateWikiWizardStepTwo.vue'
import StepThreeCard from './CreateWikiWizardStepThree.vue'

export default {
  name: 'CreateWiki',
  components: {
    StepOneCard,
    StepTwoCard,
    StepThreeCard,
  },
  props: [
    'title',
    'buttonText'
  ],
  computed: {
    currentUser: function () {
      return this.$store.getters.currentUser
    },
  },
  data () {
    return {
      stepOne: {
        sitename: '',
        domainRadioChoice: 'sub',
        subdomain: '',
        domain: '',
        username: '',
      },
      stepTwo: {
        purpose: '',
        otherPurpose: '',
        audience: '',
        otherAudience: '',
      },
      stepThree: {
        temporality: '',
        otherTemporality: '',
        terms: false,
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
      if (this.stepOne.domainRadioChoice === 'sub') {
        domainToSubmit = this.stepOne.subdomain + this.SUBDOMAIN_SUFFIX
      }
      if (this.stepOne.domainRadioChoice === 'own') {
        domainToSubmit = this.stepOne.domain
      }

      const profileJSObject = {
            purpose: this.stepTwo.purpose,
            ...(this.stepTwo.otherPurpose && {purpose_other:this.stepTwo.otherPurpose}),
            audience: this.stepTwo.audience,
            ...(this.stepTwo.otherAudience && {audience_other: this.stepTwo.otherAudience}),
            temporality: this.stepThree.temporality,
            ...(this.stepThree.otherTemporality && {temporality_other: this.stepThree.otherTemporality}),
          };
      const profileJsonString = JSON.stringify(profileJSObject);

      this.$api.createWiki(
        {
          domain: domainToSubmit,
          sitename: this.stepOne.sitename,
          username: this.stepOne.username,
          profile: profileJsonString,
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
