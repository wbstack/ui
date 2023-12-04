<template>
  <v-card @click="goToWiki" @keyup.enter="goToWiki">
    <v-container class="content">
      <v-row no-gutters>
        <v-col class="flex-grow-0">
          <v-avatar rounded>
            <img :src="logo">
          </v-avatar>
        </v-col>
        <v-col class="details">
          <div class="text-h5 font-weight-regular">{{name}}</div>
          <slot/>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: 'DiscoveryCard',
  props: {
    name: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    logo: {
      type: String,
      required: false
    }
  },
  methods: {
    goToWiki (event) {
      if (event.target.tagName !== 'A') {
        window.open(this.url, '_blank')
      }
    }
  }
}
</script>

<style scoped>
.content {
  padding: 16px 16px;
}
.details.col {
  padding-left: 16px !important;
  word-wrap: anywhere;
}
</style>
