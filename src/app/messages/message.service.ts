import { EventEmitter, Injectable } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  maxMessageId: number;
  messages: Message[] = []
  messageChangedEvent = new EventEmitter<Message[]>();

  constructor(private http: HttpClient) {
    this.messages = MOCKMESSAGES;
  }

  getMessages() {
    this.http.get("https://matt-cms-1fb03-default-rtdb.firebaseio.com/messages.json").subscribe(
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

  storeMessages() {
    const messagesString = JSON.stringify(this.messages)
    const putHeaders = new HttpHeaders().set("Content-Type", "application/json")

    this.http.put("https://matt-cms-1fb03-default-rtdb.firebaseio.com/messages.json", messagesString, {headers:putHeaders}).subscribe(
             // success method
             () => {
              this.messageChangedEvent.emit(this.messages.slice());
           },
           // error method
           (error: any) => {
              console.log(error);
           }
          )
  }

  getMessage(id: string): Message | null {
    return this.messages.find(message => message.id === id) || null;
  }

  addMessage(newMessage: Message) {
    if (!newMessage) {
      return;
    }
    this.maxMessageId++;
    newMessage.id = this.maxMessageId.toString();
    this.messages.push(newMessage);
    this.storeMessages();
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
