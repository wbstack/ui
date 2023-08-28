<template>
  <div class="content">
    <span class="text-h4 title">
      Discover other Wikibases on Cloud
    </span>
    <div class="text-subtitle-1">
      Quick text explaining what this does and what it's good for.
    </div>
    <v-container class="options">
      <v-select
        :items="sortOptions"
        v-model="sortValue"
        :disabled="inputDisabled"
        label="Sort"
        hide-details="auto"
        outlined
        dense
      />
      <v-checkbox
        v-model="excludeEmpty"
        :disabled="inputDisabled"
        label="exclude empty Wikibases"
        hide-details="auto"
      />
    </v-container>
    <span class="text-body-2">
      {{results}} results
    </span>
    <div class="wikis">
      <div v-for="(wiki, index) in wikis" :key="index">
        <Wiki
          class="card"
          :name="wiki.name"
          :url="wiki.url"
          :logo="wiki.logo"
          :stats="wiki.stats"
          :pages="wiki.pages"
        />
      </div>
    </div>
    <div v-if="paginate" class="pagination">
      <v-pagination
        v-model="currentPage"
        :length="totalPages"
        :disabled="inputDisabled"
      />
    </div>
  </div>
</template>

<script>
import Wiki from './Cards/Wiki.vue'

const SortOptions = {
  alphaAsc: {
    text: 'Alphabetically ↑',
    value: {
      direction: 'asc',
      sort: 'sitename'
    }
  },
  alphaDesc: {
    text: 'Alphabetically ↓',
    value: {
      direction: 'desc',
      sort: 'sitename'
    }
  },
  pagesDesc: {
    text: 'No. of pages ↓',
    value: {
      direction: 'desc',
      sort: 'pages'
    }
  }
}

export default {
  name: 'Discovery',
  components: {
    Wiki
  },
  data () {
    return {
      results: 0,
      resultsPerPage: 24,
      currentPage: 1,
      totalPages: 1,
      excludeEmpty: true,
      sortValue: SortOptions.alphaAsc.value,
      sortOptions: Object.values(SortOptions),
      inputDisabled: false,
      wikis: []
    }
  },
  methods: {
    async update () {
      this.inputDisabled = true;

      try {
        const response = await this.$api.wikiDiscovery({
          sort: this.sortValue.sort,
          direction: this.sortValue.direction,
          active: this.excludeEmpty ? 1 : 0,
          currentPage: this.currentPage,
          resultsPerPage: this.resultsPerPage
        });

        this.results = response.meta.total;
        this.totalPages = response.meta.last_page;
        this.wikis = response.data.map((wiki) => {
          const stats = wiki.wiki_site_stats
          return {
            name: wiki.sitename,
            url: new URL('https://' + wiki.domain),
            logo: wiki.logo_url ? new URL(wiki.logo_url) : undefined,
            stats: !!stats,
            ...(stats && { pages: stats.pages })
          }
        });
      } catch (error) {
        console.log(error);
        alert('Failed to collect Wikibase stats');
      } finally {
        this.inputDisabled = false;
      }
    },
    filter () {
      if (this.currentPage === 1) {
        this.update();
      } else {
        this.currentPage = 1;
      }
    }
  },
  computed: {
    paginate: function () {
      return this.results > this.resultsPerPage;
    }
  },
  watch: {
    sortValue: function () {
      this.filter();
    },
    excludeEmpty: function () {
      this.filter();
    },
    currentPage: function () {
      this.update();
    }
  },
  mounted () {
    this.update();
  }
}
</script>

<style scoped>
.content {
  margin: 16px 16px 0 16px;
}
.pagination {
  margin: 32px auto 16px auto;
  max-width: 85%;
}
.card {
  min-width: 288px;
  max-width: 400px;
}
.title {
  margin-bottom: 4px;
}
.wikis {
  margin-top: 24px;
  display: grid;
  row-gap: 16px;
  column-gap: 24px;
  grid-template-columns: repeat(auto-fill, minmax(288px, 1fr));
}
.options {
  padding: 0 !important;
  margin: 56px 0 32px 0;
}
.options > .v-input {
  display: inline-block;
}
.options > .v-text-field {
  width: 185px;
}
.options > .v-input--checkbox {
  margin-top: 0;
  margin-left: 24px;
  padding-top: 0;
  padding-bottom: 4px;
  vertical-align: middle;
}
@media screen and (max-width: 632px) {
  /* 632 = 2 * 288 (card) + 2 * 16 (margin) + 24 (grid column gap) */
  .wikis {
    width: fit-content;
    margin-left: auto;
    margin-right: auto;
  }
  .options > .v-input {
    display: block;
  }
  .options > .v-input--checkbox {
    margin-left: 0;
    margin-top: 16px;
    padding: 0;
  }
}
@media screen and (min-width: 640px) {
  .content {
    margin: 24px 24px 0 24px;
  }
  .pagination {
    max-width: 50%;
  }
}
@media screen and (min-width: 1120px) {
  .content {
    margin: 40px 32px 0 32px;
  }
  .pagination {
    max-width: 50%;
  }
}
@media screen and (min-width: 1680px) {
  .content {
    margin: 40px auto 0 auto;
    width: 1514px;
  }
  .pagination {
    max-width: 50%;
  }
}
</style>
