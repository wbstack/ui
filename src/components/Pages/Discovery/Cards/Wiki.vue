<template>
  <v-card @click="goToWiki">
    <v-container class="content">
      <v-row no-gutters>
        <v-col class="flex-grow-0">
          <v-avatar :color="color">
            <img v-if="logo" :src="logo.href">
            <span v-else class="white--text">{{character}}</span>
          </v-avatar>
        </v-col>
        <v-col class="details">
          <div class="text-h5 font-weight-regular">{{name}}</div>
          <div v-if="stats" class="text-body-2 pages">No. of pages: {{pages}}</div>
          <div v-else class="text-body-2 pages">No. of pages: <i>available in 24h</i></div>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: 'Wiki',
  props: {
    name: {
      type: String,
      required: true
    },
    url: {
      type: URL,
      required: true
    },
    logo: {
      type: URL,
      required: false
    },
    stats: {
      type: Boolean,
      required: true
    },
    pages: {
      type: Number,
      required: false
    }
  },
  computed: {
    character: function () {
      return this.name.substring(0, 1).toUpperCase();
    },
    color: function () {
      const colors = ['red', 'blue', 'green', 'purple'];
      return this.logo ? 'white' : colors[Math.floor(Math.random() * colors.length)];
    }
  },
  methods: {
    goToWiki () {
      window.open(this.url.href, '_blank');
    }
  }
}
</script>

<style scoped>
.content {
  padding: 16px 16px;
}
.details.col {
  padding-left: 16px !important;
  word-wrap: anywhere;
}
.pages {
  padding-top: 4px;
}
</style>
