import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentsComponent } from './documents/documents.component';
import { MessageListComponent } from './messages/message-list/message-list.component';
import { ContactsComponent } from './contacts/contacts.component';
import { DocumentEditComponent } from './documents/document-edit/document-edit.component';
import { DocumentDetailComponent } from './documents/document-detail/document-detail.component';
import { ContactEditComponent } from './contacts/contact-edit/contact-edit.component';
import { ContactDetailComponent } from './contacts/contact-detail/contact-detail.component';
import { DocumentResolver } from './documents/document-resolver.service';
import { MessageResolver } from './messages/message-resolver.service';
import { ContactResolver } from './contacts/contact-resolver.service';

const routes: Routes = [
  {path: '', redirectTo:'/documents', pathMatch:'full', resolve: {documents: DocumentResolver}},
  {path: 'documents', component: DocumentsComponent, resolve: { documents: DocumentResolver }, children: [
    {path: 'new', component: DocumentEditComponent},
    {path: ':id', component: DocumentDetailComponent},
    {path: ':id/edit', component: DocumentEditComponent}
  ]},
  {path: 'messages', component: MessageListComponent, resolve: {messages: MessageResolver}},
  {path: 'contacts', component: ContactsComponent, resolve: {contacts: ContactResolver}, children: [
    {path: 'new', component: ContactEditComponent},
    {path: ':id', component: ContactDetailComponent},
    {path: ':id/edit', component: ContactEditComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
