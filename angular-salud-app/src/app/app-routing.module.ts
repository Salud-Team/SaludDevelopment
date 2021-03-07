import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SaludLoadingScreenComponent } from './salud-loading-screen/salud-loading-screen.component';
import { SaludSignupScreenComponent } from './salud-signup-screen/salud-signup-screen.component';
import { SaludWelcomeScreenComponent } from './salud-welcome-screen/salud-welcome-screen.component';

/*
const routes: Routes = [
  {path: 'salud-loading-screen', component: SaludLoadingScreenComponent},
  {path: 'salud-welcome-screen', component: SaludWelcomeScreenComponent},
  {path: 'salud-signup-screen', component: SaludSignupScreenComponent}
];
*/


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  routes: Routes; 
}
