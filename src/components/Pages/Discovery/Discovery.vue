<template>
  <div class="content">
    <div class="intro">
      <div class="text-h4 title">
        A tour of Wikibases in the cloud
      </div>
      <div class="text-subtitle-1">
        Have you ever wanted to take a look at other Wikibases, so you can see how other folks have set them up? Here's a list of other instances on Wikibase Cloud for your information and inspiration.
      </div>
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
    <MasonryGrid class="cards">
      <DiscoveryCard v-for="(wiki, index) in wikis" :key="index"
        class="card"
        :name="wiki.name"
        :url="wiki.url"
        :logo="wiki.logo"
        :stats="wiki.stats"
        :pages="wiki.pages"
      />
    </MasonryGrid>
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
import DiscoveryCard from './Components/DiscoveryCard.vue'
import MasonryGrid from './Components/MasonryGrid.vue'

const SortOptions = {
  alphaAsc: {
    text: 'Alphabetically ↑',
    value: {
      direction: 'desc',
      sort: 'sitename'
    }
  },
  alphaDesc: {
    text: 'Alphabetically ↓',
    value: {
      direction: 'asc',
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
    DiscoveryCard,
    MasonryGrid
  },
  data () {
    return {
      results: 0,
      resultsPerPage: 24,
      currentPage: 1,
      totalPages: 1,
      excludeEmpty: true,
      sortValue: SortOptions.pagesDesc.value,
      sortOptions: Object.values(SortOptions),
      inputDisabled: false,
      wikis: []
    }
  },
  methods: {
    async update () {
      this.inputDisabled = true

      try {
        const response = await this.$api.wikiDiscovery({
          sort: this.sortValue.sort,
          direction: this.sortValue.direction,
          active: this.excludeEmpty ? 1 : 0,
          currentPage: this.currentPage,
          resultsPerPage: this.resultsPerPage
        })

        this.results = response.meta.total
        this.totalPages = response.meta.last_page
        this.wikis = await response.data.map((wiki) => {
          const stats = wiki.wiki_site_stats
          return {
            name: wiki.sitename,
            url: new URL('https://' + wiki.domain),
            logo: wiki.logo_url ? new URL(wiki.logo_url) : undefined,
            stats: !!stats,
            ...(stats && { pages: stats.pages })
          }
        })
      } catch (error) {
        console.log(error)
        alert('Failed to collect Wikibase stats')
      } finally {
        this.inputDisabled = false
      }
    },
    filter () {
      if (this.currentPage === 1) {
        this.update()
      } else {
        this.currentPage = 1
      }
    }
  },
  computed: {
    paginate: function () {
      return this.results > this.resultsPerPage
    }
  },
  watch: {
    sortValue: function () {
      this.filter()
    },
    excludeEmpty: function () {
      this.filter()
    },
    currentPage: function () {
      this.update()
    },
    wikis: function () {
      this.$nextTick(() => {
        this.$nextTick(() => {
          document.documentElement.scrollIntoView({ behavior: 'smooth' })
        })
      })
    }
  },
  mounted () {
    this.update()
  }
}
</script>

<style scoped>
.content {
  margin: 16px 16px 0 16px;
}
.intro {
  max-width: 601px;
}
.title {
  margin-bottom: 4px;
}
.pagination {
  margin: 32px auto 16px auto;
  max-width: 85%;
}
.card {
  min-width: 288px;
  max-width: 400px;
}
.cards {
  margin-top: 24px;
}
>>> .cards.grid {
  column-gap: 24px;
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
@media screen and (max-width: 648px) {
  /*
    648px = 2 * 288px (.card min-width)
      + 2 * 24px (.content left/right margin at >= 640px)
      + 24px (.grid column-gap)
  */
  .cards {
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
@media screen and (min-width: 1578px) {
  /*
    1578px = 1514px (.content max-width)
      + 2 * 32px (.content left/right margin at >= 1120px)
  */
  .content {
    margin: 40px auto 0 auto;
    width: 1514px;
  }
  .pagination {
    max-width: 50%;
  }
}
</style>
