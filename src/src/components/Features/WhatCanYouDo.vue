<template>
  <v-container>
    <v-layout column align-center>
      <v-flex>
        <h1>What can you do with Open Cura?</h1>
      </v-flex>
      <v-flex>
        <p>Open Cura allows you to easily curate data in your own Wikibase instance.</p>
      </v-flex>
      <v-flex>
        <!-- START blocks side by side -->
        <v-container grid-list-xl>
          <v-layout align-start justify-space-between>
            <v-flex xs3>
              <v-card>
                <v-card-title><h3>Create a Wikibase</h3></v-card-title>
                <v-card-text>Create a Wikibase with a few simple details.</v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs3>
              <v-card>
                <v-card-title><h3>Build a community</h3></v-card-title>
                <v-card-text>Allow people to find your data and help you curate it.</v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs3>
              <v-card>
                <v-card-title><h3>Link to other data</h3></v-card-title>
                <v-card-text>Link to other open data sets.</v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs3>
              <v-card>
                <v-card-title><h3>Query everything</h3></v-card-title>
                <v-card-text>Meta data backed by SQL. Triples via Blazegraph.</v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
        <!-- END blocks side by side -->
      </v-flex>
      <v-flex>
        <p>Getting started is easy</p>
      </v-flex>
      <v-flex>
        <v-btn color="primary" to="/create-account">Sign up for free</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

export default {
  name: 'WhatCanYouDo',
  components: {}
}
</script>

<style scoped>

h1 {
  margin-bottom: 16px;
}
</style>
