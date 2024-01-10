<template>
  <v-card>
    <v-card-title>Additional Spam Protection</v-card-title>
    <v-card-text class="text">
      QuestyCaptcha offers an extra layer of protection against spam accounts. During account creation, users will have to answer a question, which can be defined in settings. For more information on QuestyCaptcha, please visit the documentation page
    </v-card-text>
    <v-col class="checkbox">
      <v-checkbox label="Activate spam protection" v-model="captchaActivate"></v-checkbox>
    </v-col>
<!--    Setting Panel-->
    <v-expansion-panels>
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
<!--          Question/Answer Bundle-->
          <v-form ref="questyForm">
            <div class="pt-5" v-for="(entry, index) in questionsFromStore" :key="index">
              Question
              <v-text-field
                class="input-field trash-icon text-field"
                v-model="entry.question"
                outlined
                :append-outer-icon="showIcon ? 'mdi-delete-outline' : undefined"
                :rules="[() => !!entry.question || 'Field cannot be empty. Please provide a question']"
                @click:append-outer="removeQuestion(index)"
              ></v-text-field>
              Answer
              <v-combobox
                class="answer-box input-field text-field"
                v-model="entry.answers"
                :items="entry.answers"
                multiple
                outlined
                :rules="[required]"
                hide-selected
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
<!--          Buttons-->
            <div class="d-flex pb-12 pt-2">
              <v-btn @click="addQuestion" elevation=0 plain class="ml-auto">+ ADD QUESTION</v-btn>
            </div>
            <div>
              <v-btn @click="saveForm" color="primary" width="100%">SAVE QUESTIONS</v-btn>
            </div>
            <div class="pt-4">
              <v-btn @click="recoverDefaultQuestions" width="100%">RECOVER DEFAULT QUESTIONS</v-btn>
            </div>
          </v-form>
<!--          Success/Error Message Snackbar-->
          <v-snackbar color="success" elevation="24" v-model="successMessage">
            Your questions have been saved
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
          <v-snackbar color="error" elevation="24" v-model="errorMessage">
            Something is wrong with saving your questions. Please try again
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
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
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
      successMessage: false,
      errorMessage: false,
      captchaActivate: false,
      questionsFromStore: [],
      showIcon: true
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

      if (this.questionsFromStore.length === 1) {
        this.showIcon = false
      }
    },
    addQuestion () {
      this.questionsFromStore.push({
        question: '',
        answers: []
      })

      if (this.questionsFromStore.length > 1) {
        this.showIcon = true
      }
    },
    saveForm () {
      if (!this.$refs.questyForm.validate()) {
        return
      }
      const wiki = this.wikiId
      const promises = []
      const captchaEnabledSetting = 'wwUseQuestyCaptcha'
      const captchaQuestionsSetting = 'wwCaptchaQuestions'
      const enableValue = this.captchaActivate
      const questions = {}
      this.questionsFromStore.forEach(item => {
        questions[item.question] = item.answers
      })
      const JSONQuestions = JSON.stringify(questions)
      promises.push(
        this.$store.dispatch('updateSetting', { wiki, setting: captchaEnabledSetting, value: enableValue }),
        this.$store.dispatch('updateSetting', { wiki, setting: captchaQuestionsSetting, value: JSONQuestions })
      )
      Promise.all(promises)
        .then(() => {
          this.$store.dispatch('setEnabledQuestyCaptcha', enableValue)
          this.$store.dispatch('setQuestyCaptchaQuestions', this.questionsFromStore)
          this.successMessage = true
        })
        .catch(err => {
          console.log(err.response)
          this.errorMessage = true
        })
    },
    recoverDefaultQuestions () {
      const recoveredDefaultQuestions = this.$store.state.wikis.currentWikiSettings.defaultQuestions
      this.questionsFromStore = JSON.parse(JSON.stringify(recoveredDefaultQuestions))
    },
    required (value) {
      if (value.length === 0) {
        return 'Field cannot be empty. Please provide an answer'
      }
      return !!value || 'Field cannot be empty. Please provide an answer'
    },
    closeAlert () {
      this.successMessage = false
      this.errorMessage = false
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
>>> .input-field .v-input__slot {
  min-height: 40px !important;
}
>>> .answer-box .v-input__append-inner {
  display: none !important;
}
>>> .answer-box .v-select__selections {
  padding-bottom: 4px !important;
  padding-top: 4px !important;
}
.chips {
  margin: 0 8px 0 0 !important;
}
.text {
  padding-bottom: 0 !important;
}
>>> .trash-icon .v-input__append-outer {
  margin-top: 0 !important;
}
>>> .text-field .v-text-field__details {
  margin-bottom: -2px !important;
}
</style>
