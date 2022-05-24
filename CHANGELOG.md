
# ui

## 3.94 23 May 2022
- Update footer with new links
- Remove `GetStartedBanner`, `WikiCount`, `WhatCanYouDo` and `WhatIsIncluded`
- Add new URL linked to wikibase community page and mailing list

## 3.93 12 May 2022
- Add hint for valid subdomain naming https://phabricator.wikimedia.org/T306868

## 3.92 10 May 2022
- Remove the call to provide feedback on Federated Properties https://phabricator.wikimedia.org/T307372

## 3.91 14 April 2022
- Add Impressum link to footer https://phabricator.wikimedia.org/T306167

## 3.9 14 April 2022
- Update phone number https://phabricator.wikimedia.org/T306161 
## 3.8 11 April 2022
- Fix missing time period in ToS

## 3.7 08 April 2022
- Update Terms of Service https://phabricator.wikimedia.org/T303504
- Update Privacy Policy https://phabricator.wikimedia.org/T303502

## 3.6 01 April 2022

- Remove old copy https://phabricator.wikimedia.org/T303589
## 3.5 21 February 2022

- Disable Federated Properties setting

## 3.4 17 February 2022

- Switch to recaptcha.net instead of google.com

## 3.3 17 February 2022

- Add support for specifying CNAME_RECORD hint in ui

## 3.2 26 January 2022

- New landing page for wikibase.cloud

## 3.1 26 October 2021

- Fix recaptcha site key config name

## 3.0 - 22 October 2021

- Allow config vars to be set at runtime
- Add configuration for domain suffix

## 2.12 - 24 September 2021

- Just dep updates

## 2.11 - 24 August 2021

- Add notice on data deletion (hard deletion) for wikis

## 2.10 - 24 June 2021

- Fix password reset form
- Add new blog post
- Make home and dash nicer on mobile
- Fix typos

## 2.9 - 29 April 2021

- Update Infrastructure blog post list

## 2.8 - 26 April 2021

