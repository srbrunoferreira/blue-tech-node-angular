import ContactController from './contact_controller.ts'
import Contact from './contact_model.ts'
import ContactRepository from './contact_repository.ts'
import ContactService from './contact_service.ts'
import ContactValidator from './contact_validator.ts'

export function getContractController() {
  return new ContactController(getContactService(), getContactValidator())
}

export function getContactService() {
  return new ContactService(getContactRepository())
}

export function getContactRepository() {
  return new ContactRepository(Contact)
}

export function getContactValidator() {
  return new ContactValidator()
}
