<template>
  <v-container fluid>
    <v-layout>
      <v-flex xs12>
        <GetStartedBanner></GetStartedBanner>
        <WhatCanYouDo></WhatCanYouDo>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import GetStartedBanner from '@/components/Pages/Home/LoggedOutFeatures/GetStartedBanner'
// import WikiCount from '@/components/Pages/Home/LoggedOutFeatures/WikiCount'
import WhatCanYouDo from '@/components/Pages/Home/LoggedOutFeatures/WhatCanYouDo'
//import WhatIsIncluded from '@/components/Pages/Home/LoggedOutFeatures/WhatIsIncluded'

export default {
  name: 'Home',
  computed: {},
  components: {
    GetStartedBanner,
    //    WikiCount,
    WhatCanYouDo,
    //WhatIsIncluded,
  }
}
</script>

<style>
</style>
