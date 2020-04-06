<template>
  <v-flex>
    <component :is="headerElement">{{headerText}}</component>
    <ul>
      <li v-for="post in posts" :key="post.name">
        <a target="_blank" rel="noopener noreferrer" :href="post.url">{{post.name}}</a>
      </li>
    </ul>
  </v-flex>
</template>

<script>
  export default {
    name: 'BlogPostList',
    props: {
      'headerElement': {
        type: String,
        default: 'h3'
      },
      'headerText': {
        type: String,
        default: 'List header'
      }
    },
    data () {
      return {
        posts: [
          {
            name: "Infrastructure overview",
            url: "https://addshore.com/2020/01/wbstack-infrastructure/"
          },
          {
            name: "November review",
            url: "https://addshore.com/2019/11/wbstack-november-review"
          },
          {
            name: "October introduction",
            url: "https://addshore.com/2019/11/an-introduction-to-wbstack/"
          },
        ]
      }
    },
  }
</script>
