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
    policyId: function() {
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
        console.warn(this.policyId);
      try {
        // const response = await this.$api.policiesCurrent();
        // const response = await this.$api.policyByDate({policy_type, active_from});

        const mockResponses = {
            "2022-01-01": {
  "metadata": {
    "policy_id": 1,
    "type": "terms-of-use",
    "active_from": "2022-01-01",
    "content_vue_file": "terms-of-use/version-1.vue"
  }},
  upcoming: {
  "metadata": {
    "policy_id": 1,
    "type": "terms-of-use",
    "active_from": "upcoming",
    "content_vue_file": "terms-of-use/upcoming.vue"
  }}
        }
        const response = mockResponses[this.policyId];

        const metadata = await response.metadata;
        this.policy = versions[metadata.active_from];
      } catch (error) {
        console.log(error)
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
