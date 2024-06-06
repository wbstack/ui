<template>
  <div class="view" :class="{wrapped: wrapped}" ref="flexbox" v-resize="onResizeFlexbox">
    <div class="image">
      <img :src="image">
    </div>
    <div class="text">
      <div>
        <div class="text-h3">{{header}}</div>
        <div class="text-body text-body-1">{{content}}</div>
        <v-btn id="open-beta-button" :to="target" color="primary" x-large>{{button}}</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import FlexboxWrapEvent from '../../../../mixins/FlexboxWrapEvent.js'

export default {
  name: 'PhotoTextView',
  mixins: [FlexboxWrapEvent],
  props: {
    image: {
      type: String,
      required: true
    },
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
    }
  }
}
</script>

<style scoped>
.view {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 48px auto;
  gap: 16px;
}
.image {
  flex: 1 312px;
  max-width: 325px;
}
.image img {
  max-width: 100%;
}
.text {
  flex: 1 1 312px;
  display: flex;
  align-items: center;
}
.text-body {
  margin-top: 8px;
  margin-bottom: 16px;
}
.view.wrapped .text {
  text-align: center;
}
.view.wrapped .image {
  max-width: 275px;
}
@media screen and (min-width: 640px) {
  .view {
    max-width: 809px;
    margin: 96px auto;
    gap: 24px;
  }
  .text-body {
    margin-top: 16px;
    margin-bottom: 24px;
  }
}
@media screen and (min-width: 1120px) {
  .view {
    max-width: none;
    margin: 96px auto;
    gap: 48px;
  }
  .text {
    max-width: 488px;
  }
  .text-body {
    margin-top: 24px;
  }
}
@media screen and (min-width: 1680px) {
  .view {
    margin: 114px auto;
    gap: 114px;
  }
}
</style>
