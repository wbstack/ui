<template>
  <v-card color="#fad1d0">
    <v-card-title>Delete Site</v-card-title>
    <v-card-text>
      Selecting Confirm Deletion will permanently delete the selected Wikibase instance. All data associated <br/>
      with this instance will be purged permanently in 30 days. The domain will <strong>not</strong> be available for reuse.
    </v-card-text>
    <v-card-actions>
      <v-btn @click="expandDelete = true" color="red">Delete site</v-btn>
      <ConfirmDelete v-if="expandDelete" :wiki-id=this.wikiId @close="expandDelete=false"/>
    </v-card-actions>
  </v-card>
</template>

<script>
import ConfirmDelete from '@/components/Pages/ManageWiki/Cards/ConfirmDelete.vue'

export default {
  name: 'Delete',
  components: { ConfirmDelete },
  props: [
    'wikiId'
  ],
  data () {
    return {
      expandDelete: false
    }
  }
}
</script>

<style lang="css" scoped>
</style>
