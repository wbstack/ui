<template>
  <v-card tile>
    <v-card-text>
      <div class="headline">{{title}}</div>
      <span>{{snippet}}</span>
      <p><strong>{{price}}</strong> per month</p>
      <v-divider class="divider-topbottom-spacing"/>
      Includes:
      <!-- TODO use v-list-item for card when vuetify 2.0.0 is used -->
      <ul>
        <li><strong>{{pages}}</strong> Pages</li>
        <li><strong>{{disk}}</strong> Storage</li>
        <li><strong>{{traffic}}</strong> Traffic</li>
      </ul>
      <v-btn class="button-center" @click="start" color="primary" block>{{button}}</v-btn>
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
    'pages',
    'disk',
    'traffic',
    'button'
  ],
  data () {
    return {}
  },
  methods: {
    start() {}
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
.divider-topbottom-spacing{
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
