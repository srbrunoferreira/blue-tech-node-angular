import { Component, OnInit } from '@angular/core';
import { Contact } from '../../models/contact.model';
import { ContactService } from '../../services/contact.service';
import { CommonModule } from '@angular/common';
import { ContactComponent } from '../contact-item/contact.component';
import { ContactCreateModalComponent } from '../contact-create-modal/contact-create-modal.component';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroPlus } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
  imports: [
    CommonModule,
    ContactComponent,
    ContactCreateModalComponent,
    NgIcon,
  ],
  viewProviders: [provideIcons({ heroPlus })],
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];
  showModal = false;

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.contactService.getContacts().subscribe((data: Contact[]) => {
      this.contacts = data;
    });
  }

  deleteContact(contactId: number) {
    this.contacts = this.contacts.filter((contact) => contact.id !== contactId);
  }

  onContactCreated(contact: Contact): void {
    this.contacts.push(contact);
    this.showModal = false;
  }

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }
}
