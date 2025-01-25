import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Contact } from '../contact.model';

@Component({
  selector: 'cms-contact-detail',
  imports: [],
  templateUrl: './contact-detail.component.html',
  styleUrl: './contact-detail.component.css'
})
export class ContactDetailComponent {
  @Input() contact!: Contact;

}