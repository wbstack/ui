<template>
  <span :class="[
      'CheckVerification',
      `CheckVerification--${interval}`
    ]"
    ref="elm" />
</template>

<script>
export default {
  props: {
    callback: Function,
    interval: Number
  },

  beforeDestroy () {
    this.stop()
  },

  mounted () {
    this.start()
  },

  methods: {
    start () {
      this.stop()
      if (this.$props.interval) {
        this.$refs.elm.interval = setInterval(this.tick, this.$props.interval)
      }
    },

    tick (...args) {
      this.$props.callback(...args)
    },

    stop () {
      this.$refs.elm.interval && clearInterval(this.$refs.elm.interval)
    }
  }
}
</script>

<style>
.CheckVerification {
  display: none;
}
</style>
