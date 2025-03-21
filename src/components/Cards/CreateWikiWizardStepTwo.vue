<template>
    <v-card class="elevation-12">
      <v-toolbar dark color="primary">
        <v-toolbar-title>{{ title }}</v-toolbar-title>
      </v-toolbar>
  
      <v-card-text>
        <h3>What best describes how you intend to use this Wikibase?</h3>
  
        <v-radio-group
          v-model="value.purpose"
          :error-messages=purposeError
        >
          <v-radio value="data_hub" ref="test">
            <template v-slot:label>
              To publish potentially useful data
            </template>
          </v-radio>
          <v-radio value="data_lab">
            <template v-slot:label>
              To refine, back up, or experiment with data in an isolated environment
            </template>
          </v-radio>
          <v-radio value="tool_lab">
            <template v-slot:label>
              To build tools, write documentation, or contribute to the Wikidata & Wikibase ecosystem in ways other than data
            </template>
          </v-radio>
          <v-radio value="test_drive">
            <template v-slot:label>
              To learn about the tool, or evaluate whether it works for my use case
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
        </v-card-text>
        <v-card-text v-if="value.purpose==='data_hub'">
        <h3>Who is the intended audience for this data?</h3>
  
        <v-radio-group
          v-model="value.audience"
          :error-messages=audienceError
        >
          <v-radio value="wide" ref="test">
            <template v-slot:label>
              Anyone interested
            </template>
          </v-radio>
          <v-radio value="narrow">
            <template v-slot:label>
              Myself or my organization
            </template>
          </v-radio>
          <v-radio value="other">
            <template v-slot:label>
              Other: <v-text-field v-model="value.otherAudience"></v-text-field>
            </template>
          </v-radio>
        </v-radio-group>
      </v-card-text>
  
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          type="button"
          :disabled="inFlight"
          @click="$emit('previous-step')"
        >
          &lt; PREVIOUS
        </v-btn>
        <v-btn
          type="button"
          color="primary"
          :disabled="inFlight" 
          @click="nextStep"
        >
          Next &gt;
        </v-btn>
      </v-card-actions>
    </v-card>
  </template>
  
  <script>
  export default {
    name: 'StepTwoCard',
    props: {
      title: String,
      inFlight: Boolean,
      value: Object,
    },
    data: {
      purposeError: ''
    },
    methods: {
      nextStep() {
        console.log(this.value.purpose)
        if (this.value.purpose === "") {
          this.purposeError = "pick one"
        } else if (this.value.purpose === "other" && this.value.otherPurpose === "") {
          this.purposeOthererror = "other please tpye something"
        } else if (this.value.audience === "") {
          this.audienceError = "pick one"
        }
        else {
          this.$emit('next-step')
        }
      }
    }
  }
  </script>