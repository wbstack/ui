<template>
    <v-content>
      <v-container class="fill-height" fluid >
        <v-row justify="center">
          <v-col cols="8">
            <h1>About</h1>
            <p>The WbStack alpha platform was released in late 2019.</p>
            <p>You can find out more details about it in the blog posts below.</p>
            <BlogPostList headerElement="h3" headerText="Blog Posts" ></BlogPostList>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
</template>

<script>
import BlogPostList from '@/components/Content/BlogPostList'

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
