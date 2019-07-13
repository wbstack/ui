<template>
  <div class="wrapper">
    <GetStartedBanner></GetStartedBanner>
    <WhatCanYouDo></WhatCanYouDo>
  </div>
</template>

<script>
import GetStartedBanner from '@/components/Features/GetStartedBanner'
import WikiCount from '@/components/Features/WikiCount'
import WhatCanYouDo from '@/components/Features/WhatCanYouDo'

export default {
  name: 'LoggedOut',
  computed: {},
  components: {
    GetStartedBanner,
    WikiCount,
    WhatCanYouDo
  }
}
</script>

<style scoped>
</style>
