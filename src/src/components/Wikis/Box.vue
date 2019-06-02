<template>
  <md-card class="md-with-hover">
    <md-card-header><div class="md-title">{{ wiki.sitename }}</div></md-card-header>
    <md-card-content>
      TODO site description?
    </md-card-content>
    <md-card-actions>
      <!-- TODO the API should probably return the full url? -->
      <md-button :href="wikiHref">Visit site</md-button>
      <md-button :to="{ name: 'Wiki', params: { id: wiki.id } }">More Details</md-button>
    </md-card-actions>
  </md-card>
</template>

<script>
export default {
  name: 'Box',
  props: ['wiki'],
  data () {
    return {
    }
  },
  computed: {
    wikiHref () {
      // TODO this should not be hardcoded!
      return '//' + this.wiki.subdomain + '.mw.ww.10.0.75.2.xip.io:1999'
    }
  }
}
</script>

<style lang="scss" scoped>
  .md-card{
    display: inline-block;
    margin: 5px;
  }
</style>
