import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Document } from './document.model';
import { DocumentService } from './document.service';
import { take, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DocumentResolver implements Resolve<Document[]> {
  
  constructor(private documentService: DocumentService) {}
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Document[]> {
    // First check if documents are already loaded
    if (this.documentService.documents.length > 0) {
      return of(this.documentService.documents);
    } else {
      // If not, make the HTTP request and wait for it to complete
      this.documentService.getDocuments();
      
      // Return an observable that will emit when the document list changes
      return this.documentService.documentListChangedEvent.pipe(
        take(1), // Take only the first emission (once data is loaded)
        map(documents => {
          return documents;
        })
      );
    }
  }
}