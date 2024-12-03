<template>
  <v-container class="container">
    <div class="content">
      <div class="tab-container">
        <div v-if="isReady">
          <v-tabs v-model="tab">
              <v-tab>Wiki Settings</v-tab>
              <v-tab>Features</v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab">
              <v-tab-item>
                  <ManageWiki />
              </v-tab-item>
              <v-tab-item>
                  <ManageFeatures />
              </v-tab-item>
          </v-tabs-items>
        </div>
        <div class="text-center" v-if="!isReady">
          <br/>
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
import ManageWiki from './Tabs/ManageWiki.vue'
import ManageFeatures from './Tabs/ManageFeatures.vue'

export default {
  name: 'TabSettings',
  components: {

    ManageWiki,
    ManageFeatures
  },
  data () {
    return {
      tab: null
    }
  },
  computed: {
    isReady () {
      return this.$store.state.wikis.currentWikiSettings !== null
    }
  },
  created () {
    this.$store.dispatch('initializeSettings', this.$route.params.id)
  }
}
</script>

<style scoped>
.container {
  padding: 0;
  max-width: fit-content;
}
.content {
  padding: 8px;
}
.tab-container >>> .card-column {
  padding: 8px;
}
.tab-container >>> .v-card {
  min-width: 288px;
}
.tab-container >>> .v-card__actions {
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 16px;
}
</style>
