<template>
  <v-main>
    <DsaEnglish id="dsa-en" />
    <DsaGerman id="dsa-de" />
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
h5 {
  margin-bottom: 16px;
}
.italic {
  font-style: italic;
}
.first-column {
  text-align: center;
  min-width: 60px;
}
.processing {
  padding: 20px;
}
</style>
