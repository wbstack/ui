<template>
  <v-flex>
    <component :is="headerElement">{{headerText}}</component>
    <span v-if="!items.length">{{emptyText}}</span>
    <ul v-if="items.length">
      <li v-for="item in items" :key="item.name">
        <a target="_blank" rel="noopener noreferrer" :href="item.url">{{item.name}}</a>
      </li>
    </ul>
  </v-flex>
</template>

<script>
  export default {
    name: 'HeadedLinkedList',
    props: {
      'headerElement': {
        type: String,
        default: 'h3'
      },
      'headerText': {
        type: String,
        default: 'List header'
      },
      'emptyText': {
        type: String,
        default: 'No items in list'
      },
      'items': {
        type: Array,
        default: []
      }
    }
  }
</script>
