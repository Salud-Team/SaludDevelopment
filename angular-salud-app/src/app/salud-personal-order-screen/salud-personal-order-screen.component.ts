import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from '../shared/crud.service';

@Component({
  selector: 'app-salud-personal-order-screen',
  templateUrl: './salud-personal-order-screen.component.html',
  styleUrls: ['./salud-personal-order-screen.component.scss']
})
export class SaludPersonalOrderScreenComponent implements OnInit {

  SaludUser; 
  headerText: string; 
  order: string = "";
  orderReceived = [];
  renderGifted: boolean = false; 
  renderPersonal: boolean = false; 

  constructor(public crudService: CrudService, public router: Router) { }

  ngOnInit(): void {
    this.loadInfo();
  }

  loadInfo(){
    this.SaludUser = this.crudService.getSaludUser(); 
    this.headerText = this.SaludUser.name;
    this.crudService.getBigOrdersOfUser(this.SaludUser.id).subscribe((res: {}) => {
      if (res == undefined){
        console.log("Didnt work");
      }
      else{
        console.log(res);
        var counter = 0; 
        for (var i in res){
          this.order += "<div class='order-label'><label> You sent to " + res[counter].recipient.name  + " items from " + res[counter].merchant.name + ".<p>" 
          + "<img width='50px' height='25px' src=" + "\'" + res[counter].gifter.picture + "/>" + "<img width='50px' height='25px' src=" + "\'" + res[counter].recipient.picture + "/>" +  "<label></div>";
          counter += 1; 
        }
      }
    }); 
    //Add a new function that separates redeemed from unredeemed to properly sort them for user
    //Then make them buttons like how redeem order works currently. 
    this.crudService.getReceievedBigOrdersOfUser(this.SaludUser.id).subscribe((res: {}) => {
      if (res == undefined){
        console.log("Didnt work");
      }
      else{
        console.log(res);
        var counter = 0; 
        for (var i in res){
          var newReceivedOrder = {
            id: res[counter].id, 
            gifter_name: res[counter].gifter.name, 
            recipient_name: res[counter].recipient.name, 
            gifter_pic: res[counter].gifter.picture, 
            recipient_pic: res[counter].recipient.picture, 
            merchant_name: res[counter].merchant.name
          }
          this.orderReceived.push(newReceivedOrder); 
          //this.orderReceived += "<div class='order-label'><label (click)='Hi()'>" + res[counter].gifter.name + " sent to You " + "items from " + res[counter].merchant.name +  ".<p>" 
          //+ "<img width='50px' height='25px' src=" + "\'" + res[counter].gifter.picture + "/>" + "<img width='50px' height='25px' src=" + "\'" + res[counter].recipient.picture + "/>" +  "<label></div>";
          counter += 1; 
        }
      }
    });
    //console.log(this.crudService.getSaludUsers());
  }

  Hi(){
    console.log("Hello");
  }

  selectRecipientId(value){
    //this.chosenRecipientId = value; 
    console.log(value);
    this.crudService.redeemed_order = value; 
    this.router.navigate(['/salud-redeem-summary-screen']);
  }

  createNewOrder(){
    this.router.navigate(['/salud-add-recipient-screen']);
  }

  redeemAllOrders(){
    this.router.navigate(['/salud-redeem-order-screen']);
  }

}
