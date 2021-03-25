<template>
  <div>
    <EntityTable mappingName="properties" :entityValidation="/^P\d+$/" entityName="Property" storeAction="setPropertyMapping" />
  </div>
</template>

<script>
import EntityTable from './EntityTable.vue'

export default {
  name: 'PropertiesTable',
  components: { EntityTable }

}
</script>
