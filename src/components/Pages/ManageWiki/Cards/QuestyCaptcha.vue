<template>
  <v-card>
    <v-card-title>Additional Spam Protection</v-card-title>
    <v-card-text class="pb-2">
      QuestyCaptcha offers an extra layer of protection against spam accounts. During account creation, users will have to answer a question, which can be defined in settings. For more information on QuestyCaptcha, please visit the documentation page
    </v-card-text>
    <v-col class="checkbox">
      <v-checkbox label="Activate spam protection" v-model="captchaActivate"></v-checkbox>
    </v-col>
    <v-expansion-panels v-model="panel">
      <v-expansion-panel>
        <v-expansion-panel-header>
          <strong>SETTINGS</strong>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <strong>Guidelines for creating questions and answers:</strong><br/>
          <ul>
            <li>Keep in mind that users have a wide variety of knowledge and abilities. We therefore recommend three questions at minimum, each requiring different abilities or knowledge.</li>
            <li>Consider cultural bias. Use questions that rely on universal knowledge or knowledge related to your wiki.</li>
            <li>Keep the answers short and simple. Ideally, try to use questions with only one possible answer.</li>
          </ul>
          <v-form ref="questyForm">
            <div class="pt-10" v-for="(entry, index) in questionsFromStore" :key="index">
              Question
              <v-text-field
                class="trash-icon pb-2"
                v-model="entry.question"
                outlined
                hide-details="auto"
                :append-outer-icon="showDeleteButton ? 'mdi-delete-outline' : undefined"
                :rules="[() => !!entry.question || 'Field cannot be empty. Please provide a question.']"
                @click:append-outer="removeQuestion(index)"
                dense
              ></v-text-field>
              Answer
              <v-combobox
                :class="{'answer-box': true, 'answer-input-field': showDeleteButton}"
                v-model="entry.answers"
                :items="entry.answers"
                multiple
                outlined
                :rules="[() => !!entry.answers.length || 'Field cannot be empty. Please provide an answer.']"
                hide-selected
                hide-details="auto"
                dense
              >
                <template v-slot:selection="{ item }" >
                  <v-chip class="chips">
                  <span class="pr-1">
                    {{ item }}
                  </span>
                    <v-icon
                      small
                      @click="removeAnswer(entry, item)"
                    >
                      mdi-close-circle
                    </v-icon>
                  </v-chip>
                </template>
              </v-combobox>
            </div>
            <div class="d-flex pb-12 pt-10">
              <v-btn @click="addQuestion" elevation=0 plain class="ml-auto">+ ADD QUESTION</v-btn>
            </div>
            <div>
              <v-btn @click="saveForm" color="primary" width="100%">SAVE QUESTIONS</v-btn>
            </div>
            <div class="pt-4">
              <v-btn @click="recoverDefaultQuestions"  elevation=0 width="100%">RECOVER DEFAULT QUESTIONS</v-btn>
            </div>
          </v-form>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-snackbar :color="message.status" elevation="24" v-model="message.show">
      {{ message.text }}
      <template v-slot:action>
        <v-btn
          text
          variant="text"
          @click="message.show = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-card>
</template>

<script>
export default {
  name: 'QuestyCaptcha',
  props: [
    'wikiId'
  ],
  data () {
    return {
      message: false,
      captchaActivate: false,
      questionsFromStore: [],
      panel: false
    }
  },
  computed: {
    showDeleteButton: function () {
      return this.questionsFromStore.length > 1
    }
  },
  created () {
    this.questionsFromStore = this.$store.state.wikis.currentWikiSettings.captchaQuestions
    this.captchaActivate = this.$store.state.wikis.currentWikiSettings.wwUseQuestyCaptcha
  },
  methods: {
    removeAnswer (question, answer) {
      const index = question.answers.indexOf(answer)
      if (index !== -1) {
        question.answers.splice(index, 1)
      }
    },
    removeQuestion (index) {
      this.questionsFromStore.splice(index, 1)
    },
    addQuestion () {
      this.questionsFromStore.push({
        question: '',
        answers: []
      })
    },
    showMessage (status, message) {
      this.message = { status: status, text: message, show: true }
    },
    async saveForm () {
      for (let i = 0; i < this.questionsFromStore.length; i++) {
        const entry = this.questionsFromStore[i]
        const noQuestion = entry.question.trim() === ''
        const noAnswer = entry.answers && entry.answers.length === 0
        if (noQuestion && noAnswer && this.questionsFromStore.length > 1) {
          this.questionsFromStore.splice(i, 1)
        }
      }

      await this.$nextTick()
      const invalidField = this.$refs.questyForm.$children.find((field) => {
        return typeof field.validate === 'function' && !field.validate()
      })
      if (invalidField) {
        invalidField.$el.scrollIntoView({ behavior: 'smooth' })
        return
      }

      const questions = {}
      this.questionsFromStore.forEach(item => {
        questions[item.question] = item.answers
      })

      try {
        await Promise.all([
          this.$store.dispatch('updateSetting', { wiki: this.wikiId, setting: 'wwUseQuestyCaptcha', value: this.captchaActivate }),
          this.$store.dispatch('updateSetting', { wiki: this.wikiId, setting: 'wwCaptchaQuestions', value: JSON.stringify(questions) })
        ])
        await Promise.all([
          this.$store.dispatch('setEnabledQuestyCaptcha', this.captchaActivate),
          this.$store.dispatch('setQuestyCaptchaQuestions', this.questionsFromStore)
        ])
        this.showMessage('success', 'Your questions have been saved.')
        this.panel = false
      } catch (error) {
        console.log(error.response)
        this.showMessage('error', 'Something went wrong with saving your questions. Please try again.')
      }
    },
    recoverDefaultQuestions () {
      const recoveredDefaultQuestions = this.$store.state.wikis.currentWikiSettings.defaultQuestions
      // parse() and stringify() are being used to make a copy
      this.questionsFromStore = JSON.parse(JSON.stringify(recoveredDefaultQuestions))
    }
  }
}
</script>

<style lang="css" scoped>
.checkbox {
  padding-left: 20px;
  padding-bottom: 0;
  padding-top: 0;
}
.answer-input-field {
  margin-right: 33px !important;
}
>>> .answer-box .v-input__append-inner {
  display: none !important;
}
.chips {
  margin: 0 8px 0 0 !important;
}
>>> .trash-icon .v-input__append-outer {
  margin-top: 0 !important;
}
</style>
