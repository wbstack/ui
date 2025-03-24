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
              <div>To <b>publish potentially useful data</b></div>
            </template>
          </v-radio>
          <v-radio value="data_lab">
            <template v-slot:label>
              <div>To refine, back up, or <b>experiment with data in an isolated environment</b></div>
            </template>
          </v-radio>
          <v-radio value="tool_lab">
            <template v-slot:label>
              <div>To build tools, write documentation, or <b>contribute</b> to the Wikidata & Wikibase ecosystem <b>in ways other than data</b></div>
            </template>
          </v-radio>
          <v-radio value="test_drive">
            <template v-slot:label>
              <div>To <b>learn about the tool</b>, or <b>evaluate</b> whether it works for my use case</div>
            </template>
          </v-radio>
          <v-radio value="other">
            <template v-slot:label>
              Other: <v-text-field class="pl-1 mt-n5 mb-n2" v-model="value.otherPurpose" :error-messages="purposeOtherError"></v-text-field>
            </template>
          </v-radio>
          <v-radio value="decide_later">
            <template v-slot:label>
              I will decide later
            </template>
          </v-radio>
        </v-radio-group>

        <div v-if="value.purpose==='data_hub'" class="pt-3">
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
          <v-radio value="other" class="mt-n3">
            <template v-slot:label>
              Other: <v-text-field dense class="pl-1" v-model="value.otherAudience" :error-messages="audienceOtherError"></v-text-field>
            </template>
          </v-radio>
        </v-radio-group>
        </div>
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
    data () {
    return {
      purposeError: '',
      audienceError: '',
      purposeOtherError: '',
      audienceOtherError: '',
    }
  },
    methods: {
      nextStep() {
        this.purposeError=''
        this.audienceError=''
        this.purposeOtherError=''
        this.audienceOtherError=''

        if (!this.value.purpose) {
          this.purposeError = "Please select an option."
        } else if (this.value.purpose === "other" && !this.value.otherPurpose) {
          this.purposeOtherError = "Add a purpose"
        } else if (this.value.purpose ==='data_hub' && !this.value.audience) {
          this.audienceError = "Please select an option."
        } else if (this.value.purpose ==='data_hub' && this.value.audience === "other" && !this.value.otherAudience) {
          this.audienceOtherError = "Add an audience"
        }
        else {
          if (this.value.purpose !== 'other') {
            this.value.otherPurpose = undefined
          }

          this.$emit('next-step')
        }
      }
    }
  }
  </script>