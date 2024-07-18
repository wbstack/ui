import { rest } from 'msw'

let myWikis = JSON.parse(localStorage.getItem('msw-myWikis')) || []
let lastWikiId = (myWikis.length && myWikis[myWikis.length - 1].id) || 0
let user = makeUser()

function makeUser (email = 'test@local') {
  return {
    id: 1,
    email: email,
    verified: true,
    created_at: '2020-01-01',
    updated_at: '2020-01-01'
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
      wiki_id: lastWikiId
    },
    wiki_managers: [{
      email: user.email,
      pivot: {
        user_id: user.id,
        wiki_id: lastWikiId
      }
    }],
    wiki_db_version: {
      id: 101,
      wiki_id: lastWikiId,
      version: 'mw1.33-wbs1'
    },
    public_settings: []
  }

  myWikis.push(newWiki)
  localStorage.setItem('msw-myWikis', JSON.stringify(myWikis))

  return newWiki
}

const removeWiki = wikiIndex => {
  myWikis = myWikis.splice(wikiIndex, 1)
  localStorage.setItem('msw-myWikis', JSON.stringify(myWikis))
}

const wikiDiscovery = (referrer, params) => {
  const pseudorandom = {
    seed: 1,
    next: function () {
      const x = Math.sin(this.seed++) * 10000
      return x - Math.floor(x)
    }
  }

  const names = [
    'Wikibase Name',
    'A Very Long Wikibase Name'
  ]

  let wikis = [...Array(75).keys()].map((id) => {
    const wiki = {
      id: id,
      domain: id + '-wikibase.wbaas.localhost',
      sitename: id + ' - ' + names[id % names.length],
      wiki_site_stats: null,
      logo_url: null
    }

    if (pseudorandom.next() >= 0.1) {
      wiki.wiki_site_stats = {
        pages: Math.ceil(pseudorandom.next() * 250)
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
      total: wikis.length
    }
  }
}

export const handlers = [
  /* User endpoints */
  rest.post(/\/api\/auth\/login$/, (req, res, ctx) => {
    user = makeUser(req.body.email)
    return res(ctx.json({
      user
    }), ctx.cookie('authToken', 'token_value'))
  }),
  rest.get(/\/api\/auth\/login$/, (req, res, ctx) => {
    const { authToken } = req.cookies
    if (authToken !== 'token_value') {
      return res(ctx.status(401))
    }
    user = makeUser(req.body.email)
    return res(ctx.json({
      user
    }))
  }),
  rest.delete(/\/api\/auth\/login$/, (req, res, ctx) => {
    user = makeUser(req.body.email)
    return res(ctx.status(204))
  }),
  rest.post(/\/api\/user\/forgotPassword$/, (req, res, ctx) => {
    if (req.body.email === 'serverError@example.com') {
      return res(ctx.status(400, 'Mocked Server Error'))
    }
    return res(ctx.status(200))
  }
  ),
  rest.post(/\/api\/user\/resetPassword$/, (_, res, ctx) => res(ctx.status(200))),
  rest.post(/\/api\/user\/sendVerifyEmail$/, (_, res, ctx) => res(ctx.json({ message: 'Already verified' }))),
  rest.post(/\/api\/user\/verifyEmail$/, (_, res, ctx) => res(ctx.status(200))),
  rest.post(/\/api\/contact\/sendMessage$/, (req, res, ctx) => {
    if (req.body.name === 'recaptchaError') {
      return res(ctx.status(401, 'Mocked recaptcha Error'))
    }
    if (req.body.name === '') {
      return res(ctx.status(400, 'Mocked empty name Error'))
    }
    if (req.body.recaptcha === '') {
      return res(ctx.status(400, 'Mocked recaptcha empty Error'))
    }
    return res(ctx.status(200))
  }
  ),

  /* Wiki endpoints */
  rest.post(/\/api\/wiki\/entityImport$/, (_, res, ctx) => res(ctx.json({ data: { status: 'pending', payload: {}, started_at: new Date().toJSON() } }))),
  rest.get(/\/api\/wiki\/entityImport$/, (_, res, ctx) => res(ctx.json({ data: [] }))),
  rest.get(/\/api\/wiki\/count$/, (_, res, ctx) => res(ctx.json({ data: 1 }))),
  rest.post(/\/api\/wiki\/mine$/, (_, res, ctx) => res(ctx.json({ wikis: myWikis, count: myWikis.length, limit: false }))),
  rest.post(/\/api\/wiki\/create$/, (req, res, ctx) => {
    return res(ctx.json({ data: makeNewWiki(req.body) }))
  }),
  rest.post(/\/api\/wiki\/delete$/, (req, res, ctx) => {
    const wikiId = req.body.wiki
    const wikiIndex = myWikis.findIndex(w => w.id === Number(wikiId))
    if (wikiIndex < 0) {
      return res(ctx.status(404))
    }

    removeWiki(wikiIndex)
    return res(ctx.status(200))
  }),
  rest.post(/\/api\/wiki\/logo\/update$/, (_, res, ctx) => res(ctx.status(200))),
  rest.post(/\/api\/wiki\/setting\/.*?\/update$/, (_, res, ctx) => res(ctx.status(200))),
  rest.post(/\/api\/wiki\/details$/, (req, res, ctx) => {
    const wikiId = req.body.wiki
    const wikiDetails = myWikis.find(w => w.id === Number(wikiId))
    if (!wikiDetails) {
      return res(ctx.status(404))
    }
    return res(ctx.json({ data: wikiDetails }), ctx.status(200))
  }),
  rest.get(/\/api\/wiki$/, (req, res, ctx) => {
    return res(ctx.json(wikiDiscovery(req.referrer, req.url.searchParams)))
  })
]
