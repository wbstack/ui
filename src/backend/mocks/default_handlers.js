import { rest } from 'msw'

let myWikis = JSON.parse(localStorage.getItem('msw-myWikis')) || []
let lastWikiId = (myWikis.length && myWikis[myWikis.length - 1].id) || 0
let user = JSON.parse(localStorage.getItem('user'))

const makeUser = (email = 'test@local') => ({
  id: 1,
  email: email,
  verified: true,
  created_at: '2020-01-01',
  updated_at: '2020-01-01'
})

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

export const handlers = [
  /* User endpoints */
  rest.post(/\/auth\/login$/, (req, res, ctx) => {
    user = makeUser(req.body.email)
    return res(ctx.json({
      user,
      token: 'test_token'
    }))
  }),
  rest.post(/\/user\/forgotPassword$/, (_, res, ctx) => res(ctx.status(200))),
  rest.post(/\/user\/resetPassword$/, (_, res, ctx) => res(ctx.status(200))),
  rest.post(/\/user\/sendVerifyEmail$/, (_, res, ctx) => res(ctx.json({ message: 'Already verified' }))),
  rest.post(/\/user\/verifyEmail$/, (_, res, ctx) => res(ctx.status(200))),

  /* Wiki endpoints */
  rest.get(/\/wiki\/count$/, (_, res, ctx) => res(ctx.json({ data: 1 }))),
  rest.post(/\/wiki\/mine$/, (_, res, ctx) => res(ctx.json({ wikis: myWikis, count: myWikis.length, limit: false }))),
  rest.post(/\/wiki\/create$/, (req, res, ctx) => {
    return res(ctx.json({ data: makeNewWiki(req.body) }))
  }),
  rest.post(/\/wiki\/delete$/, (req, res, ctx) => {
    const wikiId = req.body.wiki
    const wikiIndex = myWikis.findIndex(w => w.id === Number(wikiId))
    if (wikiIndex < 0) {
      return res(ctx.status(404))
    }

    removeWiki(wikiIndex)
    return res(ctx.status(200))
  }),
  rest.post(/\/wiki\/logo\/update$/, (_, res, ctx) => res(ctx.status(200))),
  rest.post(/\/wiki\/setting\/.*?\/update$/, (_, res, ctx) => res(ctx.status(200))),
  rest.post(/\/wiki\/details$/, (req, res, ctx) => {
    const wikiId = req.body.wiki
    const wikiDetails = myWikis.find(w => w.id === Number(wikiId))
    if (!wikiDetails) {
      return res(ctx.status(404))
    }
    return res(ctx.json({ data: wikiDetails }), ctx.status(200))
  })
]
