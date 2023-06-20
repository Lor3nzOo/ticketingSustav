import fetch from "node-fetch";
export const handle = async ({ event, resolve }) => {
    const session = event.cookies.get('session')

    if (!session) {
        return await resolve(event)
    }

    const data = await fetch('http://localhost:3000/api/auth/session', {
        headers: {
            cookie: `session=${session};`
        }
    })

    const res = await data.json()

    if (res.statusCode === 200) {
        event.locals.user = {
            username: res.username,
            id: res.id
        }
    }

    return await resolve(event)
}