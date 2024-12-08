import { InversifyExpressServer } from 'inversify-express-utils'
import { Container } from 'inversify'
import database from './database.ts'
import contactRouter from './app/contacts/contact_routes.ts'
import {
  configureCors,
  configureServer,
  configureSwagger,
  errorHandler
} from './config/server.ts'
import { configureDepedencies } from './config/dependency.ts'

const API_PORT = 9090

const container = new Container()

configureDepedencies(container)

const server = new InversifyExpressServer(container)

server.setConfig((app: any) => {
  configureServer(app)
  configureSwagger(app)
})

server.setErrorConfig((app: any) => {
  errorHandler(app)
})

const api = server.build()

configureCors(api)

api.use(contactRouter)

api.listen(API_PORT, async () => {
  console.info(`Node Contact API Running on Port ${API_PORT}\n`)

  try {
    await database.authenticate()
    database.sync()
    console.log('\n\nDatabase Up.\n\n')
  } catch (error) {
    console.error('\n\nDatabase Error\n\n', error)
  }
})
