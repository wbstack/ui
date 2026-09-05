import { rest } from 'msw'
import { mockState, nextWikiId, syncMyWikis } from './state'
import { persistWikis, wikiDiscovery } from './shared'

const makeNewWiki = ({ domain, sitename }) => {
  const wikiId = nextWikiId()
  const newWiki = {
    id: wikiId,
    domain,
    sitename,
    deleted_at: null,
    created_at: '2020-01-01',
    updated_at: '2020-01-01',
    pivot: {
      user_id: mockState.user.id,
      wiki_id: wikiId,
    },
    wiki_managers: [{
      email: mockState.user.email,
      pivot: {
        user_id: mockState.user.id,
        wiki_id: wikiId,
      },
    }],
    wiki_db_version: {
      id: 101,
      wiki_id: wikiId,
      version: 'mw1.33-wbs1',
    },
    public_settings: [],
  }

  mockState.myWikis.push(newWiki)
  persistWikis(mockState.myWikis)

  return newWiki
}

export const wikiHandlers = [
  rest.post(/\/api\/wiki\/entityImport$/, (_, res, ctx) => {
    return res(ctx.json({ data: { status: 'pending', payload: {}, started_at: new Date().toJSON() } }))
  }),
  rest.get(/\/api\/wiki\/entityImport$/, (_, res, ctx) => {
    mockState.entityImportCalledTimes += 1
    switch (mockState.entityImportCalledTimes) {
      case 1:
        return res(ctx.json({ data: [] }))
      case 2:
        return res(ctx.json({ data: [{ status: 'pending' }] }))
      default:
        return res(ctx.json({ data: [{ status: 'success' }] }))
    }
  }),
  rest.get(/\/api\/wiki\/count$/, (_, res, ctx) => res(ctx.json({ data: 1 }))),
  rest.post(/\/api\/wiki\/mine$/, (_, res, ctx) => {
    syncMyWikis()
    return res(ctx.json({ wikis: mockState.myWikis, count: mockState.myWikis.length, limit: false }))
  }),
  rest.post(/\/api\/wiki\/create$/, (req, res, ctx) => {
    return res(ctx.json({ data: makeNewWiki(req.body) }))
  }),
  rest.post(/\/api\/wiki\/delete$/, (req, res, ctx) => {
    const wikiId = req.body.wiki
    const wikiIndex = mockState.myWikis.findIndex(w => w.id === Number(wikiId))
    if (wikiIndex < 0) {
      return res(ctx.status(404))
    }

    mockState.myWikis.splice(wikiIndex, 1)
    persistWikis(mockState.myWikis)
    return res(ctx.status(200))
  }),
  rest.post(/\/api\/wiki\/logo\/update$/, (_, res, ctx) => res(ctx.status(200))),
  rest.post(/\/api\/wiki\/setting\/.*?\/update$/, (_, res, ctx) => res(ctx.status(200))),
  rest.post(/\/api\/wiki\/details$/, (req, res, ctx) => {
    syncMyWikis()
    const wikiId = req.body.wiki
    const wikiDetails = mockState.myWikis.find(w => w.id === Number(wikiId))
    if (!wikiDetails) {
      return res(ctx.status(404))
    }
    return res(ctx.json({ data: wikiDetails }), ctx.status(200))
  }),
  rest.get(/\/api\/wiki$/, (req, res, ctx) => {
    return res(ctx.json(wikiDiscovery(req.referrer, req.url.searchParams)))
  }),
]
