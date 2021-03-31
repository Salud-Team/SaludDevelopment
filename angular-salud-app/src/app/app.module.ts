import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

//import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SaludWelcomeScreenComponent } from './salud-welcome-screen/salud-welcome-screen.component';
import { SaludSignupScreenComponent } from './salud-signup-screen/salud-signup-screen.component';
import { SaludLoadingScreenComponent } from './salud-loading-screen/salud-loading-screen.component';
import { RouterModule } from '@angular/router';
import { SaludLoginPersonalScreenComponent } from './salud-login-personal-screen/salud-login-personal-screen.component';
import { SaludLoginMerchantScreenComponent } from './salud-login-merchant-screen/salud-login-merchant-screen.component';
import { SaludPersonalOrderScreenComponent } from './salud-personal-order-screen/salud-personal-order-screen.component';
import { CrudService } from './shared/crud.service';
import { SaludAddRecipientScreenComponent } from './salud-add-recipient-screen/salud-add-recipient-screen.component';
import { SaludAddGiftScreenComponent } from './salud-add-gift-screen/salud-add-gift-screen.component';

@NgModule({
  declarations: [
    AppComponent,
    SaludWelcomeScreenComponent,
    SaludSignupScreenComponent,
    SaludLoadingScreenComponent,
    SaludLoginPersonalScreenComponent,
    SaludLoginMerchantScreenComponent,
    SaludPersonalOrderScreenComponent, 
    SaludPersonalOrderScreenComponent, 
    SaludAddRecipientScreenComponent, 
    SaludAddGiftScreenComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule, 
    HttpClientModule,
    RouterModule.forRoot([
      {path: '', component: SaludLoadingScreenComponent}, 
      {path: 'salud-loading-screen', component: SaludLoadingScreenComponent},
      {path: 'salud-welcome-screen', component: SaludWelcomeScreenComponent},
      {path: 'salud-signup-screen', component: SaludSignupScreenComponent},
      {path: 'salud-login-personal-screen', component: SaludLoginPersonalScreenComponent},
      {path: 'salud-login-merchant-screen', component: SaludLoginMerchantScreenComponent},
      {path: 'salud-personal-order-screen', component: SaludPersonalOrderScreenComponent},
      {path: 'salud-add-recipient-screen', component: SaludAddRecipientScreenComponent},
      {path: 'salud-add-gift-screen', component: SaludAddGiftScreenComponent}, 
    ])
    //AppRoutingModule
  ],
  providers: [CrudService],
  bootstrap: [AppComponent]
})
export class AppModule { }
