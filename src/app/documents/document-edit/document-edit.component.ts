import { Component, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { NgForm} from '@angular/forms';
import { DocumentService } from '../document.service';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'cms-document-edit',
  standalone: false,
  templateUrl: './document-edit.component.html',
  styleUrl: './document-edit.component.css'
})
export class DocumentEditComponent implements OnInit {
  originalDocument: Document;
  document: Document;
  editMode: boolean = false;

  
constructor(
  private documentService: DocumentService,
  private router: Router,
  private route: ActivatedRoute) {

}

ngOnInit() {
  this.route.params.subscribe (
    (params: Params) => {
       const id = params['id']

       if (id == null) {
          this.editMode = false
          return
       }

       this.originalDocument = this.documentService.getDocument(id)
  
       if (this.originalDocument == null)
          return
        
       this.editMode = true
       this.document = JSON.parse(JSON.stringify(this.originalDocument))
  }) 
}


  onSubmit(f: NgForm) {
    const name = f.value.name;
    const description = f.value.description;
    const url = f.value.url;
    const newDocument = new Document('', name, description, url)

    if (this.editMode) {
      this.documentService.updateDocument(this.originalDocument, newDocument);
    } else {
      this.documentService.addDocument(newDocument);
    }
    this.router.navigate(['documents']);
  }

  onCancel() {
    this.router.navigate(['documents']);
  }

}
