<template>
  <v-form ref="form">
    <v-card>
      <v-card-title class="card-title">
        <span>Intended use</span>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-icon v-on="on">mdi-information-outline</v-icon>
          </template>
          <span>The information provided here will allow potential contributors and data re-users to identify instances that are intended for broader use.</span>
        </v-tooltip>
      </v-card-title>
      <v-card-text>
        This information describes how you intend to use this Wikibase. Please update it when it changes. It will be visible to all users exploring Wikibases in the ecosystem.
      </v-card-text>
      <v-card-text v-if="!hasProfile">
        <div class="no-profile-banner">
          <v-icon>mdi-information-outline</v-icon>
          <div>No intended use selected for this instance. Please provide information on intended use.</div>
        </div>
      </v-card-text>
      <v-card-text>
        <div class="profile">
          <div>
            <div class="question">What best describes how you intend to use this Wikibase?</div>
            <div class="response">{{ getQuestionResponse('purpose') }}</div>
          </div>
          <div v-if="hasAudience">
            <div class="question">Who is the intended audience for this data?</div>
            <div class="response">{{ getQuestionResponse('audience') }}</div>
          </div>
          <div>
            <div class="question">How long do you plan to use this Wikibase?</div>
            <div class="response">{{ getQuestionResponse('temporality') }}</div>
            <div v-if="isWikiTemporary" class="delete-wiki">
              Please make sure to delete this Wikibase when you no longer need it.
            </div>
          </div>
        </div>
        <span v-if="updatedAt" class="updated-at">{{ updatedAt }}</span>
      </v-card-text>
      <Message ref="message" />
    </v-card>
  </v-form>
</template>

<script>
import Message from '../Features/Message.vue'

const providedResponses = {
  purpose: {
    data_hub: 'To publish potentially useful data.',
    data_lab: 'To refine, back up, or experiment with data in an isolated environment.',
    tool_lab: 'To build tools, write documentation, or contribute to the Wikidata & Wikibase ecosystem in ways other than data.',
    test_drive: 'To learn about the tool, or evaluate whether it works for my use case.',
    decide_later: 'I will decide later.'
  },
  audience: {
    wide: 'Anyone interested.',
    narrow: 'Myself or my organization.'
  },
  temporality: {
    permanent: 'I would prefer to keep it on a permanent basis.',
    temporary: 'It is temporary/disposable. I will no longer need it after it served its purpose.',
    decide_later: 'I will decide later.'
  }
}

export default {
  name: 'Profile',
  components: {
    Message
  },
  props: [
    'wikiId'
  ],
  data () {
    return {
      profile: {}
    }
  },
  computed: {
    hasProfile: function () {
      return !!this.profile.updated_at
    },
    hasAudience: function () {
      return !!this.profile.audience
    },
    isWikiTemporary: function () {
      return this.profile.temporality === 'temporary'
    },
    updatedAt: function () {
      if (this.profile.updated_at) {
        return `Last updated on ${new Date(this.profile.updated_at).toLocaleString()}`
      }
      return false
    }
  },
  methods: {
    getQuestionResponse (question) {
      const customResponse = this.profile[question + '_other']
      if (customResponse) {
        return `Other: ${customResponse}`
      }
      const providedResponse = this.profile[question]
      if (providedResponse) {
        return providedResponses[question][providedResponse]
      }
      return 'No answer selected.'
    }
  },
  async created () {
    try {
      const details = await this.$api.wikiDetails({ wiki: this.wikiId })
      this.profile = details.wiki_latest_profile ?? {}
    } catch (error) {
      console.log(error)
      this.$refs.message.show('error', 'Something went wrong with fetching your intended use.')
    }
  }
}
</script>

<style lang="css" scoped>
.card-title {
  display: flex;
  flex-wrap: wrap-reverse;
  gap: 0 24px;
}
.card-title > span {
  flex-grow: 1;
}
.card-title .v-icon {
  cursor: pointer;
}
.v-card > .v-card__text {
  padding-top: 0;
}
.no-profile-banner {
  background-color: rgba(255, 236, 179, 1);
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 16px;
}
.no-profile-banner > .v-icon {
  float: left;
  margin-right: 16px;
}
.profile {
  border-radius: 4px;
  background-color: rgba(238, 238, 238, 1);
  padding: 16px;
  color: rgba(0, 0, 0, 0.87);
}
.profile > :first-child {
  margin-top: 0;
}
.profile > :not(:first-child) {
  margin-top: 16px;
  margin-bottom: 16px;
}
.profile > :last-child {
  margin-bottom: 0;
}
.profile .question {
  font-size: 16px;
  font-weight: 400;
}
.profile .response {
  font-size: 16px;
  font-weight: 700;
}
.delete-wiki {
  color: rgba(191, 54, 12, 1);
  font-size: 14px;
}
.updated-at {
  font-size: 12px;
  font-style: italic;
}
</style>
