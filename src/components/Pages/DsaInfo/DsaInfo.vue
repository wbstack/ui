<template>
  <v-main>
    <v-container class="fill-height" fluid>
      <v-row justify="center">
          <v-col cols="8">
            <h1>Digital Services Act (DSA) Information Page</h1>
          </v-col>
          <DsaEnglish id="dsa-en" />
          <v-divider class="mt-16 mb-8" />
          <DsaGerman id="dsa-de" />
      </v-row>
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

<style scoped></style>
