import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommunicationsPage } from './communications.page';

const routes: Routes = [
  {
    path: '',
    component: CommunicationsPage
  },
  {
    path: 'communication',
    loadChildren: () => import('./communication/communication.module').then( m => m.CommunicationPageModule)
  },
  {
    path: 'communication-add',
    loadChildren: () => import('./communication-add/communication-add.module').then( m => m.CommunicationAddPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommunicationsPageRoutingModule {}
