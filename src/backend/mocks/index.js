export { MOCK_SCENARIOS, getMockScenario, setMockScenario, resetMockState } from './state'

export const handlers = typeof Response === 'undefined'
  ? []
  : require('./default_handlers').handlers
