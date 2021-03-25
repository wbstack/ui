<template>
  <div>
    <EntityTable mappingName="items" :entityValidation="/^Q\d+$/" entityName="Item" storeAction="setItemMapping" />
  </div>
</template>

<script>
import EntityTable from './EntityTable.vue'

export default {
  name: 'ItemsTable',
  components: { EntityTable }

}
</script>
