<template>
  <div
    class="view"
    :style="{'--background-image': 'url(' + background + ')'}"
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
  height: 485px;
  position: relative;
  justify-content: center;
}
.view::before {
  background-image: var(--background-image);
  position: absolute;
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
  background-size: cover;
  content: "";
  height: 100%;
  width: 200vw;
  left: -100vw;
}
.view > .content {
  z-index: 1;
  color: white;
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
    max-width: 809px;
  }
}
@media screen and (min-width: 1120px) {
  .view {
    height: 788px;
    justify-content: left;
  }
  .view > .content {
    max-width: 851px;
  }
}
</style>
