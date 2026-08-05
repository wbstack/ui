<template>
  <div style="display: contents">
    <div
      v-for="(policy, idx) in policies"
      :key="policy.metadata.policy_id"
      style="display: contents"
    >
      <span>{{ getPolicySeparator(idx) }}</span>
      <v-tooltip v-if="clickable" bottom>
        <template v-slot:activator="{ on }">
          <a
            target="_blank"
            :href="getPolicyUrl(policy)"
            @click.stop
            v-on="on"
          >{{ getPolicyName(policy) }}</a>
        </template>
        Opens in new window
      </v-tooltip>
      <span v-else>
        {{ getPolicyName(policy) }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    policies: {
      type: Array,
    },
    article: {
      type: String,
      default: 'the ',
    },
    clickable: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    getPolicyName (policy) {
      return policy.metadata.type.replaceAll('-', ' ')
    },
    getPolicyUrl (policy) {
      return `/${policy.metadata.type}/${policy.metadata.active_from}`
    },
    getPolicySeparator (idx) {
      const count = this.policies.length
      if (idx === 0) {
        return ' '
      } else if (count === 2) {
        return ` and ${this.article}`
      } else if (idx === count - 1) {
        return `, and ${this.article}`
      } else {
        return `, ${this.article}`
      }
    },
  },
}
</script>
