import { Router } from 'express'
import * as dependencies from './dependencies.ts'

const contactRouter = Router()

const contactController = dependencies.getContractController()

contactRouter
  .get(
    '/contacts/:contactId',
    contactController.getContact.bind(contactController)
  )
  .post('/contacts', contactController.createContact.bind(contactController))
  .put(
    '/contacts/:contactId',
    contactController.updateContact.bind(contactController)
  )
  .delete(
    '/contacts/:contactId',
    contactController.deleteContact.bind(contactController)
  )
  .get('/contacts', contactController.getContacts.bind(contactController))

export default contactRouter
