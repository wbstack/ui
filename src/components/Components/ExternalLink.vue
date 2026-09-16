<template>
    <a :href="url" rel="external" target="_blank">
          <slot></slot>
          <v-icon small color="primary" class="pl-1 pb-2"> mdi-open-in-new</v-icon>
          </a>
</template>

<script>
export default {
    props: [
        'url'
    ]
}

</script>