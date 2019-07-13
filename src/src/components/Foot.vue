<template>
  <footer>
    <v-container grid-list-xl>
      <v-layout align-start justify-space-between>
        <v-flex xs3>
          <h5>Explore</h5>
          <ul>
            <li>News</li>
            <li>Discover</li>
          </ul>
        </v-flex>
        <v-flex xs3>
          <h5>Community</h5>
          <ul>
            <li>Mediawiki</li>
            <li>Wikibase</li>
            <li>Wikimedia</li>
          </ul>
        </v-flex>
        <v-flex xs3>
          <h5>Company</h5>
          <ul>
            <li>About Us</li>
            <li>Privacy</li>
            <li>Terms of Service</li>
          </ul>
        </v-flex>
      </v-layout>
    </v-container>
  </footer>
</template>

<script>
export default {
  name: 'Foot'
}
</script>

<style scoped>

  ul {
    list-style: none;
    padding:0;
  }

</style>
