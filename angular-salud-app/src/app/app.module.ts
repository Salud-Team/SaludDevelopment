import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {OverlayModule} from '@angular/cdk/overlay'

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
import { SaludOrderSummaryScreenComponent } from './salud-order-summary-screen/salud-order-summary-screen.component';
import { SaludOrderConfirmationScreenComponent } from './salud-order-confirmation-screen/salud-order-confirmation-screen.component';
import { SaludThankYouOrderScreenComponent } from './salud-thank-you-order-screen/salud-thank-you-order-screen.component';
import { SaludMerchantMainScreenComponent } from './salud-merchant-main-screen/salud-merchant-main-screen.component';
import { SaludRedeemOrderScreenComponent } from './salud-redeem-order-screen/salud-redeem-order-screen.component';
import { SaludRedeemSummaryScreenComponent } from './salud-redeem-summary-screen/salud-redeem-summary-screen.component';
import { ClickOutsideModule } from 'ng-click-outside';

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
    SaludOrderSummaryScreenComponent, 
    SaludOrderConfirmationScreenComponent, 
    SaludThankYouOrderScreenComponent, 
    SaludMerchantMainScreenComponent, 
    SaludRedeemOrderScreenComponent, 
    SaludRedeemSummaryScreenComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule, 
    HttpClientModule,
    OverlayModule,
    ClickOutsideModule,
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
      {path: 'salud-order-summary-screen', component: SaludOrderSummaryScreenComponent},
      {path: 'salud-order-confirmation-screen', component: SaludOrderConfirmationScreenComponent},
      {path: 'salud-thank-you-order-screen', component: SaludThankYouOrderScreenComponent},
      {path: 'salud-merchant-main-screen', component: SaludMerchantMainScreenComponent},
      {path: 'salud-redeem-order-screen', component: SaludRedeemOrderScreenComponent},
      {path: 'salud-redeem-summary-screen', component: SaludRedeemSummaryScreenComponent},
    ])
    //AppRoutingModule
  ],
  providers: [CrudService],
  bootstrap: [AppComponent]
})
export class AppModule { }
