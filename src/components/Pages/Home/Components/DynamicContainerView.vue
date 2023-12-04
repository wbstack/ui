<template>
  <div class="view" :class="{wrapped: sideBySide}" ref="view" v-resize="onResize">
    <slot :sideBySide="sideBySide"/>
  </div>
</template>

<script>
export default {
  name: 'DynamicContainerView',
  data () {
    return {
      sideBySide: false,
      timer: null
    }
  },
  methods: {
    debounceResize (time) {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.sideBySide = false
        if (document.body.clientWidth > 640) {
          this.$nextTick(() => {
            const items = Array.from(this.$refs.view.children)
            this.sideBySide = items.at(0).offsetTop !== items.at(-1).offsetTop
        })
        }
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
  justify-content: space-between;
  margin-top: 48px;
  margin-bottom: 48px;
  gap: 40px;
}
.view.wrapped {
  justify-content: center;
}
@media screen and (min-width: 640px) {
  .view {
    margin-top: 96px;
    margin-bottom: 96px;
    gap: 80px;
  }
}
@media screen and (min-width: 1120px) {
  .view {
    gap: 32px;
  }
}
@media screen and (min-width: 1680px) {
  .view {
    margin-top: 144px;
    gap: 82px;
  }
}
</style>
