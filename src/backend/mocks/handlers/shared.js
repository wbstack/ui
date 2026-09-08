export function makeUser (email = 'test@local') {
  return {
    id: 1,
    email,
    verified: true,
    created_at: '2020-01-01',
    updated_at: '2020-01-01',
  }
}

export function getStoredWikis () {
  try {
    return JSON.parse(localStorage.getItem('msw-myWikis')) || []
  } catch (error) {
    return []
  }
}

export function persistWikis (wikis) {
  localStorage.setItem('msw-myWikis', JSON.stringify(wikis))
}

export function wikiDiscovery (referrer, params) {
  const pseudorandom = {
    seed: 1,
    next: function () {
      const x = Math.sin(this.seed++) * 10000
      return x - Math.floor(x)
    },
  }

  const names = [
    'Wikibase Name',
    'A Very Long Wikibase Name',
  ]

  let wikis = [...Array(75).keys()].map((id) => {
    const wiki = {
      id,
      domain: id + '-wikibase.wbaas.localhost',
      sitename: id + ' - ' + names[id % names.length],
      wiki_site_stats: null,
      logo_url: null,
    }

    if (pseudorandom.next() >= 0.1) {
      wiki.wiki_site_stats = {
        pages: Math.ceil(pseudorandom.next() * 250),
      }
    }

    if (pseudorandom.next() >= 0.5) {
      wiki.logo_url = new URL(referrer).origin + '/favicon.ico'
    }
    return wiki
  })

  if (parseInt(params.get('is_active'))) {
    wikis = wikis.filter((wiki) => {
      const stats = wiki.wiki_site_stats
      return stats && stats.pages > 1
    })
  }

  if (params.get('sort') === 'sitename') {
    wikis = wikis.sort((a, b) => {
      let sort = a.sitename.localeCompare(b.sitename, 'en', { numeric: true })
      if (params.get('direction') === 'desc') {
        sort *= -1
      }
      return sort
    })
  }

  if (params.get('sort') === 'pages') {
    wikis = wikis.sort((a, b) => {
      const aPages = a.wiki_site_stats ? a.wiki_site_stats.pages : 0
      const bPages = b.wiki_site_stats ? b.wiki_site_stats.pages : 0
      if (params.get('direction') === 'desc') {
        return bPages - aPages
      }
      return aPages - bPages
    })
  }

  const currentPage = parseInt(params.get('page'))
  const resultsPerPage = parseInt(params.get('per_page'))
  const start = (currentPage - 1) * resultsPerPage
  const end = start + resultsPerPage

  return {
    data: wikis.slice(start, end),
    meta: {
      last_page: Math.ceil(wikis.length / resultsPerPage),
      total: wikis.length,
    },
  }
}
