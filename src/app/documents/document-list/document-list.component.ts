import { Component, EventEmitter, Output } from '@angular/core';
import { DocumentItemComponent } from '../document-item/document-item.component';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  imports: [DocumentItemComponent],
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent {
  @Output() documentWasSelected = new EventEmitter<Document>();

  onDocumentSelected(document: Document) {
    this.documentWasSelected.emit(document)
  }

}
