<template>
  <v-main>
    <pre>
    policyId (derived from route): `{{policyId}}`
    policy: {{ policy }}
    </pre>

    <p>
    <router-link :to="{ path: '/terms-of-use/2022-01-01' }">
        2022-01-01
    </router-link></p>

    <p><router-link :to="{ path: '/terms-of-use/upcoming' }">
        upcoming
    </router-link></p>

    <hr>

    <component :is="policy" v-if="policy" />
  </v-main>
</template>

<script>
export const versions = {
  "2022-01-01": () => ({ component: import('./terms-of-use/2022-01-01.vue') }),
  upcoming:     () => ({ component: import('./terms-of-use/upcoming.vue') }),
}

export default {
  name: 'TermsOfUseRenderer',
  components: {
  },
  computed: {
    policyId: function() { // TODO rename to activeFrom ?
        return this.$route.params.version;
    }
  },
  data() {
    return {
        policy: undefined,
    }
  },
  methods: {
    async loadPolicy () {
        console.info(this.policyId);
      try {
        // const response = await this.$api.policiesCurrent();
        let policyType = 'terms-of-use'; // TODO read this from component property
        let activeFrom = this.policyId;

        const response = await this.$api.policyByDate({ policyType, activeFrom });

        console.info(response);

        const metadata = await response.metadata;
        this.policy = versions[metadata.active_from];
      } catch (error) {
        console.error(error)
        alert('Failed to show policy')
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
  }
}
</script>

<style scoped>
</style>
