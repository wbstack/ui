<template>
  <footer data-test-id="footer" class="footer">
  <v-footer color="primary lighten-1">
    <v-container>
      <ul class="footer-list">
          <li><a target="_blank" rel="noopener noreferrer" href="https://wikiba.se/about-us/">About</a></li>
          <li><router-link to="/discovery">Discovery</router-link></li>
          <li><a target="_blank" rel="noopener noreferrer" href="https://www.mediawiki.org/wiki/Wikibase/Wikibase.cloud">Documentation</a></li>
          <li><a target="_blank" rel="noopener noreferrer" href="https://github.com/wbstack">Github</a></li>
          <li><router-link to="/privacy-policy">Privacy Policy</router-link></li>
          <li><router-link to="/terms-of-use">Terms of Use</router-link></li>
          <li><a target="_blank" rel="noopener noreferrer" href="https://www.wikimedia.de/impressum/">Imprint</a></li>
          <li><router-link to="/contact">Contact</router-link></li>
      </ul>
    </v-container>
  </v-footer>

  </footer>
</template>

<script>
export default {
  name: 'Foot'
}
</script>

<style scoped>
  ul.footer-list {
    list-style: none;
    padding-left: 0 !important;
  }

  ul.footer-list a,
  .white-footer-links a{
    color: white !important;
  }
  .footer {
    height: auto;
  }
  .v-footer, .container {
    height: 100%;
  }
</style>
