import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommunicationAddPage } from './communication-add.page';

const routes: Routes = [
  {
    path: '',
    component: CommunicationAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommunicationAddPageRoutingModule {}
