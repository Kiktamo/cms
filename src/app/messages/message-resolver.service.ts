import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Message } from './message.model';
import { MessageService } from './message.service';
import { take, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MessageResolver implements Resolve<Message[]> {
  
  constructor(private messageService: MessageService) {}
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Message[]> {
    // First check if messages are already loaded
    if (this.messageService.messages.length > 0) {
      return of(this.messageService.messages);
    } else {
      // If not, make the HTTP request and wait for it to complete
      this.messageService.getMessages();
      
      // Return an observable that will emit when the message list changes
      return this.messageService.messageChangedEvent.pipe(
        take(1), // Take only the first emission (once data is loaded)
        map(messages => {
          return messages;
        })
      );
    }
  }
}