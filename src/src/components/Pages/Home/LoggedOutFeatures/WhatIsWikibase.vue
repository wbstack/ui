<template>
  <div>
  <v-container fluid grid-list-md>
    <v-layout column>
      <v-flex class="text-center">
        <h1>What is Wikibase?</h1>
      </v-flex>
      <v-flex class="text-center">
        <h2><a href="https://www.wikiba.se/">Wikibase</a> is an open source software suite for running a collaborative</h2>
        <h2>knowledge base. One installation of it is <a href="https://www.wikidata.org/">Wikidata</a>. Learn how to</h2>
        <h2>launch a Wikibase instance and work with it.</h2>
        <small>-- <a href="https://learningwikibase.com/">learningwikibase.com</a> <a href="https://creativecommons.org/licenses/by/4.0/">CC-BY 4.0</a></small>
      </v-flex>
    </v-layout>
  </v-container>
</div>
</template>

<script>

export default {
  name: 'WhatIsWikibase',
  components: {}
}
</script>

<style scoped>
h2{
  font-size: 20px;
  font-weight: 370;
  line-height: 35px;
}
.text-center{ text-align: center; }
</style>
