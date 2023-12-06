export default {
  data () {
    return {
      wrapped: false,
      timer: null,
      debounce: 15
    }
  },
  methods: {
    onResizeFlexbox () {
      return new Promise((resolve) => {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.wrapped = false
          this.$nextTick(() => {
            const items = Array.from(this.$refs.flexbox.children)
            this.wrapped = items.at(0).offsetTop !== items.at(-1).offsetTop
            resolve()
          })
        }, this.debounce)
      })
    }
  }
}
