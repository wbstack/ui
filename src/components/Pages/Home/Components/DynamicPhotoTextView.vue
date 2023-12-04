<template>
  <div v-if="sideBySide" class="alt-item">
    <div class="text">
      <div>
        <div class="text-header text-h4">{{header}}</div>
        <div class="text-body-1">{{content}}</div>
      </div>
    </div>
    <div class="image">
      <img :src="image">
    </div>
  </div>
  <div v-else class="item">
    <img :src="image">
    <div class="text-header text-h4 text-center">{{header}}</div>
    <div class="text-body-1 text-center">{{content}}</div>
  </div>
</template>

<script>
export default {
  name: 'DynamicPhotoTextView',
  props: {
    sideBySide: {
      type: Boolean,
      default: false
    },
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
    }
  }
}
</script>

<style scoped>
.text-header {
  margin-bottom: 16px;
}
.item {
  text-align: center;
}
.item img {
  max-height: 180px;
}
.item > .text-header {
  margin-top: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.alt-item {
  justify-content: center;
  display: flex;
  gap: 24px;
}
.alt-item > .image {
  flex: 1 100px;
  max-width: 285px;
}
.alt-item > .image img {
  max-width: 100%;
}
.alt-item > .text {
  max-width: 500px;
  flex: 1 1 100px;
  display: flex;
  align-items: center;
}
@media screen and (min-width: 640px) {
  .item {
    flex: 1 1 326px;
    max-width: 326px;
  }
}
@media screen and (min-width: 1120px) {
  .item img {
    max-height: 208px;
  }
  .item {
    max-width: initial;
  }
}
@media screen and (min-width: 1680px) {
  .item {
    max-width: 450px;
  }
}
</style>
