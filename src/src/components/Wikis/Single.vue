<template>
  <md-content>

    <div>
    <template v-if="wiki">
      <h1>{{wiki.sitename}}</h1>

      <md-list>
        <md-list-item>Site Name: {{ wiki.sitename }}</md-list-item>
        <md-list-item>Site Id: {{ wiki.id }}</md-list-item>
        <md-list-item>Subdomain: {{ wiki.subdomain }}</md-list-item>
        <md-list-item>Meta Namespace: {{ wiki.metanamespace }}</md-list-item>
        <md-list-item>Created at: {{ wiki.created_at }}</md-list-item>
      </md-list>

      <md-button :href="wikiHref">Visit site</md-button>

    </template>
    <template v-if="!wiki">
      <h1>No Such Wiki</h1>
    </template>
    </div>
  </md-content>
</template>

<script>
import Box from './Box'
import List from '@/components/Wikis/List'

export default {
  name: 'Single',
  props: [
    'wiki',
    'wikis'
  ],
  data () {
    return {}
  },
  created () {
    // TODO this should just be requesting a single wiki details?
    this.$http.get(`/wiki/list`)
      .then(request => {
        // TODO remove this evil assumption about IDs...
        this.wiki = request.data.data[this.$route.params.id - 1]
      })
      .catch(() => { alert('Something went wrong!') })
  },
  components: {
    Box,
    List
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
  .border-right {
    border-right: 1px #eee solid;
  }
</style>
