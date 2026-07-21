<template>
  <v-main>
    <v-container class="fill-height" fluid>
      <v-row justify="center">
        <v-col cols="11" md="4" order-md="last">
          <TermsOfUseNavigationPanel />
        </v-col>

        <v-col cols="11" md="8">
          <component :is="policy" v-if="policy" />
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import TermsOfUseNavigationPanel from './TermsOfUseNavigationPanel.vue'

export const versions = {
  "2022-01-01": () => ({ component: import('./terms-of-use/2022-01-01.vue') }),
}

export default {
  name: 'TermsOfUseRenderer',
  components: {
    TermsOfUseNavigationPanel,
  },
  computed: {
    policyId: function () { // TODO rename to activeFrom ?
      return this.$route.params.version;
    }
  },
  data() {
    return {
      policy: undefined,
    }
  },
  methods: {
    async loadPolicy() {
      try {
        // const response = await this.$api.policiesCurrent();
        let policyType = 'terms-of-use'; // TODO read this from component property
        let activeFrom = this.policyId;

        const response = await this.$api.policyByDate({ policyType, activeFrom });

        const metadata = await response.metadata;
        this.policy = versions[metadata.active_from];
      } catch (error) {
        console.error(error)
        alert('Failed to show policy')
      }
    },
  },
  mounted() {
    this.loadPolicy()
  },
  watch: {
    policyId: function () {
      this.loadPolicy()
    },
  }
}
</script>

<style scoped></style>
