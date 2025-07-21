<template>
  <v-footer data-test-id="footer" class="footer">
    <v-row
      :class="isNarrow ? 'small-row-margin stack-vertical' : 'row-margin'"
      no-gutters
    >
      <v-col
        :class="isNarrow ? 'small-col-margin' : 'col-margin'"
        ref="col1"
        cols="auto"
      >
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
  name: 'Footer',
  data () {
    return {
      isNarrow: false,
      initialThreshold: 0
    }
  },
  mounted () {
    this.$nextTick(() => {
      const col1 = this.$refs.col1?.$el || this.$refs.col1
      const col2 = this.$refs.col2?.$el || this.$refs.col2
      const col1Width = col1 ? col1.offsetWidth : 0
      const col2Width = col2 ? col2.offsetWidth : 0
      const threshold = col1Width + col2Width + 176
      this.initialThreshold = threshold
      this.updateIsNarrow()
      window.addEventListener('resize', this.updateIsNarrow)
    })
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.updateIsNarrow)
  },
  methods: {
    updateIsNarrow () {
      this.isNarrow = window.innerWidth <= this.initialThreshold
    }
  }
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
}
.small-row-margin {
  margin: 24px !important;
}

.col-margin {
  margin-right: 80px !important;
}
.small-col-margin {
  margin-bottom: 40px !important;
  margin-right: 0 !important;
}

.stack-vertical {
  flex-direction: column !important;
}
</style>
