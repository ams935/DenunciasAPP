import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from "./services/auth-guard.service";

const routes: Routes = [
  { path: 'login', loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule) },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'communications/:user_id', loadChildren: () => import('./communications/communications.module').then( m => m.CommunicationsPageModule) },
  { path: 'communications/communication/:communication_id', loadChildren: () => import('./communications/communication/communication.module').then( m => m.CommunicationPageModule) },
  { path: 'communications/:user_id/communication-add/:communication_id', 
          loadChildren: () => import('./communications/communication-add/communication-add.module').then( m => m.CommunicationAddPageModule)},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
