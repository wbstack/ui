<template>
    <div>
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
  }
}
</script>

<style scoped>

</style>
