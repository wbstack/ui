<template>
  <div class="content">
    <HeroView
      :background="require('../../../assets/components/pages/home/HeroBackground.png')"
      header="Your own Wikibase in five minutes"
      content="Simple & Secure"
      button="Try it out"
      target="/create-account"
    />
    <div class="wrapper">
      <DynamicContainerView
        v-slot="{sideBySide}"
      >
        <DynamicPhotoTextView
          :sideBySide="sideBySide"
          :image="require('../../../assets/components/pages/home/BlueGraph.png')"
          header="What is Wikibase Cloud?"
          content="In a nutshell, Wikibase Cloud is a collaborative space for individuals and groups to contribute, edit, and curate information in a structured way to help you transform your data into meaningful knowledge."
        />
        <DynamicPhotoTextView
          :sideBySide="sideBySide"
          :image="require('../../../assets/components/pages/home/RedHeads.png')"
          header="Why Wikibase Cloud?"
          content="Wikibase Cloud makes it easy and quick to host your Wikibase with no need for your own infrastructure. We offer a complete install of Wikibase and its services within a few minutes of signup. Wikibase cloud is GDPR-compliant, rule-free, flexible and free and open source."
        />
        <DynamicPhotoTextView
          :sideBySide="sideBySide"
          :image="require('../../../assets/components/pages/home/GreenGroup.png')"
          header="Who is Wikibase Cloud for?"
          content="Whether you're in the cultural sector, a scientific researcher or the author of another data-rich project, Wikibase Cloud supports the archiving of structured data collections and opens the doors to efficient data management, sharing, and discovering insights in a collaborative environment."
        />
      </DynamicContainerView>
      <DiscoveryView/>
      <PhotoTextView
        :image="require('../../../assets/components/pages/home/GreenLady.png')"
        header="Sign up for Open Beta!"
        content="Our Open Beta is ready for your projects and data, running in European data centers with full GDPR compliance and 30 days of guaranteed data backups. Beta means we may not be able to offer 100% availability on the platform or individual services until full release, but we can guarantee your data is safe."
        button="Sign up here for open beta"
        target="/create-account"
      />
    </div>
  </div>
</template>

<script>
import HeroView from './Components/HeroView.vue'
import DynamicContainerView from './Components/DynamicContainerView.vue'
import DynamicPhotoTextView from './Components/DynamicPhotoTextView.vue'
import DiscoveryView from './Components/DiscoveryView.vue'
import PhotoTextView from './Components/PhotoTextView.vue'

export default {
  name: 'Home',
  components: {
    HeroView,
    DynamicContainerView,
    DynamicPhotoTextView,
    DiscoveryView,
    PhotoTextView
  }
}
</script>

<style scoped>
.wrapper {
  margin-left: 16px;
  margin-right: 16px;
}
@media screen and (min-width: 640px) {
  .wrapper {
    margin-left: 24px;
    margin-right: 24px;
  }
}
@media screen and (min-width: 1120px) {
  .wrapper {
    margin-left: 32px;
    margin-right: 32px;
  }
}
@media screen and (min-width: 1584px) {
  /* 1680px - 2 * 48px = 1584px */
  .wrapper {
    /* 1584px - 2 * 32px = 1520px */
    max-width: 1520px;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
