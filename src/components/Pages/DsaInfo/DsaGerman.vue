<template>
  <v-main>
    <p>Deutsch</p>
    <router-link :to="{ hash: '#dsa-en' }">Go to the english version</router-link>
    <h2>DSA-Informationsseite</h2>
    <p><strong>Stand: January 2026</strong></p>
    <ol>
      <li><strong>Allgemeines</strong></li>
    </ol>
    <p>Auf dieser Seite findest du alle erforderlichen Informationen nach
      dem Digital Services Act (das heißt nach Artikel 11, Artikel 12, Artikel
      21 und Artikel 24 der <a
        href="https://eur-lex.europa.eu/legal-content/DE/TXT/PDF/?uri=CELEX:32022R2065">Verordnung
        (EU) 2022/2065</a>).</p>
    <ol>
      <li><strong>Kontaktstelle für Behörden und Nutzer</strong></li>
    </ol>
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
    <ol>
      <li><strong>Durchschnittliche monatliche Zahl der aktiven Nutzer in der
          EU</strong></li>
    </ol>
    <p>Die geschätzte durchschnittliche Anzahl monatlich aktiver Nutzer in
      der EU beträgt 20,000 Millionen, basierend auf dem Durchschnitt der
      vergangenen sechs Monate bis zum <strong>Januar 2026</strong>.</p>
    <p>Bis die EU-Kommission gemäß Art. 24 Abs. 2 und Art. 33 Abs. 3 DSGVO
      die genaue Berechnungsmethode in den delegierten Rechtsakten festlegt,
      nehmen wir die Schätzung vor, indem wir Wikibase Cloud mit Wikidata
      vergleichen, einer ähnlichen, von Wikimedia gehosteten Plattform für
      strukturierte Daten.</p>
    <p>Wir verwenden das Verhältnis der monatlich aktiven Editierenden auf
      Wikibase Cloud zu denen auf Wikidata, um die von Wikidata
      veröffentlichte Schätzung der durchschnittlichen monatlichen Anzahl von
      Empfängern (1,337,000 im August 2025-January 2026) proportional zu
      skalieren. Bei 337 monatlichen Editierenden auf Wikibase Cloud und
      25.000 auf Wikidata im Januar 2026 ergibt sich daraus eine geschätzte
      durchschnittliche Zahl von ungefähr 18.000 monatlich aktiven Nutzern in
      der EU für Wikibase Cloud.</p>
    <ol>
      <li><strong>Außergerichtliche Streitbeilegungsstelle</strong></li>
    </ol>
    <p>Zur Beilegung von Streitigkeiten im Zusammenhang von uns getroffenen
      Entscheidungen bei der Moderation von Inhalten können Nutzer in der EU
      sechs Monate nachdem sie von unserer Entscheidung in Kenntnis gesetzt
      wurden, Beschwerde einreichen <a href="mailto:dsa-meldung@wikimedia.de">dsa-meldung@wikimedia.de</a>.</p>
    <p>Im Übrigen können EU-Nutzer zur Beilegung von Streitigkeiten im
      Zusammenhang von uns getroffenen Entscheidungen bei der Moderation von
      Inhalten gemäß Artikel 21 des DSA auch eine zertifizierte
      außergerichtliche Streitbeilegungsstelle wählen. Die EU-Kommission
      verfügt zu diesem Zweck über eine Liste außergerichtlicher
      Streitbeilegungsstellen, die du <a
        href="https://digital-strategy.ec.europa.eu/en/policies/dsa-out-court-dispute-settlement">hier</a>
      findest.</p>
    <ol>
      <li><strong>Transparenzbericht</strong></li>
    </ol>
    <p>Gemäß den Vorgaben von Artikel 15 des DSA veröffentlicht Wikimedia
      Deutschland e.V. einen jährlichen Transparenzbericht auf dieser
      Seite.</p>

  </v-main>
</template>

<script>
export default {
  name: 'DsaGerman',
  computed: {},
}
</script>

<style scoped></style>
