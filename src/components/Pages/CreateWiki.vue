<template>
    <v-main>
      <v-container class="fill-height" fluid >
        <v-row align="center" justify="center">
          <v-col class="card-column">
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

<style lang="css" scoped>
.card-column {
  max-width: 387px;
}
</style>
