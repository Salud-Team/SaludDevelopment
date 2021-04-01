import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from '../shared/crud.service';

@Component({
  selector: 'app-salud-add-gift-screen',
  templateUrl: './salud-add-gift-screen.component.html',
  styleUrls: ['./salud-add-gift-screen.component.scss']
})
export class SaludAddGiftScreenComponent implements OnInit {

  value: string; 
  merchants = []; 
  beerFilter: boolean = false;
  wineFilter: boolean = false;
  //make only one of the check boxes selectable (one should uncheck if another is checked)

  constructor(public crudService: CrudService, public router: Router) { }

  ngOnInit(): void {
    this.crudService.getMerchantUsersWithSaludUserInfo().subscribe((res: {}) => {
      if (res == undefined){
        console.log("Didnt work");
      }
      else{
        var counter = 0; 
        for (var i in res){
          var merchInfo = {
            id: res[counter].id,
            name: res[counter].name,
            location: res[counter].merchant.location, 
            food_type: res[counter].merchant.food_type
          }; 
          this.merchants.push(merchInfo); 
          counter += 1; 
        }
      }
    }); 
  }

  turnOthersOff(s: string){
    if(s == "Beer"){
      this.wineFilter = false;
    } 
    else if(s == "Wine"){
      this.beerFilter = false;
    } 
  }

  clearFilters(){
    this.beerFilter = false; 
    this.wineFilter = false; 
  }

  hasBeer(name: string){
    if (this.beerFilter == true && !(name.includes("Beer") || name.includes("beer"))){
      return false; 
    }
    return true; 
  }

  hasWine(name: string){
    if (this.wineFilter == true && !(name.includes("Wine") || name.includes("wine"))){
      return false; 
    }
    return true; 
  }

  showItem(name: string){
    console.log(this.value + " is this");
    if ((name.includes(this.value) || this.value == undefined) && this.hasBeer(name) && this.hasWine(name)){
      return true;
    }
    else{
      return false; 
    }
  }

  filter(value){
    this.value = value; 
    console.log(value);
  }

  selectRecipientId(value){
    this.crudService.merchant_id = value; 
    this.router.navigate(['/salud-order-summary-screen']);
  }

}
