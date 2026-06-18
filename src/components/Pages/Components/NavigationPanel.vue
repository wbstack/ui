<template>
    <v-expansion-panels v-bind:value="$vuetify.breakpoint.mdAndUp ? 0 : null" v-if="links">
        <v-expansion-panel>
            <v-expansion-panel-header>{{ title }}</v-expansion-panel-header>

            <v-expansion-panel-content>
            <v-list class="wrap">
                <v-list-item v-for="(link) in links" :key="link.routePath">
                    <v-list-item-content>
                        <v-list-item-title v-if="! isCurrentPage(link.routePath)">
                            <router-link :to="{ path: link.routePath }" class="text-decoration-none">
                                <v-list-item-title>{{ link.title }}</v-list-item-title>
                            </router-link>
                        </v-list-item-title>

                        <v-list-item-title v-else>{{ link.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
            </v-expansion-panel-content>
        </v-expansion-panel>
    </v-expansion-panels>
</template>

<script>
export default {
  name: 'NavigationPanel',
  props: {
    title: String,
    links: Array,
  },
  methods: {
    isCurrentPage (path) {
      return this.$route.path === path
    },
  },
}

</script>

<style scoped></style>
