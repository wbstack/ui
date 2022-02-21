<template>
  <v-form ref="form" v-model="valid">
    <v-card disabled elevation="1" class="padding" outlined>
      <v-card-title>Federated properties</v-card-title>
      <v-card-subtitle><br/>(currently not available)</v-card-subtitle>
      <v-card-text>
      Federated properties allows you to use the properties of Wikidata on your Wikibase instance.<br>
      </v-card-text>
      <v-card-actions>
        <v-btn disabled >Enable Federated Properties</v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
export default {
  name: 'FederatedProperties'
}
</script>

<style lang="css" scoped>
</style>
