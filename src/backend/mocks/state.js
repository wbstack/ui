const STORAGE_KEY = 'msw-scenario'
const DEFAULT_SCENARIO = 'happy-path'

export const MOCK_SCENARIOS = [
  'happy-path',
  'empty-state',
  'auth-error',
  'server-error',
]

export function getMockScenario () {
  if (typeof localStorage === 'undefined') {
    return DEFAULT_SCENARIO
  }

  const saved = localStorage.getItem(STORAGE_KEY)
  return MOCK_SCENARIOS.includes(saved) ? saved : DEFAULT_SCENARIO
}

export function setMockScenario (scenario) {
  if (!MOCK_SCENARIOS.includes(scenario)) {
    throw new Error(`Unsupported mock scenario: ${scenario}`)
  }

  localStorage.setItem(STORAGE_KEY, scenario)
  return getMockScenario()
}

export function resetMockState () {
  if (typeof localStorage !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem('msw-myWikis')
  }
  return DEFAULT_SCENARIO
}
