<template>
  <v-data-table
    :headers="headers"
    :items="items"
    hide-actions
    class="elevation-1"
  ></v-data-table>
</template>

<script>
export default {
  name: 'SubprocessorTable',
  data () {
    return {
      headers: [
        {
          text: 'Name of Subprocessor',
          sortable: false,
          value: 'name'
        },
        {
          text: 'Description of Processing',
          sortable: false,
          value: 'description'
        },
        {
          text: 'Location of Processing',
          sortable: true,
          value: 'location'
        }
      ],
      items: [
        {
          name: 'Google Cloud',
          description: 'Data & Service hosting',
          location: 'United States'
        },
        {
          name: 'Mailgun',
          description: 'Mail service provider',
          location: 'United States'
        },
        {
          name: 'Recaptcha',
          description: 'Authentication captcha provider',
          location: 'United States'
        },
        {
          name: 'Wikimedia Germany',
          description: 'Collaboration around Wikibase development',
          location: 'Germany'
        }
      ]
    }
  }
}
</script>

<style>
  .v-data-footer {
    display:none;
  }
</style>
