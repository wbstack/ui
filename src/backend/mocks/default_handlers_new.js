import { http, HttpResponse } from 'msw'

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
    http.get('/api/auth/login', async ({ request, cookies }) => {
        const { authToken } = cookies
        if (authToken !== 'token_value') {
            return new Response('Unauthorized', {
                status: 401,
            })
        }
        //   todo this might be broken below here
        console.log('duck')
        // const body = await request.json()
        console.log('duck2')
        const user = makeUser('thomas.arrow@wikimediasdfa.de')
        return HttpResponse.json({user})
    }),
    http.post('/api/auth/login', async ({ request }) => {
        const body = await request.json()
        console.log('fooooooo')
        console.log(body)
        const user = makeUser(body.email)
        return HttpResponse.json({
            user,
        }, { headers: { 'set-cookie': 'authToken=token_value', } }
        )
    }),
]