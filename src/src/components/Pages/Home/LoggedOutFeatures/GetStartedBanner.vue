<template>
  <v-container fluid>
    <v-layout>
      <v-flex xs6>
        <v-container fluid>
          <v-layout column>
            <v-flex>
              <h1>Your open data..</h1>
            </v-flex>
            <v-flex>
              <h2>..starting with a Wikibase stack</h2>
            </v-flex>
            <v-flex>
              <h3>Blog posts:</h3>
              <ul>
                <li><a href="https://addshore.com/2019/11/wbstack-november-review">November review</a></li>
                <li><a href="https://addshore.com/2019/11/an-introduction-to-wbstack/">October introduction</a></li>
              </ul>
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

export default {
  name: 'GetStartedBanner',
  components: {
    RegisterInterest
  },
  data () {
    return {
      images: [
        {
          src: '/static/screenshot-mediawiki.png'
        },
        {
          src: '/static/screenshot-wikibase-registry-query-april-2019.png'
        },
        {
          src: '/static/screenshot-wikidata-main-page-finnish.png'
        },
        {
          src: '/static/screenshot-wikidata-query-service.png'
        }
      ]
    }
  }
}
</script>

<style scoped>
  h1{
    font-size: 64px;
    font-weight: 400;
    line-height: 72px;
  }

  h2{
    font-size: 32px;
    font-weight: 300;
    line-height: 72px;
  }
</style>
