import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { Contact } from './contact.model';

@Component({
  selector: 'cms-contacts',
  imports: [CommonModule, ContactListComponent, ContactDetailComponent],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css'
})
export class ContactsComponent {
  selectedContact?: Contact

}
