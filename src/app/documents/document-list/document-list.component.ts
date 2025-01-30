import { Component, EventEmitter, Output } from '@angular/core';
import { DocumentItemComponent } from '../document-item/document-item.component';
import { Document } from '../document.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'cms-document-list',
  imports: [CommonModule, DocumentItemComponent],
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();
  documents: Document[] = [
    new Document(
      1,
      "Annual Report 2023",
      "Financial and operational performance overview for fiscal year 2023",
      "https://company.com/docs/annual-report-2023",
      []
    ),
    new Document(
      2,
      "Employee Handbook",
      "Comprehensive guide covering company policies and procedures",
      "https://company.com/docs/employee-handbook",
      []
    ),
    new Document(
      3,
      "Product Specs",
      "Technical specifications for product lineup",
      "https://company.com/docs/product-specifications",
      []
    ),
    new Document(
      4,
      "Brand Guidelines",
      "Official brand identity and usage guidelines",
      "https://company.com/docs/brand-guidelines",
      []
    ),
    new Document(
      5,
      "API Documentation",
      "Reference guide for REST API endpoints and usage",
      "https://company.com/docs/api-reference",
      []
    )
  ]

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document)
  }

}
