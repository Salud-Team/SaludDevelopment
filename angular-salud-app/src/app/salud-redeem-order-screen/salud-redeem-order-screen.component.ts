import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from '../shared/crud.service';

@Component({
  selector: 'app-salud-redeem-order-screen',
  templateUrl: './salud-redeem-order-screen.component.html',
  styleUrls: ['./salud-redeem-order-screen.component.scss']
})
export class SaludRedeemOrderScreenComponent implements OnInit {

  giftedHTMLList = [];
  value: string = ""; 

  constructor(public crudService: CrudService, public router: Router) { }

  ngOnInit(): void {
    this.getAllGiftsIntoSearchDiv();
  }

  filter(value){
    this.value = value; 
    console.log(value);
  }

  showItem(name: string){
    if (name.includes(this.value)){
      return true;
    }
    else{
      return false; 
    }
  }

  getAllGiftsIntoSearchDiv(){
    this.crudService.getCurrentReceievedBigOrdersOfUser(this.crudService.getSaludUser().id).subscribe((res: {}) => {
      if (res == undefined){
        console.log("Didnt work");
      }
      else{
        console.log(res);
        var counter = 0;
        for (var i in res){
          var order = {
            order_id: res[counter].id,
            gifter: res[counter].gifter.name,
            merchant: res[counter].merchant.name,
            title: "From: " + res[counter].gifter.name + " for " + res[counter].merchant.name + "."
          };
          console.log(order);
          this.giftedHTMLList.push(order); 
          counter += 1;
        }
      }
    }); 
    /*
    this.crudService.getReceivedUserOrders(this.crudService.getSaludUser().id).subscribe((res: {}) => {
      if (res == undefined){
        console.log("Didnt work");
      }
      else{
        console.log(res);
        var counter = 0; 
        for (var i in res){
          var order = {
            order_id: res[counter].id,
          };
          console.log("Values in here are: " + res[counter].gifter_id + "and" + res[counter].merchant_id);
          this.crudService.getUserById(res[counter].gifter_id).subscribe((res: {}) => {
            order["giftername"] = res[0].name; 
          }); 
          this.crudService.getUserById(res[counter].merchant_id).subscribe((res: {}) => {
            order["merchantname"] = res[0].name; 
          }); 
          console.log(order);
          this.giftedHTMLList.push(order); 
          counter += 1; 
        }
      }
    }); 
    */
    
  }

  selectRecipientId(value){
    //this.chosenRecipientId = value; 
    console.log(value);
    this.crudService.redeemed_order = value; 
    this.router.navigate(['/salud-redeem-summary-screen']);
  }

}
