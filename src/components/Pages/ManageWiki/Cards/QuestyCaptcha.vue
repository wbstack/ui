<template>
  <v-card>
    <v-card-title>Additional Spam Protection</v-card-title>
    <v-card-text class="pb-2">
      QuestyCaptcha offers an extra layer of protection against spam accounts. During account creation, users will have to answer a question, which can be defined in settings. For more information on QuestyCaptcha, please visit the documentation page
    </v-card-text>
    <v-col class="switch">
      <v-switch
        label="Activate spam protection"
        v-model="isCaptchaActive"
        @change="toggleCaptcha"
        :loading="waitForToggleUpdate"
        :disabled="waitForToggleUpdate"
      />
    </v-col>
    <v-expansion-panels class="settings-panel" v-model="panel">
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
                :disabled="waitForQuestionsUpdate"
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
                :disabled="waitForQuestionsUpdate"
              >
                <template v-slot:selection="{ item }" >
                  <v-chip class="chips" :disabled="waitForQuestionsUpdate">
                  <span class="pr-1">
                    {{ item }}
                  </span>
                    <v-icon
                      small
                      @click="removeAnswer(entry, item)"
                      :disabled="waitForQuestionsUpdate"
                    >
                      mdi-close-circle
                    </v-icon>
                  </v-chip>
                </template>
              </v-combobox>
            </div>
            <div class="d-flex pb-12 pt-10">
              <v-btn @click="addQuestion" :disabled="waitForQuestionsUpdate" elevation=0 plain class="ml-auto">+ ADD QUESTION</v-btn>
            </div>
            <div>
              <v-btn @click="saveForm" :disabled="waitForQuestionsUpdate" color="primary" width="100%">SAVE QUESTIONS</v-btn>
            </div>
            <div class="pt-4">
              <v-btn @click="recoverDefaultQuestions" :disabled="waitForQuestionsUpdate" elevation=0 width="100%">RECOVER DEFAULT QUESTIONS</v-btn>
            </div>
          </v-form>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <Message ref="message" />
  </v-card>
</template>

<script>
import Message from '../Features/Message.vue';

export default {
  name: 'QuestyCaptcha',
  components: {
    Message
  },
  props: [
    'wikiId'
  ],
  data () {
    return {
      message: false,
      questionsFromStore: [],
      defaultQuestions: [],
      isCaptchaActive: false,
      hasNoQuestions: false,
      panel: false,
      waitForToggleUpdate: false,
      waitForQuestionsUpdate: false
    }
  },
  computed: {
    showDeleteButton: function () {
      return this.questionsFromStore.length > 1
    }
  },
  created () {
    this.defaultQuestions = this.$store.state.wikis.currentWikiSettings.defaultQuestions
    this.isCaptchaActive = this.$store.state.wikis.currentWikiSettings.wwUseQuestyCaptcha
    this.questionsFromStore = this.$store.state.wikis.currentWikiSettings.captchaQuestions
    this.hasNoQuestions = !this.questionsFromStore
    if (this.hasNoQuestions) {
      this.recoverDefaultQuestions()
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
      this.questionsFromStore.splice(index, 1)
    },
    addQuestion () {
      this.questionsFromStore.push({
        question: '',
        answers: []
      })
    },
    formatQuestionsForApi (questions) {
      return JSON.stringify(questions.reduce((out, entry) => {
        out[entry.question] = entry.answers
        return out
      }, {}))
    },
    async toggleCaptcha (enabled) {
      try {
        this.waitForToggleUpdate = true
        if (enabled && this.hasNoQuestions) {
          await this.$store.dispatch('updateSetting', {
            wiki: this.wikiId, setting: 'wwCaptchaQuestions', value: this.formatQuestionsForApi(this.defaultQuestions)
          })
          await this.$store.dispatch('setQuestyCaptchaQuestions', this.defaultQuestions)
          this.hasNoQuestions = false
        }
        await this.$store.dispatch('updateSetting', { wiki: this.wikiId, setting: 'wwUseQuestyCaptcha', value: enabled })
        await this.$store.dispatch('setEnabledQuestyCaptcha', enabled)
        this.$refs.message.show('success', `QuestyCaptcha has been successfully ${enabled ? 'enabled' : 'disabled'}.`)
      } catch (error) {
        console.error(error.response)
        this.$refs.message('error', `Something went wrong while ${enabled ? 'enabling' : 'disabling'} QuestyCaptcha. Please try again.`)
        await this.$nextTick()
        this.isCaptchaActive = !enabled
      } finally {
        this.waitForToggleUpdate = false
      }
    },
    async saveForm () {
      this.waitForQuestionsUpdate = true

      for (let i = 0; i < this.questionsFromStore.length; i++) {
        const entry = this.questionsFromStore[i]
        const noQuestion = entry.question.trim() === ''
        const noAnswer = entry.answers && entry.answers.length === 0
        if (noQuestion && noAnswer && this.questionsFromStore.length > 1) {
          this.questionsFromStore.splice(i, 1)
        }
      }

      await this.$nextTick()
      this.$refs.questyForm.validate()
      const invalidField = this.$refs.questyForm.$children.find((field) => {
        return typeof field.validate === 'function' && !field.validate()
      })
      if (invalidField) {
        invalidField.$el.scrollIntoView({ behavior: 'smooth' })
        this.waitForQuestionsUpdate = false
        return
      }

      try {
        await this.$store.dispatch('updateSetting', {
          wiki: this.wikiId, setting: 'wwCaptchaQuestions', value: this.formatQuestionsForApi(this.questionsFromStore)
        })
        await this.$store.dispatch('setQuestyCaptchaQuestions', this.questionsFromStore)
        this.$refs.message.show('success', 'Your questions have been saved.')
        this.hasNoQuestions = false
        this.panel = false
      } catch (error) {
        console.error(error.response)
        this.$refs.message.show('error', 'Something went wrong with saving your questions. Please try again.')
      } finally {
        this.waitForQuestionsUpdate = false
      }
    },
    recoverDefaultQuestions () {
      // parse() and stringify() are being used to make a copy
      this.questionsFromStore = JSON.parse(JSON.stringify(this.defaultQuestions))
    }
  }
}
</script>

<style lang="css" scoped>
.switch {
  padding-left: 20px;
  padding-bottom: 0;
  padding-top: 0;
}
.settings-panel {
  position: static;
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
