<template>
  <div class="wrapper md-layout">
    <md-drawer class="md-permanent md-layout-item" md-permanent="full">
      <h4>{{ currentUser.email }}</h4>
      <h4>Wikis<md-button class="md-raised md-primary" to="/wikis/create">New</md-button></h4>
      <md-list>
        <md-list-item v-for="wiki in wikis" :key="wiki.id" :wiki="wiki">
          <a :href="wiki.homesrc">{{wiki.sitename}}</a>
        </md-list-item>
      </md-list>
      <h4>Teams</h4>
      <md-list>
        <md-list-item>Teams are not yet implemented.</md-list-item>
      </md-list>
    </md-drawer>
    <div class="md-layout-item">
      <h3>Recent activity</h3>
      <p>Not yet implemented</p>
    </div>
    <div class="md-layout-item right-bar">
      <h4>Notices</h4>
      <p>Not yet implemented</p>
      <h4>Discover</h4>
      <p>Not yet implemented</p>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'LoggedIn',
  data () {
    return {
      wikis: []
    }
  },
  computed: {
    ...mapGetters({currentUser: 'currentUser'})
  },
  created () {
    this.$http.get('/wiki/list')
      .then(request => this.buildWikiList(request.data.data))
      .catch(() => { alert('Something went wrong!') })
  },
  methods: {
    buildWikiList (data) {
      this.wikis = data
    }
  },
  components: {}
}
</script>

<style scoped>
  .md-drawer{
    max-width: 400px;
  }
  .right-bar{
    max-width: 400px;
  }
  .md-layout-item{
    padding-left: 5px;
    padding-right: 5px;
  }
  .md-button{
    float: right;
  }
</style>
