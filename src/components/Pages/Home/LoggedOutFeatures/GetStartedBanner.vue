<template>
  <div>
    <v-row>
      <v-col cols="6">
        <v-row>
          <h1 class="header-main">Your open data..</h1>
        </v-row>
        <v-row>
          <h2 class="header-main">..starting with a Wikibase stack</h2>
        </v-row>

        <v-row>
          <h2 class="header-secondary">
          <a target="_blank" rel="noopener noreferrer" href="https://www.wikiba.se/">Wikibase</a> is an open source software suite for running a collaborative knowledge base.
            <small>-- <a target="_blank" rel="noopener noreferrer" href="https://learningwikibase.com/">learningwikibase.com</a> <a target="_blank" rel="noopener noreferrer" href="https://creativecommons.org/licenses/by/4.0/">CC-BY 4.0</a></small>
          </h2>
        </v-row>

        <v-row>
          <p>WbStack is an alpha release platform for shared hosting of Wikibase sites.</p>
        </v-row>

        <v-row>
              <p>If you would like an invitation please contact Addshore on <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/addshore">Twitter</a> or <a target="_blank" rel="noopener noreferrer" href="https://addshore.com/contact/" >by email</a></p>
        </v-row>

          <v-row>
            <p>You can learn more about it in the blog posts below.</p>
          </v-row>

          <BlogPostList headerElement="h3" headerText="Blog Posts"></BlogPostList>
      </v-col>
      <v-col cols="6">
        <!-- TODO trim images to all be a set size or ratio.... -->
        <v-carousel class="carousel-drop-shadow" interval="5500" height="460" cycle :show-arrows="false" :hide-delimiters="true" :touchless="true">
          <v-carousel-item
            position="top"
            v-for="(image,i) in images"
            :key="i"
            :src="image.src"
          ></v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>
<!--    <v-row>-->
<!--      <v-col>-->
<!--        <v-btn outline raised to="/create-account">Get started</v-btn>-->
<!--      </v-col>-->
<!--    </v-row>-->
  </div>
</template>

<script>
import RegisterInterest from '~/components/Pages/Home/LoggedOutFeatures/RegisterInterest'
import BlogPostList from '~/components/Content/BlogPostList'

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
        }
      ]
    }
  }
}
</script>

<style scoped>
  .carousel-drop-shadow{
    -moz-box-shadow: 0 0 3px #ccc;
    -webkit-box-shadow: 0 0 3px #ccc;
    box-shadow: 0 0 3px #ccc;
  }

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
    font-weight: 300;
    line-height: 35px;
  }
</style>
