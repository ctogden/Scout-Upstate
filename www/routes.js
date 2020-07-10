const nextRoutes = require('next-routes')
const routes = (module.exports = nextRoutes())

routes.add('attraction', '/guide/attraction/:slug', '/guide/attraction/index')
