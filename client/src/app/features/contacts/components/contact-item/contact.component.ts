import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Contact } from '../../models/contact.model';
import { ContactService } from '../../services/contact.service';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroTrash } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  imports: [NgIcon],
  viewProviders: [provideIcons({ heroTrash })],
})
export class ContactComponent {
  @Input() contact!: Contact;
  @Output() delete: EventEmitter<number> = new EventEmitter<number>();

  constructor(private contactService: ContactService) {}

  deleteContact(): void {
    if (confirm('Are you sure you want to delete this contact?')) {
      this.delete.emit(this.contact.id);
    }
  }
}
