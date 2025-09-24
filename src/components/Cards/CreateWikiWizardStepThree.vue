<template>
    <v-card class="elevation-12">
      <v-toolbar dark color="primary">
        <v-toolbar-title>{{ title }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn v-if="dismissable" icon @click="$emit('close-dialog')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
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
        <div>
          Previously accepted
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <a
                target="_blank"
                href="/terms-of-use"
                @click.stop
                v-on="on"
              >
                Terms of Use</a>
            </template>
            Opens in new window
          </v-tooltip> still apply.
        </div>
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
          :disabled="inFlight"
          @click="submitWholeForm"
        >
          {{ submitButtonText }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </template>

<script>
export default {
  name: 'StepThreeCard',
  props: {
    title: String,
    inFlight: Boolean,
    value: Object,
    error: Array,
    dismissable: Boolean,
    submitButtonText: String
  },
  methods: {
    previousStep () {
      if (this.value.temporality !== 'other') {
        this.value.otherTemporality = undefined
      }

      this.$emit('previous-step')
    },
    submitWholeForm () {
      if (this.value.temporality !== 'other') {
        this.value.otherTemporality = undefined
      }

      this.$refs.inputForm.validate()
      if (this.$refs.inputForm.validate() === true) {
        this.$emit('submit')
      }
    }
  }

}
</script>

<style lang="css" scoped>
.v-card__actions {
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 8px;
}
</style>
