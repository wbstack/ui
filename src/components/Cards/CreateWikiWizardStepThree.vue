<template>
    <v-card class="elevation-12">
      <v-toolbar dark color="primary">
        <v-toolbar-title>{{ title }}</v-toolbar-title>
      </v-toolbar>
  
      <v-card-text>
      <v-form ref="inputForm">
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
              class="mt-n5 mb-n2 pl-1"
              v-model="value.otherTemporality"
              :rules="[() => !!
              (
                  (value.temporality === 'other' && !!value.otherTemporality)
                  || value.temporality !== 'other'
              ) || 'This field is required']"
              ></v-text-field>
            </template>
          </v-radio>
          <v-radio value="decide_later">
            <template v-slot:label>
              I will decide later
            </template>
          </v-radio>
        </v-radio-group>

        <h3 class="mt-6">Terms of uses</h3>
        <v-checkbox
          v-model="value.terms"
          :disabled="inFlight"
          :rules="[() => !!value.terms || 'You must accept the Terms of Service.']"
        >
          <template v-slot:label>
            <div>
              I agree to the
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
              </v-tooltip>.
            </div>
          </template>
        </v-checkbox>
      </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>

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
          Create Wiki
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
          this.$emit('submit');
        } 
      }
    }

  }
  </script>