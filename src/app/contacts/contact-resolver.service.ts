import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Contact } from './contact.model';
import { ContactService } from './contact.service';
import { take, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactResolver implements Resolve<Contact[]> {
  
  constructor(private contactService: ContactService) {}
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Contact[]> {
    // First check if contacts are already loaded
    if (this.contactService.contacts.length > 0) {
      return of(this.contactService.contacts);
    } else {
      // If not, make the HTTP request and wait for it to complete
      this.contactService.getContacts();
      
      // Return an observable that will emit when the contact list changes
      return this.contactService.contactListChangedEvent.pipe(
        take(1), // Take only the first emission (once data is loaded)
        map(contacts => {
          return contacts;
        })
      );
    }
  }
}