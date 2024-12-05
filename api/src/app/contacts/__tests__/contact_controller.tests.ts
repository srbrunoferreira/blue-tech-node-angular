import { Request, Response, NextFunction } from 'express'
import { mock } from 'jest-mock-extended'
import {
  jest,
  describe,
  beforeEach,
  afterEach,
  it,
  expect
} from '@jest/globals'
import ContactService from '../contact_service.ts'
import ContactValidator from '../contact_validator.ts'
import ContactController from '../contact_controller.ts'

// Mocking the validationResult function from express-validator
jest.mock('express-validator', () => ({
  validationResult: jest.fn().mockReturnValue({
    isEmpty: jest.fn().mockReturnValue(true),
    array: jest.fn().mockReturnValue([])
  })
}))

describe('ContactController', () => {
  let contactService: ContactService
  let contactValidator: ContactValidator
  let contactController: ContactController

  beforeEach(() => {
    contactService = mock<ContactService>()

    // Mocking the return values using .mockResolvedValue
    ;(contactService.getAllContacts as jest.Mock).mockResolvedValue([
      {
        id: 1,
        full_name: 'John Doe',
        email: 'john@example.com',
        phone: '12345'
      },
      {
        id: 2,
        full_name: 'Jane Doe',
        email: 'jane@example.com',
        phone: '67890'
      }
    ] as never)

    ;(contactService.getContactById as jest.Mock).mockResolvedValue({
      id: 1,
      full_name: 'John Doe',
      email: 'john@example.com',
      phone: '12345'
    } as never)

    contactValidator = mock<ContactValidator>()
    contactController = new ContactController(contactService, contactValidator)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('getContacts', () => {
    it('should return a list of contacts', async () => {
      const req = {} as Request
      const res = { json: jest.fn() } as unknown as Response
      const next = jest.fn() as NextFunction

      await contactController.getContacts(req, res, next)

      expect(res.json).toHaveBeenCalledWith([
        {
          id: 1,
          full_name: 'John Doe',
          email: 'john@example.com',
          phone: '12345'
        },
        {
          id: 2,
          full_name: 'Jane Doe',
          email: 'jane@example.com',
          phone: '67890'
        }
      ])
    })
  })

  describe('getContact', () => {
    it('should return a contact by ID', async () => {
      const req = { params: { contactId: '1' } } as unknown as Request
      const res = { json: jest.fn() } as unknown as Response
      const next = jest.fn() as NextFunction

      await contactController.getContact(req, res, next)

      expect(res.json).toHaveBeenCalledWith({
        id: 1,
        full_name: 'John Doe',
        email: 'john@example.com',
        phone: '12345'
      })
    })

    it('should return 404 if contact not found', async () => {
      // Mocking getContactById to return null
      ;(contactService.getContactById as jest.Mock).mockResolvedValue(
        null as never
      )

      const req = { params: { contactId: '1' } } as unknown as Request
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      } as unknown as Response
      const next = jest.fn() as NextFunction

      await contactController.getContact(req, res, next)

      expect(res.status).toHaveBeenCalledWith(404)
      expect(res.json).toHaveBeenCalledWith({ message: 'Contact not found' })
    })
  })

  // Add other tests for the remaining methods...
})
