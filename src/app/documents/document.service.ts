import { EventEmitter, Injectable } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documents: Document[] = [];
  documentSelectedEvent = new EventEmitter<Document>();

  constructor() { 
    this.documents = MOCKDOCUMENTS;
  }

     getDocuments(): Document[] {
      return this.documents.slice(0, this.documents.length);
     }
  
     getDocument(id: string): Document | null {
      return this.documents.find(document => document.id === id) || null;
     }
}
