// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html
import { feathers } from '@feathersjs/feathers'
import configuration from '@feathersjs/configuration'
import { koa, rest, bodyParser, errorHandler, parseAuthentication, cors, serveStatic } from '@feathersjs/koa'
import mount from 'koa-mount';
import { configurationValidator } from './configuration.js'
import { logError } from './hooks/log-error.js'
import { postgresql } from './postgresql.js'

import { services } from './services/index.js'

import rpc from 'feathers-rpc'

const app = koa(feathers())

// Load our app configuration (see config/ folder)
app.configure(configuration(configurationValidator))

// Set up Koa middleware
app.use(cors())
app.use(serveStatic(app.get('public')))
app.use(mount('/api', serveStatic('./specifications/build')))
app.use(errorHandler())
app.use(parseAuthentication())
app.use(bodyParser({jsonLimit: '3mb',}))

// add pre-service middleware
app.use(rpc())

// Configure services and transports
app.configure(rest())



app.configure(postgresql)

app.configure(services)

// Register hooks that run on all service methods
app.hooks({
  around: {
    all: [logError]
  },
  before: {},
  after: {},
  error: {}
})
// Register application setup and teardown hooks here
app.hooks({
  setup: [],
  teardown: []
})

export { app }
