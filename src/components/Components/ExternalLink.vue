<template>
  <a :href="url" rel="external" target="_blank" @click.stop>
    <slot></slot>
    <v-icon size="inherit" color="primary" class="mb-1">mdi-open-in-new</v-icon>
  </a>
</template>

<script>
export default {
  props: [
    'url',
  ],
}
</script>
