import { makeUser, getStoredWikis, persistWikis } from './shared'

export const mockState = {
  user: makeUser(),
  myWikis: getStoredWikis(),
  entityImportCalledTimes: 0,
}

export function syncMyWikis () {
  mockState.myWikis = getStoredWikis()
}

export function nextWikiId () {
  const lastWikiId = mockState.myWikis.reduce((max, wiki) => {
    const id = Number(wiki.id)
    return Number.isFinite(id) ? Math.max(max, id) : max
  }, 0)

  return lastWikiId + 1
}

export function resetMockData () {
  mockState.user = makeUser()
  mockState.myWikis = []
  mockState.entityImportCalledTimes = 0
  persistWikis(mockState.myWikis)
}
