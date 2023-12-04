<template>
  <div class="view" :class="{wrapped: wrapped}" ref="view" v-resize="onResize">
    <div class="image">
      <img :src="image">
    </div>
    <div class="text">
      <div>
        <div class="text-h3">{{header}}</div>
        <div class="text-body text-body-1">{{content}}</div>
        <v-btn :to="target" color="primary" x-large>{{button}}</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PhotoTextView',
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
  },
  data () {
    return {
      wrapped: false
    }
  },
  methods: {
    debounceResize (time) {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.wrapped = false
        this.$nextTick(() => {
          const items = Array.from(this.$refs.view.children)
          this.wrapped = items.at(0).offsetTop !== items.at(-1).offsetTop
        })
      }, time)
    },
    onResize () {
      this.debounceResize(50)
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
