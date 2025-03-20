import { Contact } from "../contacts/contact.model";

export class Message {
    public id: string;
    public subject: string;
    public msgText: string;
    public sender: string;
  
    constructor(
      id: string,
      subject: string,
      msgText: string,
    ) {
      this.id = id;
      this.subject = subject;
      this.msgText = msgText;
    }
  }
  