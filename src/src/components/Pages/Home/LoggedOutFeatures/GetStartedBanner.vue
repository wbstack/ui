<template>
  <v-container fluid>
    <v-layout>
      <v-flex xs6>
        <v-container fluid>
          <v-layout column>
            <v-flex>
              <h1 class="header-main">Your open data..</h1>
            </v-flex>
            <v-flex>
              <h2 class="header-main">..starting with a Wikibase stack</h2>
            </v-flex>

            <v-flex>
              <p><h2 class="header-secondary"><a target="_blank" rel="noopener noreferrer" href="https://www.wikiba.se/">Wikibase</a> is an open source software suite for running a collaborative knowledge base.</h2></p>
              <p><small>-- <a target="_blank" rel="noopener noreferrer" href="https://learningwikibase.com/">learningwikibase.com</a> <a target="_blank" rel="noopener noreferrer" href="https://creativecommons.org/licenses/by/4.0/">CC-BY 4.0</a></small></p>
            </v-flex>

            <v-flex>
              <p><h2 class="header-secondary">WbStack is an alpha release platform for shared hosting of Wikibase sites.</h2></p>
            </v-flex>

            <v-flex>
              <p>You can rean more about it in the blog posts below.</p>
            </v-flex>

            <BlogPostList headerElement="h3" headerText="Blog Posts" ></BlogPostList>

            <v-flex>
              <p>If you would like an invitation please contact Addshore on <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/addshore">Twitter</a> or <a target="_blank" rel="noopener noreferrer" href="https://addshore.com/contact/" >by email</a></p>
            </v-flex>
            <!--<v-flex>-->
              <!--<RegisterInterest></RegisterInterest>-->
            <!--</v-flex>-->
          </v-layout>
        </v-container>
      </v-flex>
      <v-flex xs6>
        <!-- TODO trim images to all be a set size or ratio.... -->
        <v-carousel hide-controls hide-delimiters interval="5400" height="auto">
          <v-carousel-item
            position="top"
            v-for="(image,i) in images"
            :key="i"
            :src="image.src"
          ></v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex>
        <!-- <v-btn outline raised to="/create-account">Get started</v-btn> -->
      </v-flex>
    </v-layout>
</v-container>
</template>

<script>
import RegisterInterest from '@/components/Pages/Home/LoggedOutFeatures/RegisterInterest'
import BlogPostList from '@/components/Content/BlogPostList'

export default {
  name: 'GetStartedBanner',
  components: {
    RegisterInterest,
    BlogPostList
  },
  data () {
    return {
      images: [
        {
          src: '/static/screenshot-mediawiki.png'
        },
        {
          src: '/static/screenshot-wikibase-registry-query-april-2020.png'
        },
        {
          src: '/static/screenshot-wikidata-main-page-english.png'
        },
        {
          src: '/static/screenshot-biodiversity-query-april-2020.png'
        },
        {
          src: '/static/screenshot-quickstatements.png'
        },
      ]
    }
  }
}
</script>

<style scoped>
  h1.header-main{
    font-size: 64px;
    font-weight: 400;
    line-height: 72px;
  }

  h2.header-main{
    font-size: 32px;
    font-weight: 300;
    line-height: 72px;
  }

  h2.header-secondary{
    font-size: 20px;
    font-weight: 370;
    line-height: 35px;
  }
</style>
