import { EventEmitter, Injectable } from '@angular/core';
import { Document } from './document.model';
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
    this.getDocuments();
  }

  getDocuments() {
    this.http.get("http://localhost:8080/documents/api").subscribe(
      // success method
      (documents: Document[]) => {
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

  sortAndSend(){
    this.documents.sort()
    this.documentListChangedEvent.next(this.documents.slice());
  }

  getDocument(id: string): Document | null {
    return this.documents.find(document => document.id === id) || null;
  }

  addDocument(newDocument: Document) {
    if (!newDocument) {
      return;
    }
    newDocument.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post<{ message: string, document: Document }>('http://localhost:8080/documents',
      newDocument,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new document to documents
          this.documents.push(responseData.document);
          this.sortAndSend();
        }
      );
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }
    const pos = this.documents.findIndex(d => d.id === originalDocument.id);
    if (pos < 0) {
      return;
    }
    newDocument.id = originalDocument.id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // update database
    this.http.put('http://localhost:8080/documents/' + originalDocument.id,
      newDocument, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.documents[pos] = newDocument;
          this.sortAndSend();
        });
  }

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }
    const pos = this.documents.findIndex(d => d.id === document.id)
    if (pos < 0) {
      return;
    }
    // delete from database
    this.http.delete('http://localhost:8080/documents/' + document.id)
      .subscribe(
        (response: Response) => {
          this.documents.splice(pos, 1);
          this.sortAndSend();
        }
      );
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
