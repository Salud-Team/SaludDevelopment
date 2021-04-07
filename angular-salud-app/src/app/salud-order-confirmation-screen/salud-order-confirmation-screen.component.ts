import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from '../shared/crud.service';

@Component({
  selector: 'app-salud-order-confirmation-screen',
  templateUrl: './salud-order-confirmation-screen.component.html',
  styleUrls: ['./salud-order-confirmation-screen.component.scss']
})
export class SaludOrderConfirmationScreenComponent implements OnInit {

  recipient_name: String = "";
  merchant_name: String = ""; 
  merchant_address: String = ""; 
  total: number = 0; 

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
        this.merchant_name = res[0].name; 
        this.merchant_address = res[0].merchant.location; 
      }
    });
  }


  placeOrder(){
    this.crudService.createOrder(this.crudService.savedSaludUser.id, this.crudService.recipient_id, this.crudService.merchant_id, this.crudService.order_amount, this.crudService.order_description).subscribe((res: {}) => {
      this.router.navigate(['/salud-thank-you-order-screen']);
      /*
      if (res == undefined){
        console.log("User no longer exists");
      }
      else if(res == "Entered unsuccessfully."){
        console.log("Order Not Created.");
      }
      else{
        this.router.navigate(['/salud-thank-you-order-screen']);
      }
      */
    });
  }


}
