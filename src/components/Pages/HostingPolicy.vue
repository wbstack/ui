<template>
  <v-main>
    <v-container class="fill-height" fluid>
      <v-row justify="center">
        <v-col cols="8" class="policy-content text-body-1">
          <h1 id="hosting-policy-for-wikibase-cloud" class="mb-7">Hosting Policy for Wikibase Cloud (pilot version)</h1>
          <h2  id="purpose-and-scope" class="mb-3">1. Purpose and Scope</h2>
          <p>This policy defines Wikimedia Deutschland’s (WMDE) expectations and criteria for hosting on Wikibase Cloud. It explains what kinds of datasets and use cases are supported by WMDE and how those decisions are made and implemented.</p>
          <p>The policy exists to ensure that Wikibase Cloud technical and financial resources, as well as staff capacity are used responsibly, intentionally, in alignment with WMDE’s mission. Wikibase Cloud is not intended to be a generic free hosting service for any purpose. The policy helps us maintain visibility into how the platform is used and provides a framework to support and encourage use cases aligned with the role we want Wikibase Cloud to play in the Wikibase Ecosystem, and to address cases that clearly fall outside that role.</p>
          <h3 id="target-audience" class="mb-3 mt-6">1.1 Target Audience</h3>
          <ul class="mb-4">
            <li>Primary audience: the <a class="font-weight-bold font-italic" href="#review-committee">Review Committee</a> responsible for reviewing and approving Wikibase Cloud hosting requests for continued use. The policy provides a shared framework for making consistent, transparent decisions grounded in mission alignment, resource realities, and inclusivity goals.</li>
            <li>Secondary audience: <span class="font-weight-bold">Wikibase Cloud's current and prospective users</span>, who can use this document to understand the reasoning behind WMDE’s hosting criteria and to self-assess whether their use case is likely to be accepted.</li>
          </ul>
          <h3 id="relationship-to-other-governance-documents" class="mb-3">1.2 Relationship to other governance documents</h3>
          <p class="font-italic">(These relationships matter to ensure hosting criteria remain coherent with other governance documents, prevent contradictory expectations for contributors, and avoid overlap between responsibilities of WMDE, WMF, and individual communities.)</p>
          <ul class="mb-4">
            <li>This policy complements the <a class="font-weight-bold" href="/terms-of-use">Wikibase Cloud Terms of Use</a>, which define the legal and compliance conditions for using the platform.</li>
            <li><span class="font-weight-bold">Local policies</span> set by individual communities for their Cloud instances are out of scope for this document; they can operate independently, but within the boundaries defined here.</li>
            <li>
              In a broader context of the Wikibase ecosystem, it also complements:
              <ul>
                <li><span class="font-weight-bold">Wikidata policies</span>, such as the <a href="https://www.wikidata.org/wiki/Wikidata:Notability" target="_blank">Notability Policy</a>, the emerging <a href="https://www.wikidata.org/wiki/Wikidata:Requests_for_comment/Mass-editing_policy" target="_blank">Mass Editing Policy</a>, <a href="https://www.wikidata.org/wiki/Wikidata:Living_people" target="_blank">Living People Policy</a> which govern activity on Wikidata (as decided by the Wikidata community),</li>
                <li><a href="https://foundation.wikimedia.org/wiki/Policy:Terms_of_Use" target="_blank">WMF Terms of Use</a> and the <a href="https://foundation.wikimedia.org/wiki/Resolution:Biographies_of_living_people" target="_blank">board resolution about biographies of living people</a> (as set by WMF in its role as the platform operator).</li>
              </ul>
            </li>
          </ul>
          <p>References to Wikidata policies are included for context only. Wikidata’s content policies, including notability criteria, <span class="font-weight-bold">do not apply</span> to Wikibase Cloud instances. Wikibase Cloud exists specifically to support use cases that may not fit Wikidata’s scope, including non-notable, domain-specific, or preparatory datasets, while still aligning with the broader Wikimedia mission.</p>
          <h3 id="what-this-policy-is-not" class="mb-3">1.3 What This Policy is Not</h3>
          <ul>
            <li>The policy defines WMDE’s own hosting criteria as the platform operator. It does not replace the policies of individual communities running their instances on Wikibase Cloud.</li>
            <li>It does not describe the technical capabilities of Wikibase as a software or Wikibase Cloud as a platform.</li>
          </ul>
          <h2 id="principles" class="mt-7 mb-3">2. Principles</h2>
          <p>The following principles guide WMDE’s decisions about what can be hosted on Wikibase Cloud. They reflect WMDE’s mission, resource limitations and responsibilities as the platform operator, as well as Wikibase Cloud's intended role in the Wikibase Ecosystem.</p>
          <p class="font-weight-bold">Mission alignment</p>
          <p>Wikibase Cloud prioritizes use cases that contribute to the creation, preservation, or sharing of open knowledge in ways that align with the <a href="https://www.wikimedia.de/ueber-uns/der-verein/satzung-ordnungen-und-beschluesse/" target="_blank">WMDE statutes</a> and support <a href="https://wikimediafoundation.org/who-we-are/mission/" target="_blank">Wikimedia’s mission</a> and the public good.</p>
          <p class="font-weight-bold">Wikibase Cloud's intended role: Lowering barriers to participation and experimentation</p>
          <p>Wikibase Cloud exists to reduce barriers for people who want to work with structured data using Wikibase, especially those who cannot self‑host. It supports:</p>
          <ul class="mb-4">
            <li>people sharing free and open knowledge with the world for access, reuse and contribution to the Wikimedia projects,</li>
            <li>people preparing and shaping knowledge for contribution to the other parts of the Wikibase Ecosystem (for example, to Wikidata) in an isolated environment,</li>
            <li>people teaching Wikibase as a software,</li>
            <li>people evaluating, learning, or experimenting with Wikibase in an isolated environment at the start of their Wikibase journey.</li>
          </ul>
          <p><span class="font-weight-bold">We will support this role of Wikibase Cloud</span> by ensuring that:</p>
          <ul class="mb-4">
            <li>the longer-term use cases aligned with it have increased chances of staying hosted,</li>
            <li>the short-term use cases aligned with it can happen easily without additional procedural or bureaucratic overhead.</li>
          </ul>
          <p class="font-weight-bold">Inclusivity and support for underrepresented knowledge</p>
          <p>Supporting knowledge equity is an explicit priority and expected outcome of lowering barriers. Wikibase Cloud welcomes and supports datasets that represent marginalized or underrepresented knowledge domains and use cases, unless they pose risks to platform stability.</p>
          <p class="font-weight-bold">Non-disruptive use</p>
          <p>Wikibase Cloud operates on finite infrastructure and limited staff capacity. Hosting decisions must account for long‑term sustainability, including technical load, operational effort, and cost. Wikibase instances that would jeopardize platform stability or disproportionately consume resources may be limited or declined.</p>
          <h2 id="hosting-criteria" class="mt-7 mb-3">3. Hosting Criteria</h2>
          <p>Wikibase Cloud hosting decisions are based on distinct types of criteria, each serving a different purpose in the evaluation process.</p>
          <p>Members of the <a class="font-italic" href="#review-committee">Review Committee</a> will independently assess these criteria. To ensure decisions are fair, consistent, and repeatable, each member reviews the application individually and documents the results with respect to each criterion. These assessments are then compared and discussed to reach a shared decision.</p>
          <p><span class="font-weight-bold">If information is insufficient to evaluate an instance,</span> the reviewers request clarification before making a final decision.</p>
          <p><span class="font-weight-bold">If after discussion the committee cannot reach a shared decision,</span> this indicates that certain criteria are not defined clearly enough. In such cases, the Review Committee will initiate clarification of the hosting policy before proceeding.</p>
          <h3 id="prerequisites" class="mb-3">3.1 Prerequisites</h3>
          <p>The following conditions must be satisfied before an instance can be hosted on Wikibase Cloud. These conditions are non-negotiable and cannot be offset by positive signals.</p>
          <h4 id="required-conditions" class="d-flex align-center mb-3"><v-icon class="mr-1" color="green">mdi-circle</v-icon> Required Conditions (must be true)</h4>
          <p>These conditions must be met for an instance to be eligible for hosting.</p>
          <ul>
            <li>All fields of the <a class="font-italic" href="#wiki-profile">Wiki Profile</a> are complete, providing sufficient detail for the Review Committee to evaluate the intended use.</li>
            <li>The instance's observed use matches the description in the Wiki Profile.</li>
            <li>The main page or the "About the wiki" page have sufficient information describing the intended use of the instance for potential visitors of the instance.</li>
            <li>The licensing statement is visible in the footer. <span class="yellow lighten-4 px-1">Workflows enabling this will be implemented before enforcement of the policy and clear instructions will be documented.</span></li>
            <li>The structured data is in the public domain or released under CC-0.</li>
            <li>The license for the text in other namespaces allows commercial and non-commercial use and derivatives (we recommend using the conformant licenses <a href="https://opendefinition.org/licenses/">from this list</a>).</li>
          </ul>
          <h4 id="disqualifying-conditions" class="d-flex align-center mt-4 mb-3"><v-icon class="mr-1" color="red">mdi-circle</v-icon> Disqualifying Conditions (must not be true)</h4>
          <p>If any of the following conditions apply, the instance cannot be hosted.</p>
          <ul class="mb-4">
            <li>Any indication that the dataset or behaviour may violate or already violates the <a href="/terms-of-use">Terms of Use</a> (e.g., copyright violations, prohibited content, abusive behavior, harassment, privacy violations). <v-icon color="orange">mdi-alert</v-icon> Violations of the Terms of Use are governed exclusively by the Terms of Use and are not subject to the procedures described in this policy.</li>
            <li>Misinformation, disinformation, or impersonation.</li>
            <li>Primarily commercial or promotional purpose (for example, e-Commerce databases, a dataset for SEO optimization).</li>
            <li>The instance manager is unreachable or unresponsive for over 3 months.</li>
            <li>The instance manager failed to confirm either their intention to take further care of the instance, or agreement to pass it over to another manager with Terms of Use-based responsibility.</li>
            <li>The instance contains (or is intended to contain) <a href="https://foundation.wikimedia.org/wiki/Resolution:Biographies%20of%20living%20people" target="_blank">data about living people</a>  and other sensitive topics without appropriate local rules and processes to handle the content responsibly and ensure respectful collaboration.</li>
            <li>The observed dataset size, traffic patterns, or write/read load are abusive and unjustified.</li>
            <li>The intended or observed dataset size or load exceeds the technical capacity that Wikibase Cloud can realistically support. For example, the hosting of this dataset would require significant technical changes or infrastructure expansion, and WMDE determines that such effort is not justified for this use case.</li>
          </ul>
          <div>
            <v-alert color="info" text >
              <p id="assessing-size-and-load"><span class="font-weight-bold">Assessment of size and load</span></p>
              <p>Wikibase Cloud does not operate with fixed numerical limits for dataset size or traffic at this stage. Decisions about size and load will be made empirically, based on observed platform behavior and past incidents. When an instance creates significant strain on the infrastructure, the situation will be investigated, discussed with the instance manager and documented in a public log together with the decision taken.</p>
              <p>If a high-load use case is meaningful, the Review Committee may assess whether technical improvements and the effort to make them are reasonable. If they are, the use case will only produce a <a class="font-italic" href="#concerning-signals">Concerning Signal</a>.</p>
              <p>Over time, documented cases will inform future decisions, creating a growing body of precedent. In all cases, instance managers will be contacted and involved in finding a reasonable solution before further action is taken.</p>
            </v-alert>
          </div>
          <h3 id="concerning-signals" class="d-flex align-center mb-3"><v-icon class="mr-1" color="black">mdi-minus-thick</v-icon>3.2 Concerning Signals</h3>
          <p>These signals indicate potential risk or misalignment. They do not automatically lead to rejection, but must be counterbalanced by positive signals.</p>
          <div>
            <v-alert colored-border type="warning" border="left" elevation="2" prominent>
              <ul>
                <li><span class="font-weight-bold">2 concerning signals</span> lead to disqualification.</li>
                <li><span class="font-weight-bold">1 concerning signal</span> must be counterbalanced with 2 positive signals.</li>
              </ul>
            </v-alert>
          </div>
          <ul class="mb-4">
            <li>
              The dataset is only intended to be used by the contributing individual or organization with no clear external audience (people or groups who meaningfully benefit from accessing or reusing this data), including use cases that support purely internal workflows, private organisational processes, or personal documentation, like internal CRM systems, business asset management. <br />The <span class="text-decoration-underline">exceptions</span> that do not produce this concerning signal are:
              <ul>
                <li>The instance is a staging ground for a dataset being prepared for later contribution to the other parts of the Wikibase Ecosystem (for example, to Wikidata)</li>
                <li>The instance supports teaching Wikibase as a software</li>
                <li>The instance is used to build and test tools for Wikidata or Wikibase</li>
              </ul>
            </li>
            <li>The intended or observed dataset size or read/write load exceeds or approaches excess of current sustainable limits, or the instance exhibits sudden or disproportionate spikes in traffic that strain infrastructure. WMDE decides that allocating additional technical effort to support the use case in the future is justified (see the explanation of how the assessment of size and load happens <a href="#assessing-size-and-load">above</a>).</li>
            <li>Used purely as a MediaWiki, no structured data involved</li>
            <li>Data infested with spammers and other vandalism</li>
          </ul>
          <h3 id="positive-signals" class="d-flex align-center mb-3"><v-icon class="mr-1" color="black">mdi-plus-thick</v-icon>3.3 Positive Signals</h3>
          <p>These signals indicate alignment with the value proposition of Wikibase Cloud and provide a chance for instances that raised concerning signals to recover from them and stay hosted.</p>
          <ul>
            <li>The instance advances knowledge equity or representation of marginalized or underrepresented knowledge domains and use cases (this one produces <span class="font-weight-bold">2 positive signals</span>).</li>
            <li>The instance contributes to education, cultural preservation, research or public benefit.</li>
            <li>The contributing individual, organization or community has limited technical skills, hosting capacity or financial resources to run and maintain a self-hosted Wikibase.</li>
            <li>Despite the current access to skills and resources to self-host, their existence in the future is uncertain. The project can only realistically proceed and survive because Wikibase Cloud removes financial, technical, or infrastructural barriers in the long-term.</li>
          </ul>
          <h2 id="decision-process" class="mt-7 mb-3">4. Decision Process</h2>
          <p><i><a href="https://commons.wikimedia.org/wiki/File:Wikibase_Cloud_Hosting_Decisions_Process_v0.1.png" target="_blank">See a visual overview of the process for reference</a></i></p>
          <h3 id="temporary-by-default-rule" class="mb-3">4.1 Temporary-by-Default Rule</h3>
          <p>Once these policies come into force, all instances on Wikibase Cloud will be <span class="font-weight-bold">temporary by default</span>. This ensures people can experiment with Wikibase or Cloud’s capabilities — a core part of the platform's value proposition — without needing to go through a full application process.</p>
          <p>To remain hosted on Cloud permanently, instance managers must submit an application. Temporary instances that never applied for prolonged or permanent hosting get suspended after 3 months.</p>
          <p>The following process outlines how decisions are made for initial acceptance and continued hosting.</p>
          <h3 id="application" class="mb-3">4.2 Application</h3>
          <p>When applicants request long‑term or permanent hosting on Wikibase Cloud, they will be required to:</p>
          <ul class="mb-4">
            <li>provide information about their use case (see <a class="font-italic" href="#wiki-profile">Wiki Profile</a>);</li>
            <li>take steps to meet the <a class="font-italic" href="#hosting-criteria">Hosting Criteria</a>.</li>
          </ul>
          <h3 id="review" class="mb-3">4.3 Review</h3>
          <ul class="mb-4">
            <li>The <a class="font-italic" href="#review-committee">Review Committee</a>  reviews new applications on an ongoing basis, subject to the availability of its members.</li>
            <li>Each reviewer evaluates the use case independently against the <a class="font-italic" href="#hosting-criteria">Hosting Criteria</a>, noting the situations where essential information is missing or unclear.</li>
            <li>
              Reviewers compare their evaluation and decide on the next steps.
              <ul>
                <li>If essential information is missing or unclear, reviewers request clarification from the applicant.</li>
                <li>Applicants may be asked to make adjustments before the review can continue.</li>
              </ul>
            </li>
            <li>Reviewers discuss and, once confident, reach a final decision on whether the instance may remain hosted on Cloud on a long-term basis.</li>
            <li>If the instance cannot remain hosted on Cloud, it is scheduled for suspension in 2 weeks, but not earlier than 3 months from its creation (see <a class="font-italic font-weight-bold" href="#suspended-instances">Suspended Instances</a>).</li>
          </ul>
          <h3 id="ongoing-re-evaluation" class="mb-3">4.4 Ongoing Re‑Evaluation</h3>
          <ul class="mb-4">
            <li>All hosted instances may be re‑evaluated periodically to ensure continued alignment with Cloud’s principles and criteria.</li>
            <li>Re-evaluation is scheduled on an individual basis when the instance gets approved by the committee, or happens sooner if WMDE notices that a specific instance is being used in a way that is not compliant with any Wikibase Cloud policy.</li>
            <li>If an instance no longer meets the hosting criteria, the manager may be asked to make adjustments. If the required adjustments are not made, or if meeting hosting criteria is deemed impossible from the outset, the instance will be suspended.</li>
          </ul>
          <h3 id="suspended-instances" class="mb-3">4.5 Suspended Instances</h3>
          <p>Unless there is a clear violation of Terms of Use, instances get suspended with a 2 weeks notice.</p>
          <p>Suspended instances remain unavailable for access, but the data in them is not physically deleted yet.</p>
          <p>Suspended instances get permanently deleted after 3 months, with the domain name being released back to the pool.</p>
          <h3 id="appeals" class="mb-3">4.6 Appeals</h3>
          <p>If an instance is scheduled to be or already is suspended and the manager believes the decision was based on incomplete or incorrect information, they may submit an appeal. Appeals must:</p>
          <ul class="mb-4">
            <li>explain what information was missing, inaccurate, or misunderstood;</li>
            <li>provide any additional information for reconsideration.</li>
          </ul>
          <p>The Review Committee will review the appeal with priority over new applications. A suspension may be reversed if the additional information resolves the concerns that led to the suspension.</p>
          <h3 id="review-committee" class="mb-3">4.7 Review Committee</h3>
          <p>The group participating in decision-making is:</p>
          <ul class="mb-4">
            <li>Wikibase Ecosystem Portfolio Manager</li>
            <li>Wikibase Cloud Product Manager</li>
            <li>Head of Product Strategy</li>
            <li>A rotating member of the Wikibase Cloud team</li>
          </ul>
          <p>We also welcome participation from community members who wish to contribute to hosting decisions. If volunteers express interest and have the capacity to join, WMDE will establish a process for including them in the Review Committee.</p>
          <h3 id="migration-of-existing-instances" class="mb-3">4.8 Migration of Existing Instances</h3>
          <p>When this policy is implemented, all existing instances will need to undergo the hosting application process.</p>
          <ul class="mb-4">
            <li>WMDE will set a clear deadline by which all instance managers must submit their application.</li>
            <li>A subset of instances (potentially including volunteers) may participate in a pilot phase to test the new process.</li>
            <li>Instances that do not submit an application by the deadline will transition to suspended status.</li>
            <li>If an instance needs or chooses to move away from Wikibase Cloud, we aim to provide reasonable support in this transition where possible.</li>
          </ul>
          <h3 id="wiki-profile" class="mb-3">4.9 Wiki Profile</h3>
          <p>The following information needs to be provided in the application to make the instance permanent:</p>
          <ul>
            <li>
              <span class="font-weight-bold">Intended purpose</span>
              <ul>
                <li>Does the instance publish a real dataset?</li>
                <li>Is it intended for reuse by audiences beyond the contributing community?</li>
                <li>Does the instance serve as an isolated sandbox for preparing data before export elsewhere? If so, where will the data flow afterwards?</li>
                <li>Is it intended for learning, experimentation, or something else?</li>
              </ul>
            </li>
            <li>
              <span class="font-weight-bold">Description of the dataset</span> (for projects intended for sharing and reuse, and for data staging)
              <ul>
                <li>What kind of data will be hosted? (topic, domain, scope)</li>
                <li>Rough size and expected growth (if known)</li>
                <li>Expected contribution workflows (manual, imports, bots)</li>
                <li>Anticipated approach to taking care of this dataset</li>
                <li>Perceived contribution to knowledge equity through data (if any)</li>
              </ul>
            </li>
            <li>
              <span class="font-weight-bold">Intended audience</span> (for projects intended for sharing and reuse)
              <ul>
                <li>Who is expected to benefit from this data?</li>
                <li>Potential application and tools that will be built on top of it</li>
              </ul>
            </li>
            <li>
              <span class="font-weight-bold">Contributor information</span>
              <ul>
                <li>Brief description of the individual(s), informal group or organization expected to contribute to the project</li>
                <li>Their mission, economical sector, field of work, approximate size, shared interests that bring them together in this project</li>
                <li>Any relevant constraints (funding, technical skills, infrastructure)</li>
                <li>Perceived contribution to knowledge equity through the people holding and sharing the data (if any)</li>
              </ul>
            </li>
          </ul>
          <h2 id="transparency-and-communication" class="mt-7 mb-3">5. Transparency and Communication</h2>
          <p>We aim to make hosting decisions clear, predictable, and respectful for all applicants.</p>
          <h3 id="communication-of-decisions-to-applicants" class="mb-3">5.1 Communication of Decisions to Applicants</h3>
          <ul class="mb-4">
            <li>Applicants receive a written decision summarizing the Review Committee’s assessment.</li>
            <li>When an instance is not accepted, the decision references relevant criteria, provides the minimum necessary reasoning for suspension without revealing internal deliberations, and any actions required to bring the instance into compliance.</li>
          </ul>
          <h3 id="public-log-of-decisions" class="mb-3">5.2 Public Log of Decisions</h3>
          <ul class="mb-4">
            <li>To support transparency and trust, WMDE will maintain a public log summarizing hosting decisions made by the Review Committee. Its purpose is to help the community understand how the policy is applied in practice.</li>
            <li>Sensitive or private information will not be published.</li>
          </ul>
          <h3 id="requests-for-clarification" class="mb-3">5.3 Requests for Clarification</h3>
          <ul>
            <li>Applicants may request clarification about the decision, the interpretation of criteria, or what changes might improve future eligibility.</li>
            <li>The Review Committee provides clear, concise answers, but does not engage in negotiation or redefining criteria.</li>
          </ul>
          <h2 id="policy-revision-and-updates" class="mt-7 mb-3">6. Policy Revision and Updates</h2>
          <p>To ensure this policy remains accurate, effective, and aligned with WMDE’s mission and operational realities, it will be revised and updated on a regular basis.</p>
          <h3 id="revision-cycle" class="mb-3">6.1 Revision Cycle</h3>
          <ul class="mb-4">
            <li>
              The policy will undergo a formal revision <span class="font-weight-bold">at least once per year</span>, or sooner if:
              <ul>
                <li>significant changes in infrastructure, mission priorities, ecosystem needs, or WMDE’s resource constraints arise,</li>
                <li>the decision process is found unsustainable, too time‑consuming, unclear, or inconsistent to apply in practice,</li>
                <li>the criteria do not reliably lead to aligned decisions within the Review Committee.</li>
              </ul>
            </li>
            <li>Interim updates may be made if issues are identified during application reviews, re‑evaluations or appeals.</li>
          </ul>
          <h3 id="responsible-parties" class="mb-3">6.2 Responsible Parties</h3>
          <ul class="mb-4">
            <li>The Review Committee performs the policy revision.</li>
            <li>Community members may be consulted on proposed updates, especially when changes affect expectations for contributors or project eligibility.</li>
          </ul>
          <h3 id="update-process" class="mb-3">6.3 Update Process</h3>
          <ul class="mb-4">
            <li>Proposed changes are drafted by the Review Committee based on identified needs, operational learnings, or feedback.</li>
            <li>Draft updates are shared internally and externally for review and alignment.</li>
            <li>Once approved, updates are published on the relevant documentation pages.</li>
            <li>A summary of changes is added to the public decision log, ensuring transparency and traceability.</li>
          </ul>
          <h3 id="previously-suspended-instances" class="mb-3">6.4 Previously Suspended Instances</h3>
          <ul class="mb-4">
            <li>Instances suspended under an earlier version of this policy are not automatically re‑evaluated retrospectively.</li>
            <li>However, users may submit an appeal requesting a new review.</li>
            <li>Appeals for previously suspended instances are assessed according to the updated policy</li>
          </ul>
          <h3 id="versioning" class="mb-3">6.5 Versioning</h3>
          <ul class="mb-4">
            <li>Major outdated versions are archived but remain accessible for reference.</li>
          </ul>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
export default {
  name: 'HostingPolicy',
}
</script>
