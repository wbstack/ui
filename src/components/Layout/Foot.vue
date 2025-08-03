<template>
  <v-footer data-test-id="footer" class="footer">
    <v-row class="row-margin" no-gutters>
      <v-col class="col-margin" ref="col1" cols="auto">
        <nav aria-label="Wikibase Cloud links">
          <h3 class="footer-list-title">Wikibase Cloud</h3>
          <ul class="footer-list">
            <li><a target="_blank" rel="noopener noreferrer" href="https://wikiba.se/about-us/">About</a></li>
            <li><router-link to="/discovery">Discovery</router-link></li>
            <li><a target="_blank" rel="noopener noreferrer" href="https://www.mediawiki.org/wiki/Wikibase/Wikibase.cloud">Documentation</a></li>
            <li><a target="_blank" rel="noopener noreferrer" href="https://status.wikibase.cloud">Platform Status</a></li>
            <li><a target="_blank" rel="noopener noreferrer" href="https://github.com/wbstack">GitHub</a></li>
            <li><router-link to="/contact">Contact us</router-link></li>
          </ul>
        </nav>
      </v-col>
      <v-col ref="col2" cols="auto">
        <nav aria-label="Legal links">
          <h3 class="footer-list-title">Legal</h3>
          <ul class="footer-list">
            <li><router-link to="/privacy-policy">Privacy Policy</router-link></li>
            <li><router-link to="/terms-of-use">Terms of Use</router-link></li>
            <li><a target="_blank" rel="noopener noreferrer" href="https://www.wikimedia.de/impressum/">Imprint</a></li>
            <li><router-link to="/complaint">Report illegal content</router-link></li>
          </ul>
        </nav>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>
.footer-list {
  list-style: none;
  padding-left: 0;
}

.footer-list-title {
  font-weight: bold;
  color: white;
  margin-bottom: 8px;
}

.footer-list li {
  margin-bottom: 5px;
}

.footer-list a, .footer-list :deep(a) {
  color: white !important;
  text-decoration: none;
  transition: text-decoration 0.2s, color 0.2s;
}

.footer-list a:hover, .footer-list :deep(a:hover) {
  text-decoration: underline;
  color: white !important;
}

.v-footer {
  background-color: #0063BF !important;
  height: 100%;
  padding: 0;
}

.row-margin {
  margin: 48px !important;
  display: flex;
}

.col-margin {
  margin-right: 80px !important;
}

@media (max-width: 480px) {
  .row-margin {
    margin: 24px !important;
    flex-direction: column !important;
  }
  .col-margin {
    margin-right: 0 !important;
    margin-bottom: 40px !important;
  }
}
</style>
