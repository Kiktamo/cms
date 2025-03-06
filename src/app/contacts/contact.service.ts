import { EventEmitter, Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  maxContactId: number;
  contacts: Contact[] = [];
  contactSelectedEvent = new EventEmitter<Contact>();
  contactListChangedEvent = new Subject<Contact[]>();

  constructor(private http: HttpClient) {
    this.contacts = MOCKCONTACTS
  }

  getContacts() {
        this.http.get("https://matt-cms-1fb03-default-rtdb.firebaseio.com/contacts.json").subscribe(
           // success method
           (contacts: Contact[] ) => {
              this.contacts = contacts;
              this.maxContactId = this.getMaxId();
              this.contacts.sort();
              this.contactListChangedEvent.next(this.contacts.slice());
           },
           // error method
           (error: any) => {
              console.log(error);
           })
  }

  storeContacts() {
    const contactsString = JSON.stringify(this.contacts)
    const putHeaders = new HttpHeaders().set("Content-Type", "application/json")

    this.http.put("https://matt-cms-1fb03-default-rtdb.firebaseio.com/contacts.json", contactsString, {headers:putHeaders}).subscribe(
             // success method
             () => {
              this.contactListChangedEvent.next(this.contacts.slice());
           },
           // error method
           (error: any) => {
              console.log(error);
           }
          )
  }

  getContact(id: string): Contact | null {
    return this.contacts.find(contact => contact.id === id) || null;
  }

  addContact(newContact: Contact) {
    if (!newContact) {
      return;
    }
    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    this.storeContacts();
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }
    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return;
    }
    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    this.storeContacts();
  }

  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }
    this.contacts.splice(pos, 1);
    this.storeContacts();
  }

  getMaxId(): number {
    let maxId = 0;

    for (const contact of this.contacts) {
      const currentId = parseInt(contact.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

}
