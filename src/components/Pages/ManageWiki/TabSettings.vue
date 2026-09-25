<template>
  <v-container>
    <v-row>
      <v-spacer></v-spacer>
      <v-col cols="12" lg="8">
        <div class="content">
          <div class="tab-container">
            <div v-if="isReady">
              <v-tabs>
                <v-tab :to="this.getTabPath('TabSettingsProfileInner')">Profile</v-tab>
                <v-tab :to="this.getTabPath('TabSettingsSettingsInner')">Settings</v-tab>
                <v-tab :to="this.getTabPath('TabSettingsFeaturesInner')">Features</v-tab>
                <v-tab :to="this.getTabPath('TabSettingsReviewInner')">Review</v-tab>
              </v-tabs>
              <router-view />
            </div>
            <div class="text-center" v-if="!isReady">
              <br />
              <v-progress-circular indeterminate color="primary"></v-progress-circular>
            </div>
          </div>
        </div>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
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
</style>
