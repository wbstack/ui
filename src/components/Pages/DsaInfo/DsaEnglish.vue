<template>
  <v-row justify="center">
    <v-col cols="11" md="4" order-md="last">
      <div class="px-6 py-4">
        <router-link :to="{ hash: '#dsa-de' }" class="text-decoration-none">Zur deutschen Fassung</router-link>
      </div>

      <v-expansion-panels v-bind:value="$vuetify.breakpoint.mdAndUp ? 0 : null">
        <v-expansion-panel>
          <v-expansion-panel-header>
            Contents
          </v-expansion-panel-header>

          <v-expansion-panel-content>
            <v-list class="wrap">
              <v-list-item>
                <v-list-item-content>
                  <router-link :to="{ hash: '#dsa-en-one' }" class="text-decoration-none">
                    <v-list-item-title>1. General</v-list-item-title>
                  </router-link>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <router-link :to="{ hash: '#dsa-en-two' }" class="text-decoration-none">
                    <v-list-item-title>2. Contact point for authorities and users</v-list-item-title>
                  </router-link>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <router-link :to="{ hash: '#dsa-en-three' }" class="text-decoration-none">
                    <v-list-item-title>3. Average monthly number of active users in the EU</v-list-item-title>
                  </router-link>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <router-link :to="{ hash: '#dsa-en-four' }" class="text-decoration-none">
                    <v-list-item-title>4. Out-of-court dispute resolution body</v-list-item-title>
                  </router-link>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <router-link :to="{ hash: '#dsa-en-five' }" class="text-decoration-none">
                    <v-list-item-title>5. Transparency report</v-list-item-title>
                  </router-link>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-col>

    <v-col cols="11" md="8">
      <p class="text-h6 font-weight-regular">English</p>
      <p>The Digital Services Act (DSA) is an EU regulation that entered into force in 2022, establishing a
        comprehensive framework for digital services accountability, content moderation, and platform transparency
        across the European Union.
        It significantly updates the Electronic Commerce Directive 2000 in EU law by introducing graduated obligations
        based on service size and risk levels, and was proposed alongside the Digital Markets Act (DMA).
        You can read more about DSA <a href="https://en.wikipedia.org/wiki/Digital_Services_Act" class="external"
          target="_blank">here<v-icon small color="primary" class="pl-1 pb-2"> mdi-open-in-new</v-icon></a>.
      </p>

      <v-divider class="my-6" />

      <p class="font-weight-light">Last updated: January 2026</p>
      <h3 id="dsa-en-one" class="font-weight-regular my-2">1. General</h3>
      <p>On this page, you will find all the information required under the
        Digital Services Act (i.e., Articles 11, 12, 21, and 24 of <a
          href="https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=celex:32022R2065" target="_blank">Regulation
          (EU) 2022/2065)<v-icon small color="primary" class="pl-1 pb-2">mdi-open-in-new</v-icon></a>.</p>

      <h3 id="dsa-en-two" class="font-weight-regular my-2">2. Contact point for authorities and users</h3>
      <p>To contact us in accordance with Article 11 DSA for authorities of EU
        member states, the European Commission, and the European Board, please
        send a message to our central contact point here <a
          href="mailto:dsa-meldung@wikimedia.de">dsa-meldung@wikimedia.de</a>. We
        will send you a confirmation. Contact will be made by email in English
        or German.</p>
      <p>To contact us in accordance with Article 12 DSA, users can send their
        DSA-related inquiries to our central contact point here <a
          href="mailto:dsa-meldung@wikimedia.de">dsa-meldung@wikimedia.de</a> or
        via telephone (+49 (0)30-577 11 62-0).</p>
      <p>Information on the processing of personal data is provided in our <router-link to="/privacy-policy">Privacy
          Policy</router-link>. By
        contacting us, you confirm that you have taken note of this
        information.</p>

      <h3 id="dsa-en-three" class="font-weight-regular my-2">3. Average monthly number of active users in the
        EU</h3>
      <p>The estimated average number of monthly active users in the EU is
        18,000, based on the average of the previous six months up to
        <strong>January 2026</strong>.
      </p>
      <p>Until the EU Commission specifies the exact calculation method in
        delegated acts in accordance with Art. 24 (2) and Art. 33 (3) GDPR, we
        make the estimation by comparing Wikibase Cloud with Wikidata, a similar
        Wikimedia-hosted structured data platform.</p>
      <p>We use the ratio of monthly active editors on Wikibase Cloud to those
        on Wikidata to proportionally scale <a
          href="https://foundation.wikimedia.org/wiki/Legal:EU_DSA_Userbase_Statistics#Average_monthly_active_recipients_of_the_service,_in_the_EU_region,_over_the_prior_6_months"
          target="_blank">Wikidata’s
          published estimate<v-icon small color="primary" class="pl-1 pb-2">mdi-open-in-new</v-icon></a> of average
        monthly recipients
        (1,337,000 in Aug
        2025-Jan 2026). With 337 monthly editors on Wikibase Cloud and 25,000 on
        Wikidata in January 2026, this results in an estimated average of
        approximately 18,000 monthly active users in the EU for Wikibase
        Cloud.</p>

      <h3 id="dsa-en-four" class="font-weight-regular my-2">4. Out-of-court dispute resolution body</h3>
      <p>To resolve disputes relating to decisions we have made in the
        moderation of content, users in the EU can lodge a complaint six months
        after being notified of our decision <a href="mailto:dsa-meldung@wikimedia.de">dsa-meldung@wikimedia.de</a>
        .</p>
      <p>In addition, EU users may also choose a certified out-of-court
        dispute resolution body to resolve disputes relating to decisions we
        have made in the context of content moderation in accordance with
        Article 21 of the DSA. The EU Commission has a list of out-of-court
        dispute resolution bodies for this purpose, which you can find <a
          href="https://digital-strategy.ec.europa.eu/en/policies/dsa-out-court-dispute-settlement"
          target="_blank">here<v-icon small color="primary" class="pl-1 pb-2">mdi-open-in-new</v-icon></a>.</p>

      <h3 id="dsa-en-five" class="font-weight-regular my-2">5. Transparency report</h3>
      <p>In accordance with the provisions of Article 15 of the DSA, Wikimedia
        Deutschland e.V. publishes an annual transparency report on this
        page.</p>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'DsaEnglish',
  computed: {},
}
</script>

<style scoped></style>
