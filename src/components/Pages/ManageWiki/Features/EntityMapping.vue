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
        <EntityTable
            mappingName="Properties"
            entityName="Property"
            :entityValidation="/^P\d+$/"
            :entitiesList="propertiesList"
            @setEntityMapping="setPropertiesMapping( $event )"
        />
    </v-card>

    <div class="space"></div>

    <v-card elevation="1" class="padding" outlined>
        <v-card-title>Mapping Items to Wikidata</v-card-title>
        <v-card-text>
            Some tools assume items with special meanings under certain identifiers.
            Here, you can map a item on your Wikibase instance to an item on Wikidata.
        </v-card-text>
        <EntityTable
            mappingName="Items"
            entityName="Item"
            :entityValidation="/^Q\d+$/"
            :entitiesList="itemsList"
            @setEntityMapping="setItemsMapping( $event )"
        />
    </v-card>
</div>
</template>

<script>
import EntityTable from '../Features/EntityTable.vue'

export default {
  name: 'EntityMapping',
  components: { EntityTable },
  props: ['wikiId'],
  computed: {
    propertiesList: {
      get () {
        return this.$store.state.wikis.currentWikiSettings.wikibaseManifestEquivEntities.properties
      }
    },
    itemsList: {
      get () {
        return this.$store.state.wikis.currentWikiSettings.wikibaseManifestEquivEntities.items
      }
    }
  },
  methods: {
    setPropertiesMapping (mapping) {
      this.$store.dispatch('setPropertyMapping', mapping)
      this.$store.dispatch('saveEntityMapping', this.$route.params.id)
    },
    setItemsMapping (mapping) {
      this.$store.dispatch('setItemMapping', mapping)
      this.$store.dispatch('saveEntityMapping', this.$route.params.id)
    }
  }
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
