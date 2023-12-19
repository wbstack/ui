<template>
  <v-card>
    <v-card-title>Additional Spam Protection</v-card-title>
    <v-card-text>
      QuestyCaptcha offers an extra layer of protection against spam accounts. During account creation, users will have to answer a question, which can be defined in settings. For more information on QuestyCaptcha, please visit the documentation page
    </v-card-text>
    <v-col class="checkbox">
      <v-checkbox label="Activate spam protection"></v-checkbox>
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
          <div class="pt-10" v-for="(questy, index) in defaultQuestions" :key="index">
            Question
            <v-text-field
              ref="question"
              v-model="questy.question"
              outlined
              append-outer-icon="mdi-delete-outline"
              :rules="[() => !!questy.question || 'Field cannot be empty. Please provide a question']"
              @click:append-outer="removeQuestion(index)"
            ></v-text-field>
            Answer
            <v-combobox
              class="answer-box"
              v-model="questy.answers"
              :items="questy.answers"
              multiple
              outlined
              :rules="[required]"
              hide-selected
              hide-details
            >
              <template v-slot:selection="{ item }" >
                <v-chip
                  :input-value="selected"
                >
                  <span class="pr-1">
                    {{ item }}
                  </span>
                  <v-icon
                    small
                    @click="removeAnswer(questy, item)"
                  >
                    mdi-close-circle
                  </v-icon>
                </v-chip>
              </template>
            </v-combobox>
          </div>
<!--          Buttons-->
          <div class="d-flex pb-12 pt-3">
            <v-btn @click="addQuestion" elevation=0 plain class="ml-auto">+ ADD QUESTION</v-btn>
          </div>
          <div>
            <v-btn @click="saveQuestions" color="primary" width="100%">SAVE QUESTIONs</v-btn>
          </div>
          <div class="pt-4">
            <v-btn @click="recoverDefaultQuestions" width="100%">RECOVER DEFAULT QUESTIONS</v-btn>
          </div>
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
  data () {
    return {
      defaultQuestions: [
        {
          question: 'How many vowels are in this question?',
          answers: ['12', 'twelve']
        },
        {
          question: 'What is the chemical formula of water?',
          answers: ['H2O']
        },
        {
          question: '2 + 4 = ?',
          answers: ['6', 'six']
        }
      ],
      successMessage: false,
      errorMessage: false
    }
  },
  methods: {
    removeAnswer (question, answer) {
      const index = question.answers.indexOf(answer)
      if (index !== -1) {
        question.answers.splice(index, 1)
      }
    },
    removeQuestion (index) {
      this.defaultQuestions.splice(index, 1)
    },
    addQuestion () {
      this.defaultQuestions.push({
        question: '',
        answers: []
      })
    },
    saveQuestions () {
      this.successMessage = true
    },
    recoverDefaultQuestions () {},
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
}
>>> .answer-box .v-input__append-inner {
  display: none !important;
}
</style>
