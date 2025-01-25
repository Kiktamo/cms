import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Message } from '../message.model';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';

@Component({
  selector: 'cms-message-edit',
  imports: [CommonModule, FormsModule],
  templateUrl: './message-edit.component.html',
  styleUrl: './message-edit.component.css'
})
export class MessageEditComponent {
  currentSender: string = "Matthew"

  @ViewChild('subject', {static:false}) subject!: ElementRef;
  @ViewChild('msgText', {static:false}) msgText!: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();

  onSendMessage(event: Event) {
    event.preventDefault();
    const currentMsgSubject = this.subject!.nativeElement.value;
    const currentMsgText = this.msgText!.nativeElement.value;

    const newMessage = new Message(
      0,
      currentMsgSubject,
      currentMsgText,
      this.currentSender
    )

    this.addMessageEvent.emit(newMessage);
    this.onClear();
  }

  onClear() {
    this.subject!.nativeElement.value = "";
    this.msgText!.nativeElement.value = "";

  }

}
