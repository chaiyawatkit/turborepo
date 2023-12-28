import { Elysia, t } from 'elysia'
import { cors } from '@elysiajs/cors'
import { staticPlugin } from '@elysiajs/static'
import { swagger } from '@elysiajs/swagger'

export const config = { runtime: 'edge' };
const app = new Elysia()
    .use(cors())
    .use(swagger())
    .use(
        staticPlugin({
            prefix: ''
        })
    )
    .get('/', () => 'Hello Elysia')
    // @ts-ignore
    .post('/sign-in', ({ body }) => body, {
        body: t.Object({
            username: t.String(),
            password: t.String()
        }),
        response: {
            200: t.Object({
                username: t.String(),
                password: t.String()
            }),
            400: t.Object({
                error: t.String(),
                status: t.Number()
            })
        }
    })
    .listen(3000)

export type App = typeof app

console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)
