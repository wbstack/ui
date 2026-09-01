import { http } from 'msw'

// implementations for msw v2 handlers go in this file
// see old.default_handlers.js for reference
// this note can get removed after migration

const myWikis = JSON.parse(localStorage.getItem('msw-myWikis')) || []

function makeUser (email = 'test@local') {
  return {
    id: 1,
    email,
    verified: true,
    created_at: '2020-01-01',
    updated_at: '2020-01-01',
  }
}

export const handlers = [
  http.get('/api/auth/login', ({ cookies }) => {
    const { authToken } = cookies
    if (authToken !== 'token_value') {
      return Response.json('Unauthorized', {
        status: 401,
      })
    }

    const user = makeUser()
    return Response.json({ user })
  }),

  http.post('/api/auth/login', async ({ request }) => {
    const body = await request.json()
    const user = makeUser(body.email)

    return Response.json({ user }, {
      headers: { 'set-cookie': 'authToken=token_value' },
    })
  }),

  http.delete('/api/auth/login', () => {
    return new Response(null, { status: 204 })
  }),

  http.post('/api/user/forgotPassword', () => {
    return new Response('Success')
  }),

  http.post('/api/user/resetPassword', () => {
    return new Response('Success')
  }),

  http.post('/api/user/sendVerifyEmail', () => {
    return new Response('Already verified')
  }),

  http.post('/api/user/verifyEmail', () => {
    return new Response('Already verified')
  }),

  http.post('/api/wiki/mine', () => {
    const data = { wikis: myWikis, count: myWikis.length, limit: false }
    return Response.json(data)
  }),

  http.get('/api/v1/policies/missing', () => {
    const items = []
    return Response.json({ items })
  }),
]