- [Make "What can you do" more mobile friendly](https://github.com/wbstack/ui/pull/109)
- [Add WMDE funding bits](https://github.com/wbstack/ui/pull/91)
- Various dependency updates

## 2.7 - 2 April 2021

- [Setting Lexeme in the UI](https://github.com/wbstack/ui/pull/107)

## 2.6 - 26 March 2021

- New Feature setting tab
  - [Swap order of features](https://github.com/wbstack/ui/pull/70)
  - [Improve spacing](https://github.com/wbstack/ui/pull/81)
  - [Feedback banner](https://github.com/wbstack/ui/pull/83)
  - [Federated properties now toggles to 2 states](https://github.com/wbstack/ui/pull/76)
- Get old / existing setting values from the API
  - [Drop the red warning banner](https://github.com/wbstack/ui/pull/86) 
  - [Skin](https://github.com/wbstack/ui/pull/78)
  - [Logo](https://github.com/wbstack/ui/pull/80)
  - [Confirm account](https://github.com/wbstack/ui/pull/85)
  - [Wikibase string lengths](https://github.com/wbstack/ui/pull/79)
- General
  - [Enlarge login form :D](https://github.com/wbstack/ui/pull/82)
  - [Login form shows error in error state](https://github.com/wbstack/ui/pull/88)
  - [Submit internal setting names to the API](https://github.com/wbstack/ui/pull/73)
  - [Privacy updates](https://github.com/wbstack/ui/pull/89)
  - [Updated stats](https://github.com/wbstack/ui/pull/87)
  - [Remove unused "notices" section](https://github.com/wbstack/ui/pull/92)

https://github.com/wbstack/ui/pull/89

## 2.5.1 - 25 March 2021

- Fix env file for production

## 2.5 - 25 March 2021

- [Fix Logo setting appearance](https://github.com/wbstack/ui/pull/51)
- [Fix missing <p> tag in About.vue](https://github.com/wbstack/ui/pull/27)
- [Add settings tabs in wiki manager view](https://github.com/wbstack/ui/pull/28)
- [Add UI for federated properties setting](https://github.com/wbstack/ui/pull/30) + other PRs
- [Add UI for Manifest settings](https://github.com/wbstack/ui/pull/32) + other PRs

## 2.4 - 13 December 2020

- Link to Github from various places
  - [main page](https://github.com/wbstack/ui/commit/9d4c4474c6826282b4a8810d0d1d95ca6a53f05a)
  - [footer](https://github.com/wbstack/ui/commit/0659a6568cefb8ce61ebb91ed1aa26c65b8c2a1d)
- [Link to the docs site from about page](https://github.com/wbstack/ui/commit/6eb10ee2c8da9f27a15346f9f0f508c7ab91c1cd)
- [Add latest blog posts](https://github.com/wbstack/ui/commit/c5e2a46726a54b0944e216a1843e3d235dc51ad0)
- [Update manual stats on dashboard](https://github.com/wbstack/ui/commit/37114542c44922b3d061ec85dd8232b408f320d5)
- [Check verified state periodically](https://github.com/wbstack/ui/commit/52d7776ea5235978010ee542688859b73c20d936)

## 2.3 - 6 December 2020

- [Poke the verification issue](https://github.com/wbstack/ui/commit/716e1cb51e8447b25e9e2ef08620fb0d3e6bbb97)

## 2.2- 17 November 2020

- [Title and favicon fixes](https://github.com/wbstack/ui/pull/20)
- [beta->alpha fix](https://github.com/wbstack/ui/commit/8db99ef91b5c86221a0a6c7457977a519bfc2654)

## 2.1 - November 2020

- Move to GitHub & vue-cli

## October 2020

- 1.14 - Fix file uploads? https://github.com/addshore/wbstack/issues/121

## June 2020

- 1.13 - Multilang (term) length options

## May 2020

- 1.12 - Wiki settings for wikibase string length an ConfirmAccount
- 1.11 - Privacy policy, more content
- 1.10 - Better user verification flow
- 1.09 - Fix wiki deletion api call
- 1.08 - Custom default mediawiki skin

## April 2020

- 1.07 - Add 2020 Update #1 blog post
- 1.06 - Verify email, be nice if the token is gone, and add coloorr
- 1.05 - Tom poke dashboard list :)
- 1.04 - Logo uploads
- 1.03 - Fix a few other page layouts
- 1.02 - Fix styles in footer
- 1.00 - Update to vuetify 2.2.21 (from 1.5)
- 0.30 - ui, open links to wikis in new tabs
- 0.29 - Lick of paint everywhere
- 0.28 - Custom domain support on wiki creation
- 0.27 - Email verification nice if done
- 0.26 - Delete wiki functionality (stop making dashboard say we cant do it)
- 0.25 - Delete wiki functionality
- 0.24 - Reset password functionality 1
- 0.23 - Update texts & npm audit fix

## February 2020

- 0.22 - Fix typo
- 0.21 - Update some links

## December 2019

- 0.19 - Allow wiki creation again
- 0.18 - PAUSE wiki creation due to https://github.com/addshore/wbstack/issues/39

## November 2019

- 0.17 - more text, and better login error messages...

## October 2019

- 0.16 - company -> organization in footer
- 0.15 - registration tweaks, password length note
- 0.14 - registration tweaks
- 0.13 - Friday, wikimanage, Note about email, and hide tier...
- 0.12 - Friday, Hide things and stuff
- 0.11 - Friday, recpatcha on all registrations
- 0.10 - Wednesday before Wikidatacon
- 0.6 - prod, use www/api instead of api. for api access
- 0.5 - Try again for API_URL after poking the app a bit...
- 0.4 - Try again for the correct API_URL in build...
- 0.3 - Build with correct API_URL env var...
- 0.2 - Fixed nginx config for always service main file (als use wbstack)

## August 2019

- 0.1 - Initial version
