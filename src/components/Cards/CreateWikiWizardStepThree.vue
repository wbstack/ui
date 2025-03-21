<template>
    <v-card class="elevation-12">
      <v-toolbar dark color="primary">
        <v-toolbar-title>{{ title }}</v-toolbar-title>
      </v-toolbar>
  
      <v-card-text>
        <h3>333333333What best describes how you intend to use this Wikibase?</h3>
        </v-card-text>
      <v-card-actions>
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
      value: Object
    }
  }
  </script>