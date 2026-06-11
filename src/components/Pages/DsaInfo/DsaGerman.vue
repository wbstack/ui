<template>
  <v-row justify="center">
    <v-col cols="11" md="4" order-md="last">
      <div class="px-6 py-4">
        <router-link :to="{ hash: '#dsa-en' }" class="text-decoration-none">Go to the English version</router-link>
      </div>

      <v-expansion-panels v-bind:value="$vuetify.breakpoint.mdAndUp ? 0 : null">
        <v-expansion-panel>
          <v-expansion-panel-header>
            Inhalte
          </v-expansion-panel-header>

          <v-expansion-panel-content>
            <v-list class="wrap">
              <v-list-item>
                <v-list-item-content>
                  <router-link :to="{ hash: '#dsa-de-one' }" class="text-decoration-none">
                    <v-list-item-title>1. Allgemeines</v-list-item-title>
                  </router-link>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <router-link :to="{ hash: '#dsa-de-two' }" class="text-decoration-none">
                    <v-list-item-title>2. Kontaktstelle für Behörden und
                      Nutzer</v-list-item-title>
                  </router-link>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <router-link :to="{ hash: '#dsa-de-three' }" class="text-decoration-none">
                    <v-list-item-title>3. Durchschnittliche monatliche
                      Zahl der aktiven Nutzer in der EU</v-list-item-title>
                  </router-link>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <router-link :to="{ hash: '#dsa-de-four' }" class="text-decoration-none">
                    <v-list-item-title>4. Außergerichtliche
                      Streitbeilegungsstelle</v-list-item-title>
                  </router-link>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <router-link :to="{ hash: '#dsa-de-five' }" class="text-decoration-none">
                    <v-list-item-title>5. Transparenzbericht</v-list-item-title>
                  </router-link>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-col>

    <v-col cols="11" md="8">
      <p class="text-h6 font-weight-regular">Deutsch</p>

      <p>Der Digital Services Act (DSA) ist eine EU-Verordnung, die 2022 in Kraft getreten ist und einen umfassenden
        Rahmen für die Rechenschaftspflicht digitaler Dienste,
        die Moderation von Inhalten und die Transparenz von Plattformen in der gesamten Europäischen Union schafft. Er
        aktualisiert die Richtlinie über den elektronischen Geschäftsverkehr
        aus dem Jahr 2000 im EU-Recht erheblich, indem er abgestufte Verpflichtungen je nach Größe des Dienstes und
        Risikostufe einführt, und wurde zusammen mit dem Digital Markets Act (DMA) vorgeschlagen.
        Weitere Informationen zum DSA finden Sie <a
          href="https://de.wikipedia.org/wiki/Gesetz_%C3%BCber_digitale_Dienste" target="_blank">hier<v-icon small
            color="primary" class="pl-1 pb-2">mdi-open-in-new</v-icon></a>.</p>

      <v-divider class="my-6" />

      <p class="font-weight-light">Stand: Januar 2026</p>

      <h3 id="dsa-de-one" class="font-weight-regular my-2">1. Allgemeines</h3>
      <p>Auf dieser Seite finden Sie alle erforderlichen Informationen nach
        dem Digital Services Act (das heißt nach Artikel 11, Artikel 12, Artikel
        21 und Artikel 24 der <a href="https://eur-lex.europa.eu/legal-content/DE/TXT/PDF/?uri=CELEX:32022R2065"
          target="_blank">Verordnung
          (EU) 2022/2065<v-icon small color="primary" class="pl-1 pb-2">mdi-open-in-new</v-icon></a>).</p>

      <h3 id="dsa-de-two" class="font-weight-regular my-2">2. Kontaktstelle für Behörden und Nutzer</h3>
      <p>Zur Kontaktaufnahme nach Art. 11 DSA für Behörden von
        EU-Mitgliedstaaten, der Europäischen Kommission und das Europäische
        Gremium kann eine Mitteilung an unsere zentrale Kontaktstelle hier <a
          href="mailto:dsa-meldung@wikimedia.de">dsa-meldung@wikimedia.de</a>
        gerichtet werden. Wir übermitteln eine Eingangsbestätigung. Der Kontakt
        findet per E-Mail in englischer oder deutscher Sprache statt.</p>
      <p>Zur Kontaktaufnahme nach Artikel 12 DSA können Nutzer ihre Anfragen
        im Zusammenhang mit dem DSA an unsere zentrale Kontaktstelle hier <a
          href="mailto:dsa-meldung@wikimedia.de">dsa-meldung@wikimedia.de</a> oder
        per Telefon unter der (+49 (0)30-577 11 62-0) richten.</p>
      <p>Informationen zur Verarbeitung personenbezogener Daten sind in
        unserer <a href="https://www.wikibase.cloud/privacy-policy">Datenschutzerklärung</a>
        aufgeführt. Mit der Kontaktaufnahme wird bestätigt, die Informationen
        zur Kenntnis genommen zu haben.</p>

      <h3 id="dsa-de-three" class="font-weight-regular my-2">3. Durchschnittliche monatliche Zahl der aktiven Nutzer in
        der EU</h3>
      <p>Die geschätzte durchschnittliche Anzahl monatlich aktiver Nutzer in
        der EU beträgt 18.000, basierend auf dem Durchschnitt der
        vergangenen sechs Monate bis zum <strong>Januar 2026</strong>.</p>
      <p>Bis die EU-Kommission gemäß Art. 24 Abs. 2 und Art. 33 Abs. 3 DSGVO
        die genaue Berechnungsmethode in den delegierten Rechtsakten festlegt,
        nehmen wir die Schätzung vor, indem wir Wikibase Cloud mit Wikidata
        vergleichen, einer ähnlichen, von Wikimedia gehosteten Plattform für
        strukturierte Daten.</p>
      <p>Wir verwenden das Verhältnis der monatlich aktiven Editierenden auf
        Wikibase Cloud zu denen auf Wikidata, um die von Wikidata
        veröffentlichte Schätzung der durchschnittlichen monatlichen Anzahl von
        Empfängern (1,337,000 im August 2025-Januar 2026) proportional zu
        skalieren. Bei 337 monatlichen Editierenden auf Wikibase Cloud und
        25.000 auf Wikidata im Januar 2026 ergibt sich daraus eine geschätzte
        durchschnittliche Zahl von ungefähr 18.000 monatlich aktiven Nutzern in
        der EU für Wikibase Cloud.</p>

      <h3 id="dsa-de-four" class="font-weight-regular my-2">4. Außergerichtliche Streitbeilegungsstelle</h3>
      <p>Zur Beilegung von Streitigkeiten im Zusammenhang von uns getroffenen
        Entscheidungen bei der Moderation von Inhalten können Nutzer in der EU
        sechs Monate nachdem sie von unserer Entscheidung in Kenntnis gesetzt
        wurden, Beschwerde einreichen <a href="mailto:dsa-meldung@wikimedia.de">dsa-meldung@wikimedia.de</a>.</p>
      <p>Im Übrigen können EU-Nutzer zur Beilegung von Streitigkeiten im
        Zusammenhang von uns getroffenen Entscheidungen bei der Moderation von
        Inhalten gemäß Artikel 21 des DSA auch eine zertifizierte
        außergerichtliche Streitbeilegungsstelle wählen. Die EU-Kommission
        verfügt zu diesem Zweck über eine Liste außergerichtlicher
        Streitbeilegungsstellen, die Sie <a
          href="https://digital-strategy.ec.europa.eu/de/policies/dsa-out-court-dispute-settlement"
          target="_blank">hier<v-icon small color="primary" class="pl-1 pb-2">mdi-open-in-new</v-icon></a>
        finden.</p>

      <h3 id="dsa-de-five" class="font-weight-regular my-2">5. Transparenzbericht</h3>
      <p>Gemäß den Vorgaben von Artikel 15 des DSA veröffentlicht Wikimedia
        Deutschland e.V. einen jährlichen Transparenzbericht auf dieser
        Seite.</p>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'DsaGerman',
  computed: {},
}
</script>

<style scoped></style>
