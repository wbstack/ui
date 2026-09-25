<template>
    <v-card>
        <v-card-title>Your Submission</v-card-title>
        <v-card-text></v-card-text>
        <v-list outlined>

            <v-list-item two-line>
                <v-list-item-content>
                    <v-list-item-title><v-chip>Submitted</v-chip> Submitted {{(new Date(submittedDate)).toISOString().substring(0,10)}} </v-list-item-title>
                    <v-list-item-subtitle>Your instance will stay online while we are reviewing your submission. We will contact you about the outcome. </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-card>
</template>

<script>
export default {
  name: 'ReviewsView',
  props: [
    'submittedDate', // Likely in future this will be a list of submissions
    // This is very much cutting a corner and when we allow people to submit addtional reviews this component will need to accept and render multiple submissions.
  ],
}
</script>
