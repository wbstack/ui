<template>
    <v-card class="elevation-12">
      <v-toolbar dark color="primary">
        <v-toolbar-title>{{ title }}</v-toolbar-title>
      </v-toolbar>
  
      <v-card-text>
        <h3>How long do you plan to use this Wikibase?</h3>

        <v-radio-group
          v-model="value.purpose"
          :error-messages=error
          :rules="[() => !!value.purpose || 'This field is required']"
        >
          <v-radio value="data_hub" ref="test">
            <template v-slot:label>
              Anyone interested
            </template>
          </v-radio>
          <v-radio value="data_lab">
            <template v-slot:label>
              Myself or my organization
            </template>
          </v-radio>
          <v-radio value="other">
            <template v-slot:label>
              Other: <v-text-field v-model="value.otherPurpose"></v-text-field>
            </template>
          </v-radio>
          <v-radio value="decide_later">
            <template v-slot:label>
              I will decide later
            </template>
          </v-radio>
        </v-radio-group>

        <h3>Terms of uses</h3>
        <v-checkbox
          v-model="value.terms"
          :disabled="inFlight"
          :error-messages="error['termssas']"
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
      </v-card-text>
      <v-card-actions>
        <v-btn
          type="button"
          :disabled="inFlight"
          @click="$emit('previous-step')"
        >
          &lt; Previous
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          type="submit"
          color="primary"
          :disabled="inFlight"
          @click="$emit('submit')"
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
    }

  }
  </script>