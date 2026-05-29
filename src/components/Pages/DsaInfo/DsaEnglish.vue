<template>
  <v-main>
    <p>English</p>
    <router-link :to="{ hash: '#dsa-de' }">Zur deutschen Fassung</router-link>

    <h2 id="dsa-en">DSA Information Page</h2>
    <p><strong>Last updated: January 2026</strong></p>
    <p>1. <strong>General</strong></p>
    <p>On this page, you will find all the information required under the
      Digital Services Act (i.e., Articles 11, 12, 21, and 24 of <a
        href="https://eur-lex.europa.eu/legal-content/de/txt/pdf/?uri=celex:32022r2065">Regulation
        (EU) 2022/2065</a>).</p>
    <p>2. <strong>Contact point for authorities and users</strong></p>
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
    <p>Information on the processing of personal data is provided in our <a
        href="https://www.wikibase.cloud/privacy-policy">privacy policy</a>. By
      contacting us, you confirm that you have taken note of this
      information.</p>
    <p>3. <strong>Average monthly number of active users in the
        EU</strong></p>
    <p>The estimated average number of monthly active users in the EU is
      20,000, based on the average of the previous six months up to
      <strong>January 2026</strong>.
    </p>
    <p>Until the EU Commission specifies the exact calculation method in
      delegated acts in accordance with Art. 24 (2) and Art. 33 (3) GDPR, we
      make the estimation by comparing Wikibase Cloud with Wikidata, a similar
      Wikimedia-hosted structured data platform.</p>
    <p>We use the ratio of monthly active editors on Wikibase Cloud to those
      on Wikidata to proportionally scale <a
        href="https://foundation.wikimedia.org/wiki/Legal:EU_DSA_Userbase_Statistics#Average_monthly_active_recipients_of_the_service,_in_the_EU_region,_over_the_prior_6_months">Wikidata’s
        published estimate</a> of average monthly recipients (1,337,000 in Aug
      2025-Jan 2026). With 337 monthly editors on Wikibase Cloud and 25,000 on
      Wikidata in January 2026, this results in an estimated average of
      approximately 18,000 monthly active users in the EU for Wikibase
      Cloud.</p>
    <p>4. <strong>Out-of-court dispute resolution body</strong></p>
    <p>To resolve disputes relating to decisions we have made in the
      moderation of content, users in the EU can lodge a complaint six months
      after being notified of our decision <a href="mailto:dsa-meldung@wikimedia.de">dsa-meldung@wikimedia.de</a>
      .</p>
    <p>In addition, EU users may also choose a certified out-of-court
      dispute resolution body to resolve disputes relating to decisions we
      have made in the context of content moderation in accordance with
      Article 21 of the DSA. The EU Commission has a list of out-of-court
      dispute resolution bodies for this purpose, which you can find <a
        href="https://digital-strategy.ec.europa.eu/en/policies/dsa-out-court-dispute-settlement">her</a>e.</p>
    <p>5. <strong>Transparency report</strong></p>
    <p>In accordance with the provisions of Article 15 of the DSA, Wikimedia
      Deutschland e.V. publishes an annual transparency report on this
      page.</p>

  </v-main>
</template>

<script>
export default {
  name: 'DsaEnglish',
  computed: {},
}
</script>

<style scoped></style>
