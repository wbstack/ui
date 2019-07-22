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

<style>
</style>
