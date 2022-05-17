<template>
  <footer>
  <v-footer color="primary lighten-1">
    <v-container>
    <v-row dense>
    <v-col cols="1"></v-col>
    <v-col cols="10">
      <ul class="footer-list">
          <li><a target="_blank" rel="noopener noreferrer" href="https://wikiba.se/about-us/">About</a></li>
          <li><a target="_blank" rel="noopener noreferrer" href="https://www.wikibase.cloud/privacy-policy">Privacy Policy</a></li>
          <li><a target="_blank" rel="noopener noreferrer" href="https://www.wikibase.cloud/terms-of-use">Term of Use</a></li>
          <li><a target="_blank" rel="noopener noreferrer" href="https://wikiba.se/contact/">Contact</a></li>
          <li><a target="_blank" rel="noopener noreferrer" href="https://github.com/wbstack">Github</a></li>
          <li><a target="_blank" rel="noopener noreferrer" href="https://www.wikimedia.de/impressum/">Imprint</a></li>
        </ul>
      </v-col>
    <v-col cols="1"></v-col>
    </v-row>
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

</style>
