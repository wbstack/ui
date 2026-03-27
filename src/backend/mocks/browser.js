import { setupWorker } from 'msw/browser'
import { handlers } from './default_handlers_new'

export const worker = setupWorker(...handlers)
