import ContactRepository from './contact_repository.ts'

export default class ContactService {
  private contactRepository: ContactRepository

  constructor(contactRepository: ContactRepository) {
    this.contactRepository = contactRepository
  }

  async getContactById(contactId: number) {
    return this.contactRepository.findContactById(contactId)
  }

  async createContact(contactData: {
    full_name: string
    email: string
    phone: string
  }) {
    return this.contactRepository.createContact(contactData)
  }

  async updateContact(
    contactId: number,
    contactData: { full_name: string; email: string; phone: string }
  ) {
    const contact = await this.contactRepository.findContactById(contactId)
    if (!contact) {
      throw new Error('contact-not-found')
    }

    return this.contactRepository.updateContact(contactId, contactData)
  }

  async deleteContact(contactId: number) {
    const contact = await this.contactRepository.findContactById(contactId)
    if (!contact) {
      throw new Error('Contact not found')
    }
    return this.contactRepository.deleteContact(contactId)
  }

  async getAllContacts() {
    return this.contactRepository.findAllContacts()
  }
}
