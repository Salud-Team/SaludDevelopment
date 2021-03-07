import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SaludWelcomeScreenComponent } from './salud-welcome-screen/salud-welcome-screen.component';
import { SaludSignupScreenComponent } from './salud-signup-screen/salud-signup-screen.component';
import { SaludLoadingScreenComponent } from './salud-loading-screen/salud-loading-screen.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    SaludWelcomeScreenComponent,
    SaludSignupScreenComponent,
    SaludLoadingScreenComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: '', component: SaludLoadingScreenComponent}, 
      {path: 'salud-loading-screen', component: SaludLoadingScreenComponent},
      {path: 'salud-welcome-screen', component: SaludWelcomeScreenComponent},
      {path: 'salud-signup-screen', component: SaludSignupScreenComponent},
    ])
    //AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
