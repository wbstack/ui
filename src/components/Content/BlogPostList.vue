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
          name: '2020 Update #1',
          url: 'https://addshore.com/2020/04/wbstack-2020-update-1/'
        },
        {
          name: 'Infrastructure overview',
          url: 'https://addshore.com/2020/01/wbstack-infrastructure/'
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
