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
        <!-- TODO unhide this one pages are implemented.. -->
          <!-- <v-flex xs3>
            <h5>Explore</h5>
            <ul>
              <li><router-link to="/not-yet-implemented">News</router-link></li>
              <li><router-link to="/not-yet-implemented">Discover</router-link></li>
            </ul>
          </v-flex> -->
          <v-flex xs3>
            <h5>Community</h5>
            <ul>
              <li><a href="https://www.mediawiki.org">Mediawiki</a></li>
              <li><a href="https://www.wikiba.se">Wikibase</a></li>
              <li><a href="https://www.wikidata.org">Wikidata</a></li>
            </ul>
          </v-flex>
          <v-flex xs3>
            <h5>Company</h5>
            <ul>
              <li><router-link to="/about">About Us</router-link></li>
              <li><router-link to="/privacy-policy">Privacy</router-link></li>
              <li><router-link to="/terms-of-use">Terms of Use</router-link></li>
              <li><router-link to="/contact">Contact us</router-link></li>
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
        &copy;2019 — <strong>WBStack</strong>
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

  a {
    color: white;
  }

</style>
