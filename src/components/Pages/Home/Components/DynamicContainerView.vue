<template>
  <div class="view" :class="{wrapped: wrapped}" ref="flexbox" v-resize="onResize">
    <slot :sideBySide="wrapped"/>
  </div>
</template>

<script>
import FlexboxWrapEvent from '../../../../mixins/FlexboxWrapEvent.js'

export default {
  name: 'DynamicContainerView',
  mixins: [FlexboxWrapEvent],
  methods: {
    setHeaderHeight () {
      // TODO: Find a way to do this using only CSS
      const items = Array.from(this.$refs.flexbox.children)
      const headers = items.map(item => item.__vue__.$refs.header).filter(item => item)
      headers.forEach(header => { header.style.height = 'auto' })
      if (document.body.clientWidth > 640) {
        this.$nextTick(() => {
          const maxHeight = Math.max.apply(Math, headers.map(header => header.offsetHeight))
          headers.forEach(header => { header.style.height = maxHeight + 'px' })
        })
      }
    },
    async onResize () {
      if (document.body.clientWidth > 640) {
        await this.onResizeFlexbox()
      } else {
        this.wrapped = false
      }
      this.$nextTick(() => {
        this.setHeaderHeight()
      })
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
