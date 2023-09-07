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
      const cards = this.$refs.grid.children,
        style = window.getComputedStyle(this.$refs.grid),
        rowGap = parseInt(style.getPropertyValue('row-gap')),
        gridAutoRows = parseInt(style.getPropertyValue('grid-auto-rows')),
        rowHeight = rowGap + gridAutoRows

      Array.from(cards).forEach((card) => {
        const cardHeight = card.firstChild.getBoundingClientRect().height + rowGap,
          numRows = Math.round(cardHeight / rowHeight)
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
