<template>
  <div class="wrapper">
    <h1 v-if="count">
      <span>Currently hosting {{count}} site.</span>
    </h1>
    <h1 v-if="!count">
      <span>Loading...</span>
    </h1>
  </div>
</template>

<script>

export default {
  name: 'WikiCount',
  components: {},
  data () {
    return {
      count: null
    }
  },
  created () {
    this.$api.countWikis()
      .then(count => { this.count = count })
      .catch(() => { alert('Something went wrong!') })
  }
}
</script>

<style scoped>

  span{
    font-size: 64px;
    font-weight: 400;
    line-height: 72px;
    margin: 0 auto;
  }

  h1 {
    margin: 0 auto;
  }

  .wrapper {
    display: flex;
    max-width:1152px;
    align-items: center;
    text-align: center;
    margin: 0 auto;
  }
</style>
