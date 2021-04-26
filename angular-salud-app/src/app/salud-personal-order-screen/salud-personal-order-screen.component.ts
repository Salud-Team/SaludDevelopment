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
  orderReceived: string = "";
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
          this.order += "<div class='order-label'><label> You sent to " + res[counter].recipient.name  + " items from " + res[counter].merchant.name + ".<p><label></div>";
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
          this.orderReceived += "<div class='order-label'><label>" + res[counter].gifter.name + " sent to You " + "items from " + res[counter].merchant.name +  ".<p><label></div>";
          counter += 1; 
        }
      }
    });
    //console.log(this.crudService.getSaludUsers());
  }

  createNewOrder(){
    this.router.navigate(['/salud-add-recipient-screen']);
  }

  redeemAllOrders(){
    this.router.navigate(['/salud-redeem-order-screen']);
  }

}
