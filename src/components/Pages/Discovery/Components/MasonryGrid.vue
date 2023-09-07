<template>
  <div class="grid" ref="grid">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'MasonryGrid',
  data () {
    return {
      timer: null
    }
  },
  methods: {
    resizeCards () {
      const cards = this.$refs.grid.children
      const style = window.getComputedStyle(this.$refs.grid)
      const rowGap = parseInt(style.getPropertyValue('row-gap'))
      const gridAutoRows = parseInt(style.getPropertyValue('grid-auto-rows'))
      const rowHeight = rowGap + gridAutoRows

      Array.from(cards).forEach((card) => {
        const cardHeight = card.firstChild.getBoundingClientRect().height + rowGap
        const numRows = Math.round(cardHeight / rowHeight)
        card.style['grid-row'] = 'span ' + numRows
      })
    },
    debounceResize (time) {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.resizeCards()
      }, time)
    },
    windowResized () {
      this.debounceResize(50)
    }
  },
  created () {
    window.addEventListener('resize', this.windowResized)
  },
  destroyed () {
    window.removeEventListener('resize', this.windowResized)
  },
  updated () {
    this.$nextTick(() => {
      this.resizeCards()
    })
  }
}
</script>

<style scoped>
.grid {
  display: grid;
  row-gap: 16px;
  grid-template-columns: repeat(auto-fill, minmax(288px, 1fr));
  grid-auto-rows: 1px;
}
</style>
