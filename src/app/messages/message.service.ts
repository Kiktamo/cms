import { EventEmitter, Injectable } from '@angular/core';
import { Message } from './message.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ContactService } from '../contacts/contact.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  maxMessageId: number;
  messages: Message[] = [];
  messageChangedEvent = new EventEmitter<Message[]>();

  constructor(private http: HttpClient, private contactService: ContactService) {
    this.getMessages();
  }

  getMessages() {
    this.http.get("http://localhost:8080/messages/api").subscribe(
      // success method
      (messages: Message[]) => {
        this.messages = messages;
        this.maxMessageId = this.getMaxId();
        this.messages.sort();
        this.messageChangedEvent.emit(this.messages.slice());
      },
      // error method
      (error: any) => {
        console.log(error);
      })
  }

  sortAndSend() {
    this.messages.sort();
    this.messageChangedEvent.emit(this.messages.slice());
  }

  getMessage(id: string): Message | null {
    return this.messages.find(message => message.id === id) || null;
  }

  addMessage(newMessage: Message) {
    if (!newMessage) {
      return;
    }
    newMessage.id = '';
    console.log(newMessage)

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post<{ message: string, msg: Message }>('http://localhost:8080/messages',
      newMessage,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new message to messages
          this.messages.push(responseData.msg);
          console.log(responseData)
          this.sortAndSend();
        }
      );
  }

  updateMessage(originalMessage: Message, newMessage: Message) {
    if (!originalMessage || !newMessage) {
      return;
    }
    
    const pos = this.messages.findIndex(m => m.id === originalMessage.id);
    if (pos < 0) {
      return;
    }
    
    newMessage.id = originalMessage.id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // update database
    this.http.put('http://localhost:8080/messages/' + originalMessage.id,
      newMessage, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.messages[pos] = newMessage;
          this.sortAndSend();
        });
  }

  deleteMessage(message: Message) {
    if (!message) {
      return;
    }
    
    const pos = this.messages.findIndex(m => m.id === message.id);
    if (pos < 0) {
      return;
    }
    
    // delete from database
    this.http.delete('http://localhost:8080/messages/' + message.id)
      .subscribe(
        (response: Response) => {
          this.messages.splice(pos, 1);
          this.sortAndSend();
        }
      );
  }

  getMaxId(): number {
    let maxId = 0;

    for (const message of this.messages) {
      const currentId = parseInt(message.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }
}