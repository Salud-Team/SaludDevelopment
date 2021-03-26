import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-salud-welcome-screen',
  templateUrl: './salud-welcome-screen.component.html',
  styleUrls: ['./salud-welcome-screen.component.scss']
})
export class SaludWelcomeScreenComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateToSignupPage(){
    this.router.navigate(['/salud-signup-screen']);
  }

  navigateToLoginPage(){
    this.router.navigate(['/salud-login-personal-screen']);
  }

  navigateToMerchantLoginPage(){
    this.router.navigate(['/salud-login-merchant-screen']);
  }

}
