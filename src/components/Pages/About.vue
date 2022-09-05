<template>
    <v-main>
      <v-container class="fill-height" fluid >
        <v-row justify="center">
          <v-col cols="8">
            <h1>About</h1>
            <v-col>
              <p>Redirecting to <a href="https://wikiba.se/about-us/">https://wikiba.se/about-us/</a></p>
            </v-col>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
</template>

<script>

export default {
  name: 'About',
  created () {
    window.location.href = 'https://wikiba.se/about-us/'
  }
}
</script>

<style>
</style>
