import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Observable} from 'rxjs';
import { CrudService } from '../shared/crud.service';

@Component({
  selector: 'app-salud-login-personal-screen',
  templateUrl: './salud-login-personal-screen.component.html',
  styleUrls: ['./salud-login-personal-screen.component.scss']
})
export class SaludLoginPersonalScreenComponent implements OnInit {

  email:string; 
  password:string; 
  correct: boolean = false; 

  private loginApi = "http://localhost:8080/SaludUserdata"; 

  constructor(public crudService: CrudService, public router: Router) {
   }

  ngOnInit(): void {
  }

  login(em, pas){
    this.email = em; 
    this.password = pas; 
    console.log(this.email);
    console.log(this.password); 
    if (this.email.trim() == "" && this.password.trim() == ""){
      this.correct = true; 
    }
    else{
      this.validate();
    } 
  }

  validate() {
    return this.crudService.validateLogin(this.email, this.password).subscribe((res: {}) => {
      if (res[0] == undefined){
        console.log("Didnt work");
        this.correct = true; 
      }
      else{
        this.correct = false;
        console.log(res[0].name);
        this.crudService.saveSaludUser(res[0].name, res[0].id, res[0].phone_num, res[0].email, res[0].password, res[0].personalUser);
        this.router.navigate(['/salud-personal-order-screen']);
      }
    }); 
    /*
    return this.crudService.getSaludUsers().subscribe((res: {}) => {
      console.log(res);
    })
    */
  }

}
