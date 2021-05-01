import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from '../shared/crud.service';

@Component({
  selector: 'app-salud-order-summary-screen',
  templateUrl: './salud-order-summary-screen.component.html',
  styleUrls: ['./salud-order-summary-screen.component.scss']
})
export class SaludOrderSummaryScreenComponent implements OnInit {

  recipient_name: String = ""; 
  options = []; 
  chosen_option: string = ""; 
  checkCustomAmount: boolean = false;
  amount: number = 0; 
  order_description: string = "";
  occasion: string = "";  
  url: any;
  picture_preview: string = ""; 

  constructor(public crudService: CrudService, public router: Router) { }

  ngOnInit(): void {
    this.crudService.getUserById(this.crudService.recipient_id).subscribe((res: {}) => {
      if (res == undefined){
        console.log("User no longer exists");
      }
      else{
        this.recipient_name = res[0].name; 
      }
    }); 
    this.crudService.getMerchantById(this.crudService.merchant_id).subscribe((res: {}) => {
      if (res == undefined){
        console.log("User no longer exists");
      }
      else{
        console.log(res);
        var products = res[0].merchant.food_type.split(",");
        for (var i in products){
          console.log(i);
          this.options.push(products[i] + " in " + res[0].name); 
        }
      }
    });
  }

  selectFile(event: any) { //Angular 11, for stricter type
		if(!event.target.files[0] || event.target.files[0].length == 0) {
			//this.msg = 'You must select an image';
			return;
		}
		
		var mimeType = event.target.files[0].type;
    var type = mimeType.split("/")[1];
		
    
		if (mimeType.match(/video\/*/) == null) {
			//this.msg = "Only images are supported";
      console.log("Must be a video type");
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
    //this.picture_preview = urlCreator.createObjectURL(event.target.files[0]); 
	}

  textDisplayForCustomButton(){
    if (this.checkCustomAmount == false){
      return "Other"
    }
    else{
      return "$" + this.amount; 
    }
  }

  toggleCustomAmount(){
    this.checkCustomAmount = !this.checkCustomAmount; 
  }

  setAmount(num: number){
    if (num == 25 || num == 50 || num == 100){
      this.checkCustomAmount = false; 
    }
    this.amount = num; 
  }

  setDescription(h: string){
    this.order_description = h; 
  }

  changeOption(){
    this.crudService.food_type = this.chosen_option; 
  }

  toOrderConfirmationScreen(){
    if (this.amount != 0){
      this.crudService.order_description = this.order_description; 
      this.crudService.order_amount = this.amount; 
      this.crudService.occasion = this.occasion;
      this.crudService.video_link = this.picture_preview; 
      this.router.navigate(['/salud-order-confirmation-screen']);
    }
  }

}
