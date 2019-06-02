<template>
  <div class="wrapper">
    <div class="wcyd-center">
      <h1>What can you do with WW?</h1>
    </div>
    <div class="wcyd-center">
      <p>WW allows you to create knowledge using proven and linkable solutions.</p>
    </div>
    <div class="wcyd-center">
      <div class="md-layout wcyd-center" >
        <md-card class="md-layout-item">
          <md-card-header class="md-title">Start a wiki</md-card-header>
          <md-card-content>
            Create a wiki with a few simple details.
          </md-card-content>
        </md-card>
        <md-card class="md-layout-item">
          <md-card-header class="md-title">Build a community</md-card-header>
          <md-card-content>
            Allow people to find your knowledge and help you curate it.
          </md-card-content>
        </md-card>
      </div>
      <div class="md-layout wcyd-center">
        <md-card class="md-layout-item">
          <md-card-header class="md-title">Store structured information</md-card-header>
          <md-card-content>
            Using Wikibase.
          </md-card-content>
        </md-card>
        <md-card class="md-layout-item">
          <md-card-header class="md-title">Query everything</md-card-header>
          <md-card-content>
            Meta data backed by SQl.
            Triples via Blazegraph.
          </md-card-content>
        </md-card>
      </div>
    </div>
    <div class="wcyd-center">
      <p>Getting started is easy</p>
    </div>
    <div class="wcyd-center">
      <md-button class="md-raised md-primary" to="/create-account">Sign up for free</md-button>    </div>
  </div>
</template>

<script>

export default {
  name: 'WhatCanYouDo',
  components: {}
}
</script>

<style scoped>

  h1{
    margin: 0 auto;
    line-height: 50px;
  }

  p{
    margin: 0 auto;
    line-height: 50px;
  }

  .md-button{
    margin: 0 auto;
  }

  .md-card{
    margin-left: 20px;
    margin-right: 20px;
  }

  .wcyd-center {
    display: flex;
    max-width:1152px;
    align-items: center;
    margin: 0 auto;
    text-align: center;
  }
</style>
