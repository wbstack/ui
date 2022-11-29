<template>
    <v-main>
      <v-container class="fill-height" >
        <v-row justify="left">
          <v-col cols="8">
            <h1>Get in touch with the team</h1>
            <p class="mt-5">Thank you for your interest. We really want to hear what you've got to say. </p>
            <p>Have you got a question? First, check our <a href="https://www.mediawiki.org/wiki/Talk:Wikibase/FAQ">FAQ</a> to see if we've already answered it. We're constantly  updating it with new questions. if you don't find an answer there, feel free to use the contact form below. Thanks!</p>
            <h3 class="mt-5">Want to connect with the Wikibase.cloud community?</h3>
            <p>You can visit our <a href="https://t.me/joinchat/FgqAnxNQYOeAKmyZTIId9g">Telegram channel</a> or join our <a href="https://lists.wikimedia.org/postorius/lists/wikibase-cloud.lists.wikimedia.org/">mailing list</a>.</p>
            <div>
              <h2 class="mt-10 mb-2">Contact Us</h2>
              <v-text-field
                id="Name"
                v-model="name"
                :rules="[rules.required, rules.counter]"
                type="text"
                label="Your Name"
              />
              <v-text-field
                id="contactDetail"
                v-model="contactDetails"
                label="How can we reach you? (optional)"
                hint="For example: email address, Telegram handle, phone number"
              />
              <v-select
                :items=items
                v-model="subject"
                label="What's the main reason for your message?"
              />
              <v-textarea
                id="inputMessage"
                v-model="message"
                auto-grow
                label="Message"
              />
              <div align="right">
                <v-btn color="primary" @click="send">
                  SEND MESSAGE
                </v-btn>
              </div>
            </div>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-alert color="success" elevation="24" class="white--text" v-if="successMessage">
            Your message has been sent. Thanks!
            <v-btn @click="closeAlert" class="white--text" text>Close</v-btn>
          </v-alert>
        </v-row>
      </v-container>
    </v-main>
</template>

<script>
export default {
  data: () => ({
    items: [
      { text: 'General question', value: 'general-question' },
      { text: 'Feature request', value: 'feature-request' },
      { text: 'Report a problem', value: 'report-a-problem' },
      { text: 'Give feedback', value: 'give-feedback' },
      { text: 'Other', value: 'other' }
    ],
    name: '',
    contactDetails: '',
    subject: '',
    message: '',
    successMessage: false
  }),
  methods: {
    closeAlert () {
      this.successMessage = false
    },
    send () {
      const name = this.name
      const subject = this.subject
      const message = this.message
      const contactDetails = this.contactDetails
      // Recaptcha check
      this.$recaptcha('contact').then((token) => {
        this.$api.contact(
          {
            name: name,
            subject: subject,
            contactDetails: contactDetails,
            message: message,
            recaptcha: token
          })
          .then(success => this.createSuccessful())
          .catch(errors => {
            this.resetErrorState()
            // If the api gave use details of the error, then use them
            if (errors) {
              if (errors.name) {
                this.hasError = true
                this.error.inputName = errors.name[0]
              }
              if (errors.subject) {
                this.hasError = true
                this.error.inputSubject = errors.subject[0]
              }
            }
            // Otherwise show a general error state
            if (!this.hasError) {
              this.setGeneralErrorState()
            }
          })
      })
    },
    createSuccessful () {
      this.successMessage = true
    },
    resetErrorState () {
      this.hasError = false
      this.error = []
    },
    setGeneralErrorState (error = 'Something went wrong.') {
      this.resetErrorState()
      this.hasError = true
      this.error.inputName = error
      this.error.inputSubject = error
    }
  }
}
</script>

<style>
</style>
