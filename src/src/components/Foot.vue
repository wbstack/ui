<template>
  <footer>
    <div class="wrapper">
      <div class="md-layout">
        <div class="md-layout-item">
          <h5>Explore</h5>
          <ul>
            <li>News</li>
            <li>Discover</li>
          </ul>
        </div>
        <div class="md-layout-item">
          <h5>Community</h5>
          <ul>
            <li>Mediawiki</li>
            <li>Wikibase</li>
            <li>Wikimedia</li>
          </ul>
        </div>
        <div class="md-layout-item">
          <h5>Company</h5>
          <ul>
            <li>About Us</li>
            <li>Privacy</li>
            <li>Terms of Service</li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Foot'
}
</script>

<style lang="css" scoped>

  .md-layout{
    display: flex;
    max-width:1152px;
    align-items: center;
    text-align: left;
    margin: 0 auto;
  }

  .wrapper{
    padding-left: 10px;
    padding-right: 10px;
    margin: 0 auto;
  }

  ul {
    list-style: none;
    padding:0;
  }

</style>
