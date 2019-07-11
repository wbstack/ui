<template>
  <div class="wrapper">
    <div class="wcyd-center">
      <h1>What can you do with Open Cura?</h1>
    </div>
    <div class="wcyd-center">
      <p>Open Cura allows you to easily curate data in your own Wikibase instance.</p>
    </div>
    <div class="wcyd-center">
      <div class="md-layout wcyd-center" >
        <md-card class="md-layout-item">
          <md-card-header class="md-title">Create a Wikibase</md-card-header>
          <md-card-content>
            Create a Wikibase with a few simple details.
          </md-card-content>
        </md-card>
        <md-card class="md-layout-item">
          <md-card-header class="md-title">Build a community</md-card-header>
          <md-card-content>
            Allow people to find your data and help you curate it.
          </md-card-content>
        </md-card>
      </div>
      <div class="md-layout wcyd-center">
        <md-card class="md-layout-item">
          <md-card-header class="md-title">Link to other data</md-card-header>
          <md-card-content>
            Link to other open data sets.
          </md-card-content>
        </md-card>
        <md-card class="md-layout-item">
          <md-card-header class="md-title">Query everything</md-card-header>
          <md-card-content>
            Meta data backed by SQL.
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
