<template>
    <v-main>
      <v-container class="fill-height" fluid >
        <v-row justify="center">
          <v-col cols="8">
            <h1>Contact Us</h1>
            <v-col>
              <p>Redirecting to <a href="https://wikiba.se/contact/">https://wikiba.se/contact/</a></p>
            </v-col>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
</template>

<script>
export default {
  name: 'Contact',
  created () {
    window.location.href = 'https://wikiba.se/contact/'
  }
}
</script>

<style>
</style>
