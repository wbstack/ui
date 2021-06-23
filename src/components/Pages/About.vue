<template>
    <v-main>
      <v-container class="fill-height" fluid >
        <v-row justify="center">
          <v-col cols="8">
            <h1>About</h1>
            <p>The WBStack alpha platform was released in late 2019.</p>
            <p>It was open sourced in late 2020</p>
            <p><a target="_blank" rel="noopener noreferrer" href="https://rhizome.org/">Rhizome</a> have funded WBStack hosting for the majority of this time.</p>
            <p>In 2021 <a target="_blank" rel="noopener noreferrer" href="https://www.wikimedia.de/">Wikimedia Germany</a> started covering the costs of hosting.</p>
            <p>You can read more about the platform and history on the <a target="_blank" rel="noopener noreferrer" href="https://wbstack.github.io/docs/">docs site</a> or in the blog posts below.</p>
            <BlogPostList headerElement="h3" headerText="Blog Posts" ></BlogPostList>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
</template>

<script>
import BlogPostList from '~/components/Content/BlogPostList'

export default {
  name: 'About',
  computed: {},
  components: {
    BlogPostList
  }
}
</script>

<style>
</style>
