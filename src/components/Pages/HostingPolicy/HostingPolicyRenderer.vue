<template>
  <v-main>
    <v-alert class="mt-8 mr-2 ml-2" outlined type="error" border="left" v-if="error">
      An error occurred while trying to load the requested policy. Please try again later.
    </v-alert>
    <v-container class="fill-height" fluid>
      <v-row justify="center">
        <v-col cols="11" md="4" order-md="last">
        </v-col>

        <v-col cols="11" md="8">
          <component :is="policy" v-if="policy" />
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>

export const versions = {
  'hosting-policy/version-1.vue': () => ({ component: import('./hosting-policy/version-1.vue') }),
}

export default {
  name: 'HostingPolicyRenderer',
  components: {},
  computed: {
    policyActiveFrom: function () {
      return this.$route.params.activeFrom
    },
  },
  data () {
    return {
      policy: undefined,
      error: undefined,
    }
  },
  methods: {
    async loadPolicy () {
      try {
        const policyType = 'hosting-policy' // TODO read this from component property
        const activeFrom = this.policyActiveFrom

        const response = await this.$api.policyByDate({ policyType, activeFrom })

        const metadata = await response.metadata
        this.policy = versions[metadata.content_vue_file]
      } catch (error) {
        console.error(error)
        this.error = error
      }
    },
  },
  mounted () {
    this.loadPolicy()
  },
  watch: {
    policyId: function () {
      this.loadPolicy()
    },
  },
}
</script>

<style scoped></style>
