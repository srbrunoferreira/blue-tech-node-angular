import { Container } from 'inversify'
import ContactController from '../app/contacts/contact_controller.ts'

export function configureDepedencies(container: Container) {
  container
    .bind<ContactController>(Symbol.for('ContactController'))
    .to(ContactController)
}
