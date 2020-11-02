<template>
    <v-content>
      <v-container class="fill-height" fluid >
        <v-row justify="center">
          <v-col cols="8">
            <h1>Privacy</h1>
            <p>Last updated: 8th May 2020</p>
            <p>We value your privacy and want to be fully transparent with what our service does and how it works. If what follows is not clear, contact us.</p>

            <h2>Information Collection And Use</h2>
            <p>While using our WBStack, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you.</p>
            <p>Personally identifiable information may include, but is not limited to your email address  ("Personal Information").</p>

            <h3>Sessions</h3>
            <p>If you are logged into an account we will store a small amount of data in your browser to identify you hen you make requests.</p>

            <h3>Log data</h3>
            <p>Like many site operators, we collect information that your browser sends whenever you visit our Site ("Log Data").</p>
            <p>This Log Data may include information such as your computer's Internet Protocol ("IP") address,
              browser type, browser version, the pages of our Site that you visit and the time and date of your visit</p>

            <h3>Communications</h3>
            <p>We may use your Personal Information to contact you with needed information such as but not limited to:</p>
            <ul>
              <li>Account confirmation emails</li>
              <li>Email verifications</li>
              <li>Account details</li>
              <li>Policy changes</li>
            </ul>

            <h2>Subprocessors</h2>
            <p>A subprocessor is a third party data processor engaged by WBStack, who has or potentially will have access to or process data.</p>
            <SubprocessorTable/>
            <p>When we bring on a new subprocessor who handles our Users' Personal Information, or remove a subprocessor, or we change how we use a subprocessor, we will update this page.</p>
          </v-col>
          <!--<v-flex xs8>-->
            <!--&lt;!&ndash; https://www.futurescaper.com/privacy-policy is a nice example &ndash;&gt;-->
            <!--<h1>Privacy</h1>-->
            <!--<p>-->
              <!--OpenCura collects some Personal Data from website visitors and Users.-->
              <!--This is our policy on what, how and why we do so.-->
            <!--</p>-->
            <!--<h2>What?</h2>-->
            <!--<h2>How?</h2>-->
            <!--<h2>Why?</h2>-->
            <!--<h2>Google Cloud</h2>-->
            <!--<p>TODO</p>-->
            <!--<h2>Mail Gun</h2>-->
            <!--<p>TODO</p>-->
            <!--<h2>reCaptcha</h2>-->
            <!--<p>-->
              <!--This site is protected by reCAPTCHA and the Google-->
              <!--<a href="https://policies.google.com/privacy">Privacy Policy</a> and-->
              <!--<a href="https://policies.google.com/terms">Terms of Service</a> apply.-->
            <!--</p>-->
          <!--</v-flex>-->
        </v-row>
      </v-container>
    </v-content>
</template>

<script>
import SubprocessorTable from '@/components/Pages/Privacy/SubprocessorTable'

export default {
  name: 'Privacy',
  components: {
    SubprocessorTable
  }
}
</script>

<style>
</style>
