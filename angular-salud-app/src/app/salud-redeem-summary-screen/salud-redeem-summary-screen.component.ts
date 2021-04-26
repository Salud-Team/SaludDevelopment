import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from '../shared/crud.service';

@Component({
  selector: 'app-salud-redeem-summary-screen',
  templateUrl: './salud-redeem-summary-screen.component.html',
  styleUrls: ['./salud-redeem-summary-screen.component.scss']
})
export class SaludRedeemSummaryScreenComponent implements OnInit {

  constructor(public crudService: CrudService, public router: Router) { }

  ngOnInit(): void {
  }

  getOrderInfo(){
    this.crudService.getOrder(this.crudService.redeemed_order).subscribe((res: {}) => {
      if (res == undefined){

      }
      else{

      }
    }); 
  }

}
