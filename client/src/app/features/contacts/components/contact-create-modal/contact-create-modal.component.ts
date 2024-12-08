import { Component, Output, EventEmitter } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../../../shared/ui/components/button/button.component';

@Component({
  selector: 'app-contact-create-modal',
  templateUrl: './contact-create-modal.component.html',
  styleUrls: ['./contact-create-modal.component.css'],
  imports: [FormsModule, ButtonComponent],
})
export class ContactCreateModalComponent {
  @Output() contactCreated = new EventEmitter<Contact>();
  @Output() modalClosed = new EventEmitter<void>();

  newContact: Contact = {
    id: 0,
    full_name: '',
    phone: '',
    email: '',
  };

  constructor(private contactService: ContactService) {}

  createContact(): void {
    if (
      this.newContact.full_name &&
      this.newContact.phone &&
      this.newContact.email
    ) {
      this.contactService
        .createContact(this.newContact)
        .subscribe((contact: Contact) => {
          this.contactCreated.emit(contact);
          this.resetForm();
        });
    } else {
      alert('Please fill all fields');
    }
  }

  closeModal(): void {
    this.modalClosed.emit(); // Emit the event to close the modal
  }

  resetForm(): void {
    this.newContact = {
      id: 0,
      full_name: '',
      phone: '',
      email: '',
    };
  }
}
