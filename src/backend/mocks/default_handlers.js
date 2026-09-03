import { http } from 'msw'

// implementations for msw v2 handlers go in this file
// see old.default_handlers.js for reference
// this note can get removed after migration

let myWikis = JSON.parse(localStorage.getItem('msw-myWikis')) || []
let lastWikiId = (myWikis.length && myWikis[myWikis.length - 1].id) || 0
let user = makeUser()
let getEntityImportCalledTimes = 0

function makeUser (email = 'test@local') {
  return {
    id: 1,
    email,
    verified: true,
    created_at: '2020-01-01',
    updated_at: '2020-01-01',
  }
}

const makeNewWiki = ({ domain, sitename }) => {
  const newWiki = {
    id: ++lastWikiId,
    domain,
    sitename,
    deleted_at: null,
    created_at: '2020-01-01',
    updated_at: '2020-01-01',
    pivot: {
      user_id: user.id,
      wiki_id: lastWikiId,
    },
    wiki_managers: [{
      email: user.email,
      pivot: {
        user_id: user.id,
        wiki_id: lastWikiId,
      },
    }],
    wiki_db_version: {
      id: 101,
      wiki_id: lastWikiId,
      version: 'mw1.33-wbs1',
    },
    public_settings: [],
  }

  myWikis.push(newWiki)
  localStorage.setItem('msw-myWikis', JSON.stringify(myWikis))

  return newWiki
}

const removeWiki = wikiIndex => {
  myWikis.splice(wikiIndex, 1)
  localStorage.setItem('msw-myWikis', JSON.stringify(myWikis))
}

const wikiDiscovery = (referrer, params) => {
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

export const handlers = [
  http.get('/api/auth/login', ({ cookies }) => {
    const { authToken } = cookies
    if (authToken !== 'token_value') {
      return Response.json('Unauthorized', {
        status: 401,
      })
    }

    user = makeUser()
    return Response.json({ user })
  }),

  http.post('/api/auth/login', async ({ request }) => {
    const body = await request.json()
    user = makeUser(body.email)

    return Response.json({ user }, {
      headers: { 'set-cookie': 'authToken=token_value' },
    })
  }),

  http.delete('/api/auth/login', () => {
    return new Response(null, { status: 204 })
  }),

  http.post('/api/user/forgotPassword', () => {
    return new Response('Success')
  }),

  http.post('/api/user/resetPassword', () => {
    return new Response('Success')
  }),

  http.post('/api/user/sendVerifyEmail', () => {
    return new Response('Already verified')
  }),

  http.post('/api/user/verifyEmail', () => {
    return new Response('Already verified')
  }),

  http.post('/api/complaint/sendMessage', () => {
    return new Response('Success')
  }),

  http.post('/api/contact/sendMessage', async ({ request }) => {
    const body = await request.json()

    if (body.name === '' || body.message === '' || body.subject === '') {
      return new Response(null, { status: 400 })
    }

    return new Response('Success')
  }),

  http.post('/api/wiki/mine', () => {
    const data = { wikis: myWikis, count: myWikis.length, limit: false }
    return Response.json(data)
  }),

  http.post('/api/wiki/entityImport', () => {
    const data = { status: 'pending', payload: {}, started_at: new Date().toJSON() }
    return Response.json(data)
  }),

  http.get('/api/wiki/entityImport', () => {
    getEntityImportCalledTimes++
    switch (getEntityImportCalledTimes) {
      case 1:
        return Response.json([])
      case 2:
        return Response.json([{ status: 'pending' }])
      default:
        return Response.json([{ status: 'success' }])
    }
  }),

  http.post('/api/wiki/create', async ({ request }) => {
    const body = await request.json()
    const newWiki = makeNewWiki(body)
    return Response.json({
      success: true,
      data: newWiki,
    })
  }),

  http.post('/api/wiki/delete', async ({ request }) => {
    const body = await request.json()
    const wikiId = body.wiki
    const wikiIndex = myWikis.findIndex(w => w.id === Number(wikiId))

    if (wikiIndex < 0) {
      return new Response(null, { status: 404 })
    }

    removeWiki(wikiIndex)
    return new Response('Success')
  }),

  http.post('/api/wiki/logo/update', () => {
    return new Response('Success')
  }),

  http.post(/\/api\/wiki\/setting\/.*?\/update$/, () => {
    return new Response('Success')
  }),

  http.post('/api/wiki/details', async ({ request }) => {
    const body = await request.json()
    const wikiId = body.wiki
    const wikiDetails = myWikis.find(w => w.id === Number(wikiId))

    if (!wikiDetails) {
      return new Response(null, { status: 404 })
    }

    return Response.json({
      success: true,
      data: wikiDetails,
    })
  }),

  http.get('/api/wiki', async ({ request }) => {
    const referrer = await request.referrer
    const url = new URL(await request.url)

    return Response.json(wikiDiscovery(referrer, url.searchParams))
  }),

  http.get('/api/v1/policies/missing', () => {
    const items = []
    return Response.json({ items })
  }),

  http.get('/api/v1/policies/current', () => {
    const items = [
      {
        metadata: {
          policy_id: 2,
          type: 'terms-of-use',
          active_from: '2026-08-27',
          content_vue_file: 'terms-of-use/version-2.vue',
        },
      },
      {
        metadata: {
          policy_id: 3,
          type: 'hosting-policy',
          active_from: '2026-08-27',
          content_vue_file: 'hosting-policy/version-1.vue',
        },
      },
    ]

    return Response.json({ items })
  }),
]
