import { EventEmitter, Injectable } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  maxDocumentId: number;
  documents: Document[] = [];
  documentListChangedEvent = new Subject<Document[]>();
  documentSelectedEvent = new EventEmitter<Document>();

  constructor(private http: HttpClient) {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  getDocuments() {
    this.http.get("https://matt-cms-1fb03-default-rtdb.firebaseio.com/documents.json").subscribe(
       // success method
       (documents: Document[] ) => {
          this.documents = documents;
          this.maxDocumentId = this.getMaxId();
          this.documents.sort();
          this.documentListChangedEvent.next(this.documents.slice());
       },
       // error method
       (error: any) => {
          console.log(error);
       })
  }

  storeDocuments() {
    const documentsString = JSON.stringify(this.documents)
    const putHeaders = new HttpHeaders().set("Content-Type", "application/json")

    this.http.put("https://matt-cms-1fb03-default-rtdb.firebaseio.com/documents.json", documentsString, {headers:putHeaders}).subscribe(
             // success method
             () => {
              this.documentListChangedEvent.next(this.documents.slice());
           },
           // error method
           (error: any) => {
              console.log(error);
           }
          )
  }

  getDocument(id: string): Document | null {
    return this.documents.find(document => document.id === id) || null;
  }

  addDocument(newDocument: Document) {
    if (!newDocument) {
      return;
    }
    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);
    this.storeDocuments();
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }
    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return;
    }
    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    this.storeDocuments();
  }

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }
    this.documents.splice(pos, 1);
    this.storeDocuments();
  }

  getMaxId(): number {
    let maxId = 0;

    for (const document of this.documents) {
      const currentId = parseInt(document.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

}
