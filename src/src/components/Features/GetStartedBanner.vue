<template>
  <div class="wrapper">
    <div class="md-layout feature-gsb-wrapper" >
      <div class="md-layout-item">
        <h1>
          <span>Create a wiki,</span>
        </h1>
        <h1>
          <span>curate knowledge.</span>
        </h1>
        <md-button class="md-raised" to="/create-account">Get started</md-button>
      </div>
      <div class="md-layout-item">
        <md-image>
          <!--TODO load this image from somewhere locally hosted...-->
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/MediaWiki_software_screenshot.png/640px-MediaWiki_software_screenshot.png"/>
        </md-image>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'GetStartedBanner',
  components: {}
}
</script>

<style scoped>

  img{
    max-width: 400px;
  }

  span{
    font-size: 64px;
    font-weight: 400;
    line-height: 72px;
  }

  .md-layout {
    display: flex;
    max-width:1152px;
    align-items: center;
    margin: 0 auto;
    text-align: left;
  }
</style>
