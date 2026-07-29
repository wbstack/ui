<template>
  <div class="overlay">
    <v-card max-width="580">
      <v-card-title>
        Updated policies
      </v-card-title>
      <v-card-text>
        <p class="text-body-1">
          Please accept the updated
          <PolicyList
            :policies="policies"
            article=""
            :clickable="false"
          />
          to continue using Wikibase Cloud.
          If you prefer not to keep your account, you can contact us to delete it.
        </p>
        <v-checkbox
          v-model="accepted"
          hide-details
          class="mt-2"
          :disabled="inFlight"
        >
          <template v-slot:label>
            <div class="text-body-1">
              I agree to the
              <PolicyList :policies="policies"/>
              <span>.</span>
            </div>
          </template>
        </v-checkbox>
      </v-card-text>
      <v-card-actions>
        <v-btn
          text
          color="primary"
          @click="onContactForm"
          :disabled="inFlight"
        >
          Contact Form
        </v-btn>
        <v-btn
          color="primary"
          :disabled="!accepted || inFlight"
          @click="onAccept"
        >
          Continue
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import PolicyList from '../Components/PolicyList'

export default {
  components: {
    PolicyList,
  },
  data () {
    return {
      accepted: false,
      inFlight: false,
    }
  },
  computed: {
    policies () {
      return this.$store.getters.missingPolicies
    },
  },
  methods: {
    onContactForm () {
      this.$router.push('/contact')
    },
    async onAccept () {
      this.inFlight = true
      const policyIds = Array.from(
        this.policies,
        policy => policy.metadata.policy_id,
      )
      await this.$store.dispatch('acceptPolicies', policyIds)
      this.inFlight = false
    },
  },
}
</script>

<style scoped>
.overlay {
  background: rgba(0, 0, 0, 0.25);
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  inset: 0;
  z-index: 10;
  overflow: auto;
}
</style>
