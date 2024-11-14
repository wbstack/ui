<template>
    <v-main>
          <v-responsive max-width="840px" min-width="250px" >
              <h1>Get in touch with the team</h1>
              <p>Thank you for your interest. We really want to hear what you've got to say.</p>
              <p>Have you got a question? First, check our <a href="https://www.mediawiki.org/wiki/Wikibase/FAQ" target="_blank">FAQ</a> to see if we've already answered it. We're constantly  updating it with new questions. if you don't find an answer there, feel free to use the contact form below. Thanks!</p>
              <h3>Want to connect with the Wikibase.cloud community?</h3>
              <p>You can visit our <a href="https://t.me/joinchat/FgqAnxNQYOeAKmyZTIId9g" target="_blank">Telegram channel</a> or join our <a href="https://lists.wikimedia.org/postorius/lists/wikibase-cloud.lists.wikimedia.org/" target="_blank">mailing list</a>.</p>
              <v-responsive max-width="512px">
                <h2 class="mt-10 mb-2">Contact Us</h2>
                <v-text-field
                  id="Name"
                  v-model="name"
                  :rules="[() => !!name || 'This field is required', v => v.length <= 300 || 'Max 300 characters']"
                  type="text"
                  label="Your Name"
                />
                <v-text-field
                  id="contactDetail"
                  v-model="contactDetails"
                  :rules="[v => v.length <= 300 || 'Max 300 characters']"
                  label="How can we reach you? (optional)"
                  hint="For example: email address, Telegram handle, phone number"
                />
                <v-select
                  :items=items
                  v-model="subject"
                  label="What's the main reason for your message?"
                  :rules="[() => !!subject || 'This field is required']"
                />
                <v-textarea
                  id="inputMessage"
                  counter="10000"
                  v-model="message"
                  :rules="[v => v.length <= 10000 || 'Message must be 10000 characters or less', () => !!message || 'This field is required']"
                  auto-grow
                  label="Message"
                />
                <div align="right">
                  <v-btn color="primary" @click="send" class="mt-6">
                    SEND MESSAGE
                  </v-btn>
                </div>
              </v-responsive>
          <v-snackbar color="success" elevation="24" v-model="successMessage">
            Your message has been sent. Thanks!
            <template v-slot:action>
              <v-btn
                text
                variant="text"
                @click="closeAlert"
              >
                Close
              </v-btn>
            </template>
          </v-snackbar>
          <v-snackbar color="error" elevation="24" v-model="errorMessage" multi-line>
            Something went wrong with sending your message. Please try again.
            <template v-slot:action>
              <v-btn
                text
                variant="text"
                @click="closeAlert"
              >
                Close
              </v-btn>
            </template>
          </v-snackbar>
      </v-responsive>
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
    successMessage: false,
    errorMessage: false
  }),
  methods: {
    closeAlert () {
      this.successMessage = false
      this.errorMessage = false
    },
    send () {
      const name = this.name
      const subject = this.subject
      const message = this.message
      const contactDetails = this.contactDetails
      // Recaptcha check
      this.$recaptcha('contact').then((recaptcha) => {
        this.$api.contact(
          {
            name: name,
            subject: subject,
            contactDetails: contactDetails,
            message: message,
            recaptcha: recaptcha
          })
          .then(success => this.createSuccessful())
          .catch(errors => {
            this.resetErrorState()
            this.createError()
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
    createError () {
      this.errorMessage = true
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
