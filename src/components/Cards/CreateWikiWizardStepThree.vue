<template>
    <v-card class="elevation-12">
      <v-toolbar dark color="primary">
        <v-toolbar-title>{{ title }}</v-toolbar-title>
      </v-toolbar>
  
      <v-card-text>
        <h3>What best describes how you intend to use this Wikibase?</h3>

        <h3>Terms of use</h3>
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
      value: Object,
      error: Array,
    }

  }
  </script>