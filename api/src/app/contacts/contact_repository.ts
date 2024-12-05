import Contact from './contact_model.ts'

export default class ContactRepository {
  private db: typeof Contact

  constructor(db: typeof Contact) {
    this.db = db
  }

  async findContactById(contactId: number) {
    return this.db.findOne({
      where: { id: contactId }
    })
  }

  async createContact(contactData: {
    full_name: string
    email: string
    phone: string
  }) {
    return this.db.create(contactData)
  }

  async updateContact(
    contactId: number,
    contactData: { full_name: string; email: string; phone: string }
  ) {
    const contact = await this.findContactById(contactId)
    if (contact) {
      return contact.update(contactData)
    }
    return null
  }

  async deleteContact(contactId: number) {
    const contact = await this.findContactById(contactId)
    if (contact) {
      await contact.destroy()
      return true
    }
    return false
  }

  async findAllContacts() {
    return this.db.findAll()
  }
}
