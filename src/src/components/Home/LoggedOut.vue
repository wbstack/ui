<template>
  <v-container fluid>
    <v-layout>
      <v-flex xs12>
        <GetStartedBanner></GetStartedBanner>
        <WhatCanYouDo></WhatCanYouDo>
        <WhatIsIncluded></WhatIsIncluded>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import GetStartedBanner from '@/components/Features/GetStartedBanner'
import WikiCount from '@/components/Features/WikiCount'
import WhatCanYouDo from '@/components/Features/WhatCanYouDo'
import WhatIsIncluded from '@/components/Features/WhatIsIncluded'

export default {
  name: 'LoggedOut',
  computed: {},
  components: {
    GetStartedBanner,
    WikiCount,
    WhatCanYouDo,
    WhatIsIncluded
  }
}
</script>

<style>
</style>
