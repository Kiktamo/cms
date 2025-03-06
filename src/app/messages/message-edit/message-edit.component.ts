import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Message } from '../message.model';
import { FormsModule }   from '@angular/forms';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-edit',
  standalone: false,
  templateUrl: './message-edit.component.html',
  styleUrl: './message-edit.component.css'
})
export class MessageEditComponent {
  currentSender: string = "1"

  @ViewChild('subject', {static:false}) subject!: ElementRef;
  @ViewChild('msgText', {static:false}) msgText!: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();

  constructor(private messageService: MessageService) {}


  onSendMessage(event: Event) {
    event.preventDefault();
    const currentMsgSubject = this.subject!.nativeElement.value;
    const currentMsgText = this.msgText!.nativeElement.value;

    const newMessage = new Message(
      '0',
      currentMsgSubject,
      currentMsgText,
      this.currentSender
    )

    this.messageService.addMessage(newMessage);
    this.onClear();
  }

  onClear() {
    this.subject!.nativeElement.value = "";
    this.msgText!.nativeElement.value = "";

  }
}
