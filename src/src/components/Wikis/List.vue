<template>
  <div>
    <h2>Wikis</h2>
    <p>All wikis are listed below</p>
    <md-field>
      <label>Search</label>
      <md-input v-model="search" name="Search Wikis" type="text"></md-input>
    </md-field>
    <div class="row">
      <Box v-for="wiki in wikis" :key="wiki.id" :wiki="wiki" v-show="searchMatch(wiki.sitename)"></Box>
    </div>
    <span v-if="!wikis[0]">No wikis currently found</span>
  </div>
</template>

<script>
import Box from './Box'

export default {
  name: 'List',
  data () {
    return {
      search: '',
      wikis: []
    }
  },
  created () {
    this.$http.get('/wiki/list')
      .then(request => this.buildWikiList(request.data.data))
      .catch(() => { alert('Something went wrong!') })
  },
  methods: {
    buildWikiList (data) {
      this.wikis = data
    },
    searchMatch (wikiSiteName) {
      return wikiSiteName.toLowerCase().match(this.searchRegExp)
    }
  },
  computed: {
    searchRegExp () {
      return new RegExp(`(.*)${this.search.toLowerCase()}(.*)`)
    }
  },
  components: {
    Box
  }
}
</script>

<style scoped>
  .inputs-search{
    max-width: 250px;
  }
</style>
