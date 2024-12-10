import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import ContactService from './contact_service.ts'
import {
  ApiPath,
  ApiOperationGet,
  ApiOperationPost,
  ApiOperationPut,
  ApiOperationDelete
} from 'swagger-express-ts'
import { controller } from 'inversify-express-utils'
import ContactValidator from './contact_validator.ts' // Import the contactValidator

@ApiPath({
  path: '/contacts',
  name: 'Contact'
})
@controller('/contacts')
export default class ContactController {
  private contactService: ContactService
  private contactValidator: ContactValidator

  constructor(
    contactService: ContactService,
    contactValidator: ContactValidator
  ) {
    this.contactService = contactService
    this.contactValidator = contactValidator
  }

  @ApiOperationGet({
    summary: 'Get list of all contacts',
    responses: {
      200: {
        description: 'Success'
      }
    }
  })
  public async getContacts(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const contacts = await this.contactService.getAllContacts()

    res.json(contacts)
  }

  @ApiOperationGet({
    path: '/{contactId}',
    summary: 'Retrieve a contact by its ID',
    parameters: {
      path: {
        contactId: {
          required: true,
          type: 'integer'
        }
      }
    },
    responses: {
      200: { description: 'Success', model: 'Contact' },
      404: { description: 'Contact not found' }
    }
  })
  public async getContact(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { contactId } = req.params
    const contact = await this.contactService.getContactById(Number(contactId))
    if (!contact) {
      res.status(404).json({ message: 'Contact not found' })
      return
    }
    res.json(contact)
  }

  @ApiOperationPost({
    summary: 'Create a new contact',
    parameters: {
      body: {
        required: true,
        model: 'Contact'
      }
    },
    responses: {
      201: { description: 'Contact created', model: 'Contact' },
      422: { description: 'Invalid contact data', model: 'Error' }
    }
  })
  public async createContact(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    if ((await this.contactValidator.validate(req, res)) !== true) {
      return
    }

    const { full_name, email, phone } = req.body

    try {
      const newContact = await this.contactService.createContact({
        full_name,
        email,
        phone
      })
      res.status(201).json(newContact)
    } catch (error: any) {
      res.status(400).json({ message: error.message })
    }
  }

  @ApiOperationPut({
    path: '/{contactId}',
    summary: 'Update a contact by ID',
    parameters: {
      path: {
        contactId: {
          required: true,
          type: 'integer'
        }
      },
      body: {
        required: true,
        model: 'Contact'
      }
    },
    responses: {
      200: { description: 'Contact updated', model: 'Contact' },
      404: { description: 'Contact not found' },
      400: { description: 'Invalid contact data' }
    }
  })
  public async updateContact(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    if ((await this.contactValidator.validate(req, res)) !== true) {
      return
    }

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() })
      return
    }

    const { contactId } = req.params
    const { full_name, email, phone } = req.body

    try {
      const updatedContact = await this.contactService.updateContact(
        Number(contactId),
        { full_name, email, phone }
      )
      if (!updatedContact) {
        res.status(404).json({ message: 'Contact not found' })
        return
      }
      res.json(updatedContact)
    } catch (error: any) {
      res.status(400).json({ message: error.message })
    }
  }

  @ApiOperationDelete({
    path: '/{contactId}',
    summary: 'Delete a contact',
    parameters: {
      path: {
        contactId: {
          required: true,
          type: 'integer'
        }
      }
    },
    responses: {
      204: { description: 'Contact deleted' },
      404: { description: 'Contact not found' }
    }
  })
  public async deleteContact(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { contactId } = req.params
    try {
      const deleted = await this.contactService.deleteContact(Number(contactId))
      if (!deleted) {
        res.status(404).json({ message: 'Contact not found' })
        return
      }
      res.status(204).send()
    } catch (error: any) {
      res
        .status(500)
        .json({ message: 'Internal server error', error: error.message })
    }
  }
}
