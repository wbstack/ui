<template>
  <v-form>
  <p>Register your interest to get updates</p>
    <v-text-field
    id="inputEmail"
    prepend-icon="email"
    name="interest"
    label="Email address"
    type="email"
    required
    v-model="email"
    :disabled="registeringInterest"
    />
    <!-- TODO inline the button on the end of the input line -->
  <v-btn @click="registerInterest" color="primary" :disabled="registeringInterest">
    Submit
  </v-btn>
  </v-form>
</template>

<script>

export default {
  name: 'RegisterInterest',
  components: {},
  data () {
    return {
      email: '',
      // For disabled as the API isn't ready
      registeringInterest: true
    }
  }
}
</script>

<style scoped>
</style>
