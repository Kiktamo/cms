import { Component } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  standalone: false,
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
export class MessageListComponent {
  messages: Message[] = [
    new Message(
      '1',
      "Test 1",
      "This is a test",
      "Mr. Test"
    ),
    new Message(
      '2',
      "Test 2",
      "This is another test",
      "Mr. Test"
    ),
    new Message(
      '3',
      "Test 3",
      "This is the final test",
      "Mr. Test"
    ),
  ];

  onAddMessage(message: Message) {
    this.messages.push(message);
    console.log(this.messages);
  }
}
