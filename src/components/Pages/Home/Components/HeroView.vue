<template>
  <div
    class="view"
    :style="{'background-image': 'url(' + background + ')'}"
  >
    <div class="content">
      <div
        class="font-weight-bold"
        :class="($vuetify.breakpoint.width >= 640) ? 'text-h1' : 'text-h2'"
      >
        {{header}}
      </div>
      <div class="subtitle text-h5 font-weight-medium">{{content}}</div>
      <v-btn :to="target" color="primary" x-large>{{button}}</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeroView',
  props: {
    header: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    button: {
      type: String,
      required: true
    },
    target: {
      type: String,
      required: true
    },
    background: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.view {
  display: flex;
  align-items: center;
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
  background-size: cover;
  color: white;
  height: 485px;
}
.view > .content {
  margin-left: 16px;
  margin-right: 16px;
}
.view > .content > .subtitle {
  margin-top: 24px;
  margin-bottom: 24px;
}
.view > .content > .v-btn {
  max-width: 132px;
}
@media screen and (min-width: 640px) {
  .view {
    height: 820px;
  }
  .view > .content {
    margin-left: 24px;
    margin-right: 24px;
  }
}
@media screen and (min-width: 1120px) {
  .view {
    height: 788px;
  }
  .view > .content {
    max-width: 851px;
    margin-left: 96px;
    margin-right: auto;
  }
}
@media screen and (min-width: 1514px) {
  .view > .content {
    margin-left: 268px;
  }
}
</style>
