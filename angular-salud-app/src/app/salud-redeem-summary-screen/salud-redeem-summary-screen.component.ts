import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from '../shared/crud.service';

@Component({
  selector: 'app-salud-redeem-summary-screen',
  templateUrl: './salud-redeem-summary-screen.component.html',
  styleUrls: ['./salud-redeem-summary-screen.component.scss']
})
export class SaludRedeemSummaryScreenComponent implements OnInit {

  qrCode: any; 
  description: string = ""; 
  picture: string = "assets/images/giftBox.png"; 

  constructor(public crudService: CrudService, public router: Router) { }

  ngOnInit(): void {
    this.getOrderInfo();
  }

  getOrderInfo(){
    this.crudService.createOrderQRCode(this.crudService.redeemed_order).subscribe((res: {}) => {
      if (res == undefined){
        console.log("Server not up");
      }
      else{ 
        console.log("Created QR Code");
      }
    }); 
  }

  loadOrderQRCode(){
    this.crudService.createOrderQRCode(this.crudService.redeemed_order).subscribe((res: {}) => {
      if (res == undefined){
        console.log("Server not up");
      }
      else{ 
        console.log(res);
        this.description = res[0].description; 
        this.qrCode = res[0].qrCode; 
        this.picture = this.qrCode; 
      }
    }); 
  }


}
