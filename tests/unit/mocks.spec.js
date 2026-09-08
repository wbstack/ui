import { getMockScenario, setMockScenario, resetMockState } from '@/backend/mocks'
import { handlers as modularHandlers } from '@/backend/mocks/handlers'
import { handlers as publicHandlers } from '@/backend/mocks'

describe('MSW mock configuration', () => {
  beforeEach(() => {
    localStorage.clear()
    resetMockState()
  })

  it('defaults to the happy-path scenario', () => {
    expect(getMockScenario()).toBe('happy-path')
  })

  it('allows switching the active scenario in local storage', () => {
    setMockScenario('empty-state')

    expect(getMockScenario()).toBe('empty-state')
  })

  it('uses the same shared handler registry for browser and tests', () => {
    expect(Array.isArray(publicHandlers)).toBe(true)
    expect(Array.isArray(modularHandlers)).toBe(true)
    expect(modularHandlers).toEqual(publicHandlers)
  })
})
