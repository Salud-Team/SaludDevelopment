import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from '../shared/crud.service';

@Component({
  selector: 'app-salud-signup-screen',
  templateUrl: './salud-signup-screen.component.html',
  styleUrls: ['./salud-signup-screen.component.scss']
})
export class SaludSignupScreenComponent implements OnInit {

  chosen_option: string = ""; 
  options = []; 
  showPersonalUserInfo: boolean = true; 
  showMerchantUserInfo: boolean = false; 
  name: string = ""; 
  phone_num: string = ""; 
  email: string = "";
  password: string = ""; 
  address: string = ""; 
  street: string = ""; 
  city: string = ""; 
  state: string = ""; 
  zipcode: string = ""; 
  food_type: string = ""; 
  picture_preview: string = ""; 
  url: any; 

  selectFile(event: any) { //Angular 11, for stricter type
		if(!event.target.files[0] || event.target.files[0].length == 0) {
			//this.msg = 'You must select an image';
			return;
		}
		
		var mimeType = event.target.files[0].type;
    var type = mimeType.split("/")[1];
		
		if (mimeType.match(/image\/*/) == null) {
			//this.msg = "Only images are supported";
			return;
		}
		
		var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);

    console.log(event.target.files[0]);
		
		reader.onload = (_event) => {
			//this.msg = "";
			this.url = reader.result;  
		}
    var urlCreator = window.URL || window.webkitURL; 
    this.picture_preview = urlCreator.createObjectURL(event.target.files[0]); 
	}

  constructor(public crudService: CrudService, public router: Router) { }

  ngOnInit(): void {
    this.populateOptions(); 
  }
  
  populateOptions(){
    this.options.push("Apple Pay");
    this.options.push("Google Play Services");
    this.options.push("PayPal");
  }

  addName(s: string){
    this.name = s; 
  }

  addPhoneNum(s: string){
    this.phone_num = s; 
  }

  addEmail(s: string){
    this.email = s; 
  }

  addPassword(s: string){
    this.password = s; 
  }

  addStreet(s: string){
    this.street = s; 
  }

  addCity(s: string){
    this.city = s; 
  }

  addState(s: string){
    this.state = s; 
  }

  addZipCode(s: string){
    this.zipcode = s; 
  }

  addFoodType(s: string){
    this.food_type = s; 
  }

  togglePersonalUser(){
    this.showPersonalUserInfo = true; 
    this.showMerchantUserInfo = false; 
  }

  toggleMerchantUser(){
    this.showPersonalUserInfo = false; 
    this.showMerchantUserInfo = true; 
  }

  loadFile(event){
    this.url = URL.createObjectURL(event.target.files[0]);
    console.log(this.url);
  }

  submitPersonalUser(){
    if(this.name == ""|| this.phone_num == "" || this.email == "" || this.password == "" || this.chosen_option == ""){
      console.log("Fill out all the options");
      console.log(this.chosen_option);
    }
    else{
      console.log(this.picture_preview);
      this.crudService.createPersonalUser(this.name, this.phone_num, this.email, this.password, this.chosen_option, this.picture_preview).subscribe((res: {}) => {
        if (res == undefined){
          console.log("Didnt work");
        }
        else{
          console.log("created!")
          this.router.navigate(['/salud-login-personal-screen']);
        }
      }); 
    }
  }

  submitMerchantUser(){
    if(this.name == ""|| this.phone_num == "" || this.email == "" || this.password == "" || this.street == "" || this.city == "" || this.state == "" || this.zipcode == "" || this.food_type == ""){
      console.log("Fill out all the options");
    }
    else{
      this.address = this.street + " " + this.city + ", " + this.state + " " + this.zipcode; 
      this.crudService.createMerchantUser(this.name, this.phone_num, this.email, this.password, this.address, this.food_type, this.picture_preview).subscribe((res: {}) => {
        if (res == undefined){
          console.log("Didnt work");
        }
        else{
          console.log("created!")
          this.router.navigate(['/salud-login-merchant-screen']);
        }
      }); 
    }
  }

}
