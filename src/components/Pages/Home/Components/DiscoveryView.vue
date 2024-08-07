<template>
  <div class="view" :class="{wrapped: wrapped}">
    <div class="content">
      <div class="header">
        <div class="text-h3 title">
          Need some help getting started?
        </div>
        <div class="text-body-1 subtitle">
          Or have a look at <a href="https://www.mediawiki.org/wiki/Wikibase" target="_blank">our documentation</a>, connect with <a href="https://t.me/joinchat/FgqAnxNQYOeAKmyZTIId9g" target="_blank">the community</a>.<br/>
          You can also get some inspiration by browsing some other Wikibases hosted on Wikibase Cloud.
        </div>
      </div>
      <div class="discovery" ref="flexbox" v-resize="onResizeFlexbox">
        <DiscoveryCard
          name="Qichwabase"
          data-test-id="featured-wiki-1"
          url="https://qichwa.wikibase.cloud"
          logo="https://storage.googleapis.com/wikibase-cloud-static/sites/cabd56b39c5401450a34dd5c9ea93149/logos/135.png"
        >
          Qichwabase models <a href="https://www.wikidata.org/wiki/Q5218" target="_blank">Quechua language</a>, a language family spoken primarily in the Andes region of South America. It is a product of a miniproject worked on at <a href="https://datathon2022.linkeddata.es/" target="_blank">SD-LLOD-22</a> in June 2022, where it was awarded the Best Project Prize.
        </DiscoveryCard>
        <DiscoveryCard
          name="Beyond Notability"
          data-test-id="featured-wiki-2"
          url="https://beyond-notability.wikibase.cloud"
          logo="https://storage.googleapis.com/wikibase-cloud-static/sites/09daa4b3e2ceb1869bc81a21efc230b4/logos/135.png"
        >
          Beyond Notability re-evaluates women's work in archaeology, history and heritage between 1870 and 1950. This community-driven LOD project experiences their knowledge graph as a living resource where any results are temporary until their final publication in 2024.
        </DiscoveryCard>
        <DiscoveryCard
          name="Wikibase World"
          data-test-id="featured-wiki-3"
          url="https://wikibase.world"
          logo="https://storage.googleapis.com/wikibase-cloud-static/sites/5de9f42a956f72a8375f03260e597f58/logos/135.png"
        >
          <a href="https://wikibase.world/wiki/Item:Q3" target="_blank">Wikibase World</a> is a collaborative database that was initiated by James Hare, an enthusiastic Wikibase community member. This Wikibase attempts to display and map existing Wikibases with common records so that they can become interoperable with each other. Come and join!
        </DiscoveryCard>
        </div>
      <div class="button">
        <v-btn data-test-id="discovery-button" to="/discovery" large outlined>
          Discover more wikibases
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import FlexboxWrapEvent from '../../../../mixins/FlexboxWrapEvent.js'
import DiscoveryCard from './DiscoveryCard.vue'

export default {
  name: 'DiscoveryView',
  mixins: [FlexboxWrapEvent],
  components: {
    DiscoveryCard
  }
}
</script>

<style scoped>
.view {
  position: relative;
  margin-top: 40px;
  margin-bottom: 40px;
}
.view::before {
  background-color: rgba(60, 158, 105, 0.15);
  position: absolute;
  content: "";
  height: 100%;
  width: 200vw;
  left: -100vw;
}
.view > .content {
  padding-top: 40px;
  padding-bottom: 40px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  z-index: 1;
}
.header > .subtitle {
  margin-top: 16px;
}
.discovery {
  display: flex;
  flex-wrap: wrap;
  flex: 1 1 auto;
  margin-top: 32px;
  margin-bottom: 32px;
  gap: 24px;
}
.discovery > .v-card {
  flex-basis: 0;
  flex-grow: 1;
  max-width: 100%;
  min-width: 288px;
}
.button {
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
}
.view.wrapped .discovery > .v-card {
  max-width: 430px;
}
.view.wrapped .discovery {
  flex-direction: column;
  align-content: center;
}
.view.wrapped .title,
.view.wrapped .subtitle {
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
}
@media screen and (min-width: 640px) {
  .view > .content {
    padding-top: 48px;
    padding-bottom: 48px;
    max-width: 809px;
  }
  .discovery {
    margin-top: 48px;
  }
}
@media screen and (min-width: 1120px) {
  .view {
    margin-top: 48px;
    margin-bottom: 48px;
  }
  .view > .content {
    max-width: none;
  }
  .discovery {
    margin-bottom: 40px;
    gap: 32px;
  }
}
</style>
