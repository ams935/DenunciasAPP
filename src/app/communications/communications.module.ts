import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommunicationsPageRoutingModule } from './communications-routing.module';

import { CommunicationsPage } from './communications.page';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommunicationsPageRoutingModule,
    PipesModule
  ],
  declarations: [CommunicationsPage]
})
export class CommunicationsPageModule {}
