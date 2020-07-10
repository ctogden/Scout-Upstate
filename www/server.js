// server.js
const next = require('next')
const routes = require('./routes')
const app = next({ dev: process.env.NODE_ENV !== 'production' })
const handler = routes.getRequestHandler(app)

const connect = require('connect')
const slashes = require('connect-slashes')

app.prepare().then(() => {
  connect().use(slashes(false)).use(handler).listen(3000)
})
