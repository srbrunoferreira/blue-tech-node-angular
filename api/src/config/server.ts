import express from 'express'
import * as swagger from 'swagger-express-ts'

export function configureServer(app: express.Application) {
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use('/api-docs/swagger', express.static('swagger'))
  app.use(
    '/api-docs/swagger/assets',
    express.static('node_modules/swagger-ui-dist')
  )
}

export function errorHandler(app: express.Application) {
  app.use(
    (
      err: Error,
      request: express.Request,
      response: express.Response,
      next: express.NextFunction
    ) => {
      console.error(err.stack)
      response.status(500).send('Something broke!')
    }
  )
}

export function configureSwagger(app: any) {
  app.use(
    swagger.express({
      definition: {
        info: {
          title: 'Contacts API',
          version: '0.0.1'
        },
        models: {
          Contact: {
            properties: {
              id: {
                type: swagger.SwaggerDefinitionConstant.Model.Property.Type
                  .NUMBER,
                required: true
              },
              full_name: {
                type: swagger.SwaggerDefinitionConstant.Model.Property.Type
                  .STRING,
                required: true
              },
              email: {
                type: swagger.SwaggerDefinitionConstant.Model.Property.Type
                  .STRING
              },
              phone: {
                type: swagger.SwaggerDefinitionConstant.Model.Property.Type
                  .STRING
              }
            }
          },
          Error: {
            properties: {
              code: {
                type: swagger.SwaggerDefinitionConstant.Model.Property.Type
                  .STRING,
                required: true
              }
            }
          }
        },
        basePath: '/'
      }
    })
  )
}
