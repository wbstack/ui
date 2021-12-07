<template>
  <HeadedLinkedList :headerElement="headerElement" headerText="Blog Posts" :items="posts" ></HeadedLinkedList>
</template>

<script>
import HeadedLinkedList from '~/components/Elements/HeadedLinkedList'

export default {
  name: 'BlogPostList',
  components: {
    HeadedLinkedList
  },
  props: {
    headerElement: {
      type: String,
      default: 'h3'
    }
  },
  data () {
    return {
      posts: [
        {
          name: 'WBStack in 2021, and the future',
          url: 'https://addshore.com/2021/12/wbstack-in-2021-and-the-future/'
        },
        {
          name: 'WikibaseManifest, Federated Properties, Lexeme',
          url: 'https://addshore.com/2021/05/wbstack-setting-changes-federated-properties-wikidata-entity-mapping-more/'
        },
        {
          name: '2021 Infrastructure overview',
          url: 'https://addshore.com/2021/04/wbstack-infrastructure-2021/'
        },
        {
          name: 'Open Sourcing WBStack',
          url: 'https://addshore.com/2020/12/open-sourcing-wbstack/'
        },
        {
          name: '2020 Update #2 (May)',
          url: 'https://addshore.com/2020/05/wbstack-2020-update-2/'
        },
        {
          name: '2020 Update #1',
          url: 'https://addshore.com/2020/04/wbstack-2020-update-1/'
        },
        {
          name: '2019 November review',
          url: 'https://addshore.com/2019/11/wbstack-november-review'
        },
        {
          name: '2019 October introduction',
          url: 'https://addshore.com/2019/11/an-introduction-to-wbstack/'
        }
      ]
    }
  }
}
</script>
