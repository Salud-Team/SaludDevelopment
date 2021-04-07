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
      this.router.navigate(['/salud-order-confirmation-screen']);
    }
  }

}
