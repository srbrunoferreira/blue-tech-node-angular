import { Component } from '@angular/core';
import { ContactListComponent } from '../../components/contact-list/contact-list.component';

@Component({
  selector: 'app-contact-list-page',
  templateUrl: './contact-list-page.component.html',
  styleUrls: ['./contact-list-page.component.css'],
  imports: [ContactListComponent],
})
export class ContactListPageComponent {}
