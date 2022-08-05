import { schema, Ajv } from '@feathersjs/schema'
import { authenticationSettingsSchema } from '@feathersjs/authentication'

export const configurationSchema = schema(
  {
    $id: 'ApplicationConfiguration',
    type: 'object',
    additionalProperties: false,
    required: ['host', 'port', 'public', 'paginate'],
    properties: {
      host: { type: 'string' },
      port: { type: 'number' },
      public: { type: 'string' },
      postgresql: {
        type: 'object',
        properties: {
          client: { type: 'string' },
          connection: { type: 'string' }
        }
      },
      authentication: authenticationSettingsSchema,
      paginate: {
        type: 'object',
        additionalProperties: false,
        required: ['default', 'max'],
        properties: {
          default: { type: 'number' },
          max: { type: 'number' }
        }
      }
    }
  },
  new Ajv()
)
