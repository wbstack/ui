<template>
    <v-main>
      <v-container class="fill-height" fluid >
        <v-row justify="center">
          <v-col cols="8">
            <h1>Privacy</h1>
            <p>Last updated: 26th March 2021</p>
            <p>We value your privacy and want to be fully transparent with what our service does and how it works. If what follows is not clear, contact us.</p>

            <h2>Information Collection And Use</h2>
            <p>While using WBStack, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you.</p>
            <p>Personally identifiable information may include, but is not limited to your email address ("Personal Information").</p>

            <h3>Sessions</h3>
            <p>If you are logged into an account we will store a small amount of data in your browser to identify you when you make requests.</p>

            <h3>Log data</h3>
            <p>Like many site operators, we collect information that your browser sends whenever you visit WBStack or a WBStack site ("Log Data").</p>
            <p>This Log Data may include information such as your computer's Internet Protocol ("IP") address,
              browser type, browser version, the pages of WBStack sites that you visit and the time and date of your visit.</p>

            <h3>Communications</h3>
            <p>We may use your Personal Information to contact you with needed information such as but not limited to:</p>
            <ul>
              <li>Account confirmation emails</li>
              <li>Email verifications</li>
              <li>Account details</li>
              <li>Policy changes</li>
              <li>Feedback requests</li>
            </ul>

            <h2>Subprocessors</h2>
            <p>A subprocessor is a third party data processor engaged by WBStack, who has or potentially will have access to or process certain data.</p>
            <SubprocessorTable/>
            <p>When we bring on a new subprocessor who handles our Users' Personal Information, or remove a subprocessor, or we change how we use a subprocessor, we will update this page.</p>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
</template>

<script>
import SubprocessorTable from '~/components/Pages/Privacy/SubprocessorTable'

export default {
  name: 'Privacy',
  components: {
    SubprocessorTable
  }
}
</script>

<style>
</style>
