<template>
<div>
    <v-card elevation="1" class="padding" outlined>
        <v-card-title>Mapping Properties to Wikidata</v-card-title>
        <v-card-text>
            Some tools assume properties with special meanings under certain identifiers.
            Here, you can map a property on your Wikibase instance to a property on Wikidata.
            E.g. if a tool needs instanceOf (P31 on Wikidata) but the instanceOf property is P4
            on your Wikibase you can create a mapping between them.
        </v-card-text>
        <EntityTable mappingName="properties" :entityValidation="/^P\d+$/" entityName="Property" storeAction="setPropertyMapping" />
    </v-card>

    <v-divider class="space"></v-divider>

    <v-card elevation="1" class="padding" outlined>
        <v-card-title>Mapping Items to Wikidata</v-card-title>
        <v-card-text>
            Some tools assume items with special meanings under certain identifiers.
            Here, you can map a item on your Wikibase instance to an item on Wikidata.
        </v-card-text>
        <EntityTable mappingName="items" :entityValidation="/^Q\d+$/" entityName="Item" storeAction="setItemMapping" />
    </v-card>
</div>
</template>

<script>
import EntityTable from '../Features/EntityTable.vue';

export default {
  name: 'EntityMapping',
  components: { EntityTable },
  props: ['wikiId']
}
</script>

<style lang="css" scoped>
.space {
  margin-top: 20px;
  margin-bottom: 20px;
}
.padding {
  padding: 15px;
}
</style>
