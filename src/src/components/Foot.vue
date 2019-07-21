<template>
  <footer>
  <v-footer
    height="auto"
    color="primary lighten-1"
  >
    <v-layout
      justify-center
      row
      wrap
    >

    <v-flex>

      <v-container grid-list-xl>
        <v-layout
        justify-center
        row
        wrap>
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

    </v-flex>

      <v-flex
        primary
        lighten-2
        py-3
        text-xs-center
        xs12
      >
        &copy;2019 — <strong>Open Cura</strong>
      </v-flex>
    </v-layout>
  </v-footer>

  </footer>
</template>

<script>
export default {
  name: 'Foot'
}
</script>

<style scoped>

  h5, li {
    text-align: center;
  }

  ul {
    list-style: none;
    padding:0;
  }

</style>
