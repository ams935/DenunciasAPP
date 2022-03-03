import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommunicationAddPageRoutingModule } from './communication-add-routing.module';

import { CommunicationAddPage } from './communication-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommunicationAddPageRoutingModule
  ],
  declarations: [CommunicationAddPage]
})
export class CommunicationAddPageModule {}
