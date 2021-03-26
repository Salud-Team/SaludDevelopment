import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-salud-login-personal-screen',
  templateUrl: './salud-login-personal-screen.component.html',
  styleUrls: ['./salud-login-personal-screen.component.scss']
})
export class SaludLoginPersonalScreenComponent implements OnInit {

  email:string; 
  password:string; 

  private loginApi = "http://localhost:8080/SaludUserdata"; 

  constructor() { }

  ngOnInit(): void {
  }

  login(em, pas){
    this.email = em; 
    this.password = pas; 
    console.log(this.email);
    console.log(this.password);
  }

}
