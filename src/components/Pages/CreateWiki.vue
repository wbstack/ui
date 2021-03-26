<template>
    <v-main>
      <v-container class="fill-height" fluid >
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <CreateWikiCard title="Create a Wiki" buttonText="Create Wiki"/>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
</template>

<script>
import CreateWikiCard from '~/components/Cards/CreateWiki'

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
