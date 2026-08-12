<template>
  <v-card class="elevation-12">
    <v-toolbar dark color="primary">
      <v-toolbar-title>{{ title }}</v-toolbar-title>
    </v-toolbar>

    <v-card-text>
      <v-form ref="inputForm" v-on:submit.prevent>
        <h3>How long do you plan to use this Wikibase?</h3>

        <v-radio-group
          v-model="value.temporality"
          :error-messages=error
          :rules="[() => !!value.temporality || 'Please select an option.']"
        >
          <v-radio value="permanent" ref="test">
            <template v-slot:label>
              I would prefer to keep it on a permanent basis
            </template>
          </v-radio>
          <v-radio value="temporary">
            <template v-slot:label>
              It is temporary/disposable. I will no longer need it after it served its purpose
            </template>
          </v-radio>

          <v-radio value="other">
            <template v-slot:label>
              Other: <v-text-field
              dense
              counter="200"
              class="pl-1 mt-n1 mb-n2"
              v-model="value.otherTemporality"
              :rules="
              [
                () => value.temporality !== 'other'
                  || !! value.otherTemporality
                  || 'Please provide a response.',

                () => value.temporality !== 'other'
                  || !! (value.otherTemporality && value.otherTemporality.length < 201)
                  || 'Text must be 200 characters or less.'
              ]"
            ></v-text-field>
            </template>
          </v-radio>
          <v-radio value="decide_later">
            <template v-slot:label>
              I will decide later
            </template>
          </v-radio>
        </v-radio-group>
        <div
          v-if="policiesError"
          class="body-2 red--text"
        >
          Failed to load policies. Please
          <a
            class="text-decoration-underline red--text"
            @click.prevent="getCurrentPolicies()"
          >click here</a>
          to retry.
        </div>
        <v-skeleton-loader
          v-else
          type="image"
          :loading="policiesLoading"
          height="50px"
        >
          <div class="body-2">
            Previously accepted
            <PolicyList
              :policies="policies"
              article=""
            />
            still apply.
          </div>
        </v-skeleton-loader>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn
        type="button"
        :disabled="inFlight"
        @click="previousStep"
      >
        &lt; Previous
      </v-btn>

      <v-btn
        type="button"
        color="primary"
        :disabled="inFlight || policiesLoading || policiesError"
        @click="primaryBtnAction"
      >
        {{primaryBtnLabel}}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import PolicyList from '../Components/PolicyList'

export default {
  name: 'TemporalityCreateWikiWizardStep',
  props: {
    title: String,
    inFlight: Boolean,
    value: Object,
    error: Array,
  },
  components: {
    PolicyList,
  },
  data () {
    return {
      policies: [],
      policiesLoading: true,
      policiesError: false,
    }
  },
  created () {
    this.getCurrentPolicies()
  },
  computed: {
    primaryBtnLabel () {
      if (this.value.temporality === 'permanent') {
        return 'Next >'
      } else {
        return 'Create Wiki'
      }
    },
  },
  methods: {
    primaryBtnAction () {
      if (this.value.temporality !== 'other') {
        this.value.otherTemporality = undefined
      }

      if (this.$refs.inputForm.validate() === false) {
        return
      }

      if (this.value.temporality === 'permanent') {
        this.$emit('next-step')
      } else {
        this.$emit('submit')
      }
    },
    previousStep () {
      if (this.value.temporality !== 'other') {
        this.value.otherTemporality = undefined
      }

      this.$emit('previous-step')
    },
    async getCurrentPolicies () {
      this.policiesLoading = true
      this.policiesError = false

      try {
        this.policies = await this.$api.getCurrentPolicies()
      } catch (error) {
        console.error(error)
        this.policiesError = true
      } finally {
        this.policiesLoading = false
      }
    },
  },
}
</script>

<style lang="css" scoped>
.v-card__actions {
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 8px;
}
</style>
