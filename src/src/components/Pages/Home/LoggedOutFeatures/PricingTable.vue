<template>
  <div>
  <v-container fluid grid-list-md>
    <v-layout column>
      <v-flex class="text-center">
        <h1>There’s a plan for you.</h1>
        <h2>Whether you want to try Wikibase, play with some data</h2>
        <h2>or enter the linked data world.</h2>
        <p>You can do it all here.</p>
      </v-flex>
      <v-flex>
        <v-layout row>
          <v-flex x6>
            <v-card dark min-height="100%">
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
                        <li><strong>100</strong> Pages</li>
                        <li><strong>2GB</strong> Storage</li>
                        <li><strong>Included</strong> Traffic</li>
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
          <v-flex x6>
            <v-card dark min-height="100%">
              <v-card-text>
                <v-container fluid>
                  <v-layout>
                    <v-flex>
                      <div class="headline">Custom</div>
                      <p>Don't see what you need below?</p>
                    </v-flex>
                    <v-divider class="divider-side-spacing" vertical/>
                    <v-flex>
                      <v-btn @click="contactUs" color="primary">Contact us</v-btn>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex>
        <Pricing
        title="Starter"
        price="$10"
        snippet="Best to get started with"
        pages="500"
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
        pages="1000"
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
        pages="10,000"
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
        pages="100,000"
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
        pages="1,000,000"
        disk="160GB"
        traffic="Included"
        button="Get Pro+"
        />
      </v-flex>
    </v-layout>
    <p class="text-center">Prices are still being figured out during the Alpha and may change.</p>
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

h1{
  font-size: 40px;
  font-weight: 500;
  line-height: 50px;
}
h2{
  font-size: 30px;
  font-weight: 375;
  line-height: 50px;
}

.text-center{
  text-align: center;
}

button {
    margin:0 auto;
    display:block;
}

</style>
