<template>
  <v-container class="container">
    <div class="content">
      <div class="tab-container">
        <div v-if="isReady">
          <v-tabs>
              <v-tab :to="this.getTabPath('TabSettingsProfileInner')">Profile</v-tab>
              <v-tab :to="this.getTabPath('TabSettingsSettingsInner')">Settings</v-tab>
              <v-tab :to="this.getTabPath('TabSettingsFeaturesInner')">Features</v-tab>
          </v-tabs>
          <router-view/>
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

export default {
  name: 'TabSettings',
  computed: {
    isReady () {
      return this.$store.state.wikis.currentWikiSettings !== null
    },
  },
  methods: {
    getTabPath (name) {
      return this.$router.resolve({ name, params: this.$route.params }).href
    },
  },
  created () {
    this.$store.dispatch('initializeSettings', this.$route.params.id)
  },
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
