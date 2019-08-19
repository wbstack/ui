<template>
  <v-card tile class="card-spacing">
    <v-card-title primary-title>
      <div>
        <div class="headline">{{title}}</div>
        <span>{{snippet}}</span>
      </div>
    </v-card-title>
    <v-card-text>
      <!-- TODO use v-list-item for card when vuetify 2.0.0 is used -->
      <p><strong>{{price}}</strong> per month</p>

      Includes:
      <ul>
        <li>Disk: <strong>{{disk}}</strong></li>
        <li>Traffic: <strong>{{traffic}}</strong></li>
      </ul>
    </v-card-text>
    <v-card-actions>
        <v-btn @click="start" color="primary">{{button}}</v-btn>
    </v-card-actions>
    <!--
    <v-card-text>
      Extra text
    </v-card-text>
  -->
  </v-card>
</template>

<script>
export default {
  name: 'Pricing',
  props: [
    'title',
    'price',
    'snippet',
    'disk',
    'traffic',
    'button'
  ],
  data () {
    return {}
  }
}
</script>

<style scoped>
.headline{
  font-size: 26px !important;
}
.card-spacing{
  margin: 5px;
  padding: 5px;
}
</style>
