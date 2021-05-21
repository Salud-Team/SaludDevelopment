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
  order = [];
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
          var newOrder = {
            recipient_name: res[counter].recipient.name,
            merchant_name: res[counter].merchant.name,
            profile_pic: res[counter].gifter.picture,
            recipient_pic: res[counter].recipient.picture
          }
          this.order.push(newOrder);
          /*
          this.order += "<div class='order-label'><label>" + "<img width='50px' height='25px' src=" + "\'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fuser-images.githubusercontent.com%2F11250%2F39013954-f5091c3a-43e6-11e8-9cac-37cf8e8c8e4e.jpg&f=1&nofb=1\'" + "/>" +
          "<img width='50px' height='25px' src=" + "\'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fuser-images.githubusercontent.com%2F11250%2F39013954-f5091c3a-43e6-11e8-9cac-37cf8e8c8e4e.jpg&f=1&nofb=1\'" + "/>" 
          + "You sent to " + res[counter].recipient.name  + " items from " + res[counter].merchant.name + ".<p>"  +  "<label></div>";
          */
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
    var v = value.split(","); 
    this.crudService.redeemed_order = v[0]; 
    this.crudService.redeemed_gifter = v[1]; 
    this.crudService.redeemed_merchant = v[2]; 
    this.router.navigate(['/salud-redeem-summary-screen']);
  }

  createNewOrder(){
    this.router.navigate(['/salud-add-recipient-screen']);
  }

  redeemAllOrders(){
    this.router.navigate(['/salud-redeem-order-screen']);
  }

}
