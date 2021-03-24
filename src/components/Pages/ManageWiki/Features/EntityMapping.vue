<template>
<div>
	<v-card
		elevation="1"
		outlined
	>
	<v-card-title>Mapping Properties to Wikidata</v-card-title>
	<v-card-text>
        Some tools assume properties with special meanings under certain identifiers.
		Here, you can map a property on your Wikibase instance to a property on Wikidata.
		E.g. if a tool needs instanceOf (P31 on Wikidata) but the instanceOf property is P4 
		on your Wikibase you can create a mapping between them.
      </v-card-text>
	  <PropertiesTable/>
	  
	</v-card>
	<v-divider class="space"></v-divider>
	<v-card
		elevation="1"
		outlined
	>
	<v-card-title>Mapping Items to Wikidata</v-card-title>
	<v-card-text>
        Some tools assume items with special meanings under certain identifiers. 
		Here, you can map a item on your Wikibase instance to an item on Wikidata.
      </v-card-text>
	  <ItemsTable/>
	</v-card>
</div>
</template>

<script>
import PropertiesTable from './PropertiesTable.vue';
import ItemsTable from './ItemsTable.vue';

export default {
  name: 'EntityMapping',
  components: { PropertiesTable, ItemsTable },
  props: [],
  methods: {
  }
}
</script>

<style lang="css" scoped>
.space {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
