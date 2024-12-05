import { jest, describe, beforeEach, it, expect } from '@jest/globals'
import Contact from '../contact_model.ts'
import ContactRepository from '../contact_repository.ts'
import ContactService from '../contact_service.ts'

jest.mock('../contact_repository')
jest.mock('../contact_model')

describe('ContactService - updateContact', () => {
  let contactRepositoryMock: jest.Mocked<ContactRepository>
  let contactService: ContactService

  beforeEach(() => {
    contactRepositoryMock = new ContactRepository(
      Contact
    ) as jest.Mocked<ContactRepository>

    contactService = new ContactService(contactRepositoryMock)
  })

  it('should throw error when trying to update inexistent contact', async () => {
    const contactId = 1
    const mockContact = null

    contactRepositoryMock.findContactById.mockResolvedValue(
      mockContact as never
    )

    const contactData = {
      full_name: 'Jane Doe',
      email: 'jane@example.com',
      phone: '0987654321'
    }

    await expect(
      contactService.updateContact(contactId, contactData)
    ).rejects.toThrow('contact-not-found')
  })
})
