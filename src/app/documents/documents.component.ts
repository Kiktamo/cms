import { Component } from '@angular/core';
import { DocumentListComponent } from './document-list/document-list.component';
import { DocumentDetailComponent } from './document-detail/document-detail.component';

@Component({
  selector: 'cms-documents',
  imports: [DocumentListComponent, DocumentDetailComponent],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.css'
})
export class DocumentsComponent {

}
