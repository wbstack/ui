import { rest } from 'msw'
import { makeUser } from './shared'
import { mockState } from './state'

export const authHandlers = [
  rest.post(/\/api\/auth\/login$/, (req, res, ctx) => {
    mockState.user = makeUser(req.body.email)
    return res(ctx.json({
      user: mockState.user,
    }), ctx.cookie('authToken', 'token_value'))
  }),
  rest.get(/\/api\/auth\/login$/, (req, res, ctx) => {
    const { authToken } = req.cookies
    if (authToken !== 'token_value') {
      return res(ctx.status(401))
    }
    return res(ctx.json({
      user: mockState.user,
    }))
  }),
  rest.delete(/\/api\/auth\/login$/, (_, res, ctx) => {
    mockState.user = makeUser()
    return res(ctx.status(204))
  }),
  rest.post(/\/api\/user\/forgotPassword$/, (req, res, ctx) => {
    if (req.body.email === 'serverError@example.com') {
      return res(ctx.status(400, 'Mocked Server Error'))
    }
    return res(ctx.status(200))
  }),
  rest.post(/\/api\/user\/resetPassword$/, (_, res, ctx) => res(ctx.status(200))),
  rest.post(/\/api\/user\/sendVerifyEmail$/, (_, res, ctx) => res(ctx.json({ message: 'Already verified' }))),
  rest.post(/\/api\/user\/verifyEmail$/, (_, res, ctx) => res(ctx.status(200))),
  rest.post(/\/api\/complaint\/sendMessage$/, (_, res, ctx) => res(ctx.status(200))),
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
  }),
]
