<template>
  <v-card tile>
    <v-card-title>
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
      <v-btn class="button-center" @click="start" color="primary">{{button}}</v-btn>
    </v-card-text>
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
.button-center {
    margin:0 auto;
    display:block;
    margin-top: 10px;
}
</style>
