<template>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center column>
          <v-flex xs12 sm8 md4>
            <CreateWikiCard title="Create a Wiki" buttonText="Create Wiki"/>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
</template>

<script>
import CreateWikiCard from '@/components/Cards/CreateWiki'

export default {
  name: 'CreateWiki',
  components: {
    CreateWikiCard
  },
  data () {
    return {}
  }
}
</script>

<style>
</style>
