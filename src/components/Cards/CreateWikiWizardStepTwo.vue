<template>
    <v-card class="elevation-12">
      <v-toolbar dark color="primary">
        <v-toolbar-title>{{ title }}</v-toolbar-title>
      </v-toolbar>
  
      <v-card-text>
        <h3>What best describes how you intend to use this Wikibase?</h3>
  
        <v-radio-group
          v-model="value.purpose"
          :error-messages=error
          :rules="[() => !!value.purpose || 'This field is required']"
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
          <v-radio value="decide_later">
            <template v-slot:label>
              I will decide later
            </template>
          </v-radio>
          <v-radio value="other">
            <template v-slot:label>
              Other: <v-text-field v-model="value.otherPurpose"></v-text-field>
            </template>
          </v-radio>
        </v-radio-group>
      </v-card-text>
      <!-- Second Question to go here depending on status of the purpose; fix radio selection first though -->
  
      <v-card-actions>
        <v-btn
          type="button"
          color="secondary"
          :disabled="inFlight"
        >
          Spam
        </v-btn>
        <v-btn
          type="button"
          color="secondary"
          :disabled="inFlight"
          @click="$emit('previous-step')"
        >
          &lt; BACK
        </v-btn>
        <v-spacer></v-spacer>
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
      error: String,
    },
    methods: {
      nextStep() {
        console.log(this.value.purpose)
        if (this.value.purpose === "") {
          this.error = "pick one"
        } else if (this.value.purpose === "other" && this.value.otherPurpose === "") {
          this.error = "other please tpye something"
        } else {
          this.$emit('next-step')
        }
      }
    }
  }
  </script>