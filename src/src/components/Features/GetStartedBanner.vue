<template>
  <v-container>
    <v-layout>
      <v-flex xs6>
        <v-container>
          <v-layout column>
            <v-flex>
              <h1>Openly curate knowledge..</h1>
            </v-flex>
            <v-flex>
              <h2>..starting with Wikibase</h2>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
      <v-flex xs6>
        <div class="imgframe">
          <span class="imghelper"></span>
            <!--TODO load this image from somewhere locally hosted...-->
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/MediaWiki_software_screenshot.png/640px-MediaWiki_software_screenshot.png"/>
        </div>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex>
        <v-btn outline raised to="/create-account">Get started</v-btn>
      </v-flex>
    </v-layout>
</v-container>
</template>

<script>

export default {
  name: 'GetStartedBanner',
  components: {}
}
</script>

<style scoped>
  h1{
    font-size: 64px;
    font-weight: 400;
    line-height: 72px;
  }

  h2{
    font-size: 32px;
    font-weight: 200;
    line-height: 72px;
  }

  .imgframe {
    max-width: 400px;
    height: 100%;
    white-space: nowrap; /* This is required unless you put the helper span closely near the img */

    text-align: center;
    margin: 1em 0;
  }

  .imghelper {
      display: inline-block;
      height: 100%;
      vertical-align: middle;
  }

  img {
    vertical-align: middle;
    max-width: 400px;
  }
</style>
