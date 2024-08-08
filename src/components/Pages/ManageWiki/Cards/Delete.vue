<template>
  <v-card class="pa-4" color="#fad1d0">
    <p class="text-h5 ma-0">Delete Wikibase Instance</p>
    <p class="text-sm-body-2">
      Selecting Confirm Deletion will permanently delete the selected Wikibase instance. All data associated <br/>
      with this instance will be purged permanently in 30 days. The domain will <strong>not</strong> be available for reuse.
    </p>
    <v-btn @click="expandDelete = true" color="red" class="text-sm-button white--text">Delete site</v-btn>
    <ConfirmDelete v-if="expandDelete" :wiki-id=this.wikiId @close="expandDelete=false"/>
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
