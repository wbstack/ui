<template>
  <v-main>
    <v-container class="fill-height" fluid>
      <v-row justify="center">
        <v-col cols="12">
          <h1 class="font-weight-regular">Digital Services Act (DSA) Information Page</h1>
        </v-col>
      </v-row>

      <DsaEnglish id="dsa-en" />

      <v-row justify="center">
        <v-col cols="12">
          <v-divider class="mt-16 mb-8" />
        </v-col>
      </v-row>

      <DsaGerman id="dsa-de" />
    </v-container>
  </v-main>
</template>

<script>
import DsaEnglish from './DsaEnglish.vue'
import DsaGerman from './DsaGerman.vue'

export default {
  name: 'DsaInfo',
  components: {
    DsaEnglish,
    DsaGerman,
  },
  computed: {},
}
</script>

<style scoped>
:deep(.v-list.wrap .v-list-item__title) {
  white-space: wrap;
}
</style>
