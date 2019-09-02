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
                <v-container fluid class="container-less-padding">
                  <v-layout>
                    <v-flex>
                      <div class="headline">Free</div>
                      <v-divider class="divider-topbottom-spacing"/>
                      <span>Create a Wikibase in minuites.</span>
                    </v-flex>
                    <v-divider class="divider-side-spacing" vertical/>
                    <v-flex>
                      Includes:
                      <ul>
                        <li><strong>100</strong> Pages</li>
                        <li><strong>1GB</strong> Storage</li>
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
                <v-container fluid class="container-less-padding">
                  <v-layout>
                    <v-flex>
                      <div class="headline">Custom</div>
                      <v-divider class="divider-topbottom-spacing"/>
                      <span>Need more storage, pages or features?</span><br/>
                      <span>Have specific hosting requirements?</span><br/>
                      <span>Don't see what you need below?</span>
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
      <v-flex>
        <v-layout>
          <v-flex>
            <Pricing
            title="Personal"
            price="$40"
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
            price="$120"
            snippet="For that extra touch"
            pages="50,000"
            disk="20GB"
            traffic="Included"
            button="Get Pro"
            />
          </v-flex>
          <v-flex>
            <Pricing
            title="Pro"
            price="$350"
            snippet="You probably won't need this"
            pages="1,000,000"
            disk="160GB"
            traffic="Included"
            button="Get Pro"
            />
          </v-flex>
        </v-layout>
        <p class="text-center">Prices are still being figured out during the Alpha and may change.</p>
      </v-flex>
      <v-flex class="text-center">
        <h2>Compare Pricing and Plans</h2>
      </v-flex>
      <v-flex>
        <table class="v-table">
          <colgroup>
            <col class="col-feature">
            <col class="col-info">
            <col class="col-plan">
            <col class="col-plan">
            <col class="col-plan">
            <col class="col-plan">
          </colgroup>

          <thead>
            <th colspan="2"></th>
            <th>Free</th>
            <th>Personal</th>
            <th>Premium</th>
            <th>Pro</th>
          </thead>

          <tbody>
            <tr>
              <td>
                Pages
              </td>
              <td>

                <v-tooltip right>
                  <template v-slot:activator="{ on }">
                    <v-icon small v-on="on">info_outline</v-icon>
                  </template>
                  <span>Number of pages as counted by MediaWiki.</span>
                </v-tooltip>
              </td>
              <td>100</td>
              <td>1000</td>
              <td>50,000</td>
              <td>1,000,000</td>
            </tr>
            <tr>
              <td>
                Storage
              </td>
              <td>
                <v-tooltip right>
                  <template v-slot:activator="{ on }">
                    <v-icon small v-on="on">info_outline</v-icon>
                  </template>
                  <span>All storage space. Includes content, revisions, indexes and files.</span>
                </v-tooltip>
              </td>
              <td>1GB</td>
              <td>5GB</td>
              <td>20GB</td>
              <td>160GB</td>
            </tr>
            <tr>
              <td>
                Traffic
              </td>
              <td>
                <v-tooltip right>
                  <template v-slot:activator="{ on }">
                    <v-icon small v-on="on">info_outline</v-icon>
                  </template>
                  <span>A Fair usage Policy applies.</span>
                </v-tooltip>
              </td>
              <td>Included</td>
              <td>Included</td>
              <td>Included</td>
              <td>Included</td>
            </tr>
          </tbody>

          <thead>
            <th colspan="2">Wikibase Features</th>
            <th>Free</th>
            <th>Personal</th>
            <th>Premium</th>
            <th>Pro</th>
          </thead>
          <tbody>
            <tr>
              <td>
                Skins
              </td>
              <td>
                <v-tooltip right>
                  <template v-slot:activator="{ on }">
                    <v-icon small v-on="on">info_outline</v-icon>
                  </template>
                  <span>Vector (as seen on Wikipedia), Timeless, Modern</span>
                </v-tooltip>
              </td>
              <td>3</td>
              <td>3</td>
              <td>3</td>
              <td>3</td>
            </tr>
            <tr>
              <td>
                Uploads
              </td>
              <td>
                <v-tooltip right>
                  <template v-slot:activator="{ on }">
                    <v-icon small v-on="on">info_outline</v-icon>
                  </template>
                  <span>MediaWiki file uploads.</span>
                </v-tooltip>
              </td>
              <td>Coming Soon!</td>
              <td>Coming Soon!</td>
              <td>Coming Soon!</td>
              <td>Coming Soon!</td>
            </tr>
            <tr>
              <td>
                RevisionSlider
              </td>
              <td>
                <v-tooltip right>
                  <template v-slot:activator="{ on }">
                    <v-icon small v-on="on">info_outline</v-icon>
                  </template>
                  <span>MediaWiki RevisionSlider extension.</span>
                </v-tooltip>
              </td>
              <td><v-icon>check_circle</v-icon></td>
              <td><v-icon>check_circle</v-icon></td>
              <td><v-icon>check_circle</v-icon></td>
              <td><v-icon>check_circle</v-icon></td>
            </tr>
            </tr>
            <tr>
              <td>
                Spam protection extensions
              </td>
              <td>
                <v-tooltip right>
                  <template v-slot:activator="{ on }">
                    <v-icon small v-on="on">info_outline</v-icon>
                  </template>
                  <span>Provided with ConfirmEdit, Nuke, TorBlock,</span>
                </v-tooltip>
              </td>
              <td><v-icon>check_circle</v-icon></td>
              <td><v-icon>check_circle</v-icon></td>
              <td><v-icon>check_circle</v-icon></td>
              <td><v-icon>check_circle</v-icon></td>
            </tr>
          </tbody>

          <thead>
            <th colspan="2">Services</th>
            <th>Free</th>
            <th>Personal</th>
            <th>Premium</th>
            <th>Pro</th>
          </thead>
          <tbody>
            <tr>
              <td>
                SPARQL Query Service & Interface
              </td>
              <td>
                <v-tooltip right>
                  <template v-slot:activator="{ on }">
                    <v-icon small v-on="on">info_outline</v-icon>
                  </template>
                  <span>The same Blazegraph based query service and user interface that runs on wikidata.org</span>
                </v-tooltip>
              </td>
              <td>Shared</td>
              <td>Shared</td>
              <td>Shared</td>
              <td>Shared</td>
            </tr>

              <tr>
                <td>
                  Elastic Search
                </td>
                <td>
                  <v-tooltip right>
                    <template v-slot:activator="{ on }">
                      <v-icon small v-on="on">info_outline</v-icon>
                    </template>
                    <span>Powering more powerfull search.</span>
                  </v-tooltip>
                </td>
                <td>Coming Soon!</td>
                <td>Coming Soon!</td>
                <td>Coming Soon!</td>
                <td>Coming Soon!</td>
              </tr>
          </tbody>

          <thead>
            <th colspan="2"/>
            <th>Free</th>
            <th>Personal</th>
            <th>Premium</th>
            <th>Pro</th>
          </thead>

        <tbody>
          <tr>
            <td>
              Monthly Subscription
            </td>
            <td>
              <v-tooltip right>
                <template v-slot:activator="{ on }">
                  <v-icon small v-on="on">info_outline</v-icon>
                </template>
                <span>Includes VAT. Can be changed at any time.</span>
              </v-tooltip>
            </td>
            <td><strong>Free</strong></td>
            <td><strong>$40</strong></td>
            <td><strong>$120</strong></td>
            <td><strong>$350</strong></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td><v-btn @click="start" color="primary" small block>Sign up</v-btn></td>
            <td><v-btn @click="start" color="primary" small block>Sign up</v-btn></td>
            <td><v-btn @click="start" color="primary" small block>Sign up</v-btn></td>
            <td><v-btn @click="start" color="primary" small block>Sign up</v-btn></td>
          </tr>
        </tbody>

        <tfoot>
        </tfoot>
        </table>
        <p class="text-center">Prices and features are still being figured out during the Alpha and may change.</p>
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
  },
  methods: {
    contactUs () {},
    start () {},
    startFree () {}
  }
}
</script>

<style scoped>

.container-less-padding {
  padding: 10px;
}

.headline{
  font-size: 30px !important;
}

.divider-side-spacing{
  margin-right: 10px;
  margin-left: 10px;
}
.divider-topbottom-spacing{
  margin-top: 10px;
  margin-bottom: 10px;
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

.text-center{ text-align: center; }

button {
    margin:0 auto;
    display:block;
}

td { text-align: center }
td:first-child { text-align: left }
td:nth-child(2) { text-align: right }
th {
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  background-color: #f5f5f5;
}

</style>
