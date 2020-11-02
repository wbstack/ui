import { setupWorker } from 'msw'
import { handlers } from './default_handlers'

export const worker = setupWorker(...handlers)
