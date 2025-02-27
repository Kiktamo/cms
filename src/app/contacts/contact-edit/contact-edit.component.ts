import { Component } from '@angular/core';
import { Contact } from '../contact.model';
import { NgForm } from '@angular/forms';
import { ContactService } from '../contact.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'cms-contact-edit',
  standalone: false,
  templateUrl: './contact-edit.component.html',
  styleUrl: './contact-edit.component.css'
})
export class ContactEditComponent {
  originalContact: Contact;
  contact: Contact;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  id: string;
  invalidContact: boolean = false;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute) {
  }


  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        const id = params['id']
        if (id == null) {
          this.editMode = false
          return
        }
        this.originalContact = this.contactService.getContact(id)
        if (this.originalContact == null)
          return

        this.editMode = true
        this.contact = JSON.parse(JSON.stringify(this.originalContact))

        if (this.contact.group != undefined)
          this.groupContacts = JSON.parse(JSON.stringify(this.contact.group))

      })
  }

  addToGroup($event: CdkDragDrop<Contact>) {
    const selectedContact: Contact = $event.item.data;
    const invalidGroupContact = this.isInvalidContact(selectedContact);

    if (invalidGroupContact)
    {
      this.invalidContact = true;
      return
    }

    this.invalidContact = false;
    this.groupContacts.push(selectedContact);

  }

  onRemoveItem(index: number) {
    if (index < 0 || index >= this.groupContacts.length) {
      return;
    }
    this.groupContacts.splice(index, 1);
  }

  isInvalidContact(newContact: Contact) {
    if (!newContact) {
      return true;
    }
    if (this.contact && newContact.id === this.contact.id) {
      return true;
    }
    for (let i = 0; i < this.groupContacts.length; i++) {
      if (newContact.id === this.groupContacts[i].id) {
        return true;
      }
    }
    return false;
  }

  onSubmit(f: NgForm) {
    const name = f.value.name;
    const email = f.value.email;
    const phone = f.value.phone;
    const imageUrl = f.value.imageUrl;

    const newContact = new Contact('', name, email, phone, imageUrl, this.groupContacts)

    if (this.editMode) {
      this.contactService.updateContact(this.originalContact, newContact);
    } else {
      this.contactService.addContact(newContact);
    }

    this.router.navigate(['contacts']);

  }

  onCancel() {
    this.router.navigate(['contacts']);
  }


}
