<template>
  <div>
    <h1>There’s a plan for you.</h1>
    <h4>Whether you want to try Wikibase, play around with some data or enter the linked data world.</h4>
    <h6>You can do it all here.</h6>
  <v-container fluid>
    <v-layout column align-center>
      <v-flex>
        <v-card dark max-width="600">
          <v-card-text>
            <v-container fluid>
              <v-layout>
                <v-flex>
                  <div class="headline">Free</div>
                  <p>Create a Wikibase in minuites.</p>
                </v-flex>
                <v-divider class="divider-side-spacing" vertical/>
                <v-flex>
                  Includes:
                  <ul>
                    <li>Disk: <strong>2GB</strong></li>
                    <li>Traffic: <strong>Included</strong></li>
                  </ul>
                </v-flex>
                <v-divider class="divider-side-spacing" vertical/>
                <v-flex>
                  <v-btn @click="startFree" color="primary">Start Free</v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
  <v-container fluid>
    <v-layout>
      <v-flex>
        <Pricing
        title="Starter"
        price="$10"
        snippet="Best to get started with"
        disk="3GB"
        traffic="Included"
        button="Get Starter"
        />
      </v-flex>
      <v-flex>
        <Pricing
        title="Personal"
        price="$20"
        snippet="Great for a project"
        disk="5GB"
        traffic="Included"
        button="Get Personal"
        />
      </v-flex>
      <v-flex>
        <Pricing
        title="Premium"
        price="$50"
        snippet="For that extra touch"
        disk="10GB"
        traffic="Included"
        button="Get Permium"
        />
      </v-flex>
      <v-flex>
        <Pricing
        title="Pro"
        price="$100"
        snippet="Getting professional"
        disk="20GB"
        traffic="Included"
        button="Get Pro"
        />
      </v-flex>
      <v-flex>
        <Pricing
        title="Pro+"
        price="$200"
        snippet="You probably won't need this"
        disk="160GB"
        traffic="Included"
        button="Get Pro+"
        />
      </v-flex>
    </v-layout>
  </v-container>
</div>
</template>

<script>
import Pricing from '@/components/Cards/Pricing'

export default {
  name: 'PricingTable',
  components: {
    Pricing
  }
}
</script>

<style scoped>

.headline{
  font-size: 30px !important;
}

.divider-side-spacing{
  margin-right: 10px;
  margin-left: 10px;
}
</style>
