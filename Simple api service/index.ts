// https://www.fastify.io/docs/latest/Reference/TypeScript/
import fastify from 'fastify'

const server = fastify()

server.get('/api/permission-route4', async () => {
    return 'You have permission for route 4'
})

server.listen({ port: 5005 }, (err, address) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`Server listening at ${address}`)
})