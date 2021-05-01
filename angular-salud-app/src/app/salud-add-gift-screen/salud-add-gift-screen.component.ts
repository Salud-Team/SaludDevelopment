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
  cities = []; 
  filtered_city: string = "" ;
  //make only one of the check boxes selectable (one should uncheck if another is checked)

  constructor(public crudService: CrudService, public router: Router) { }

  ngOnInit(): void {
    this.cities.push(""); 
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
            city: res[counter].merchant.city,
            state: res[counter].merchant.state, 
            zip_code: res[counter].merchant.zip_code,
            food_type: res[counter].merchant.food_type
          }; 
          this.merchants.push(merchInfo); 
          var city_state = merchInfo.city + ", " + merchInfo.state; 
          this.cities.push(city_state);
          counter += 1; 
        }
      }
    }); 
  }

  turnOthersOff(s: string){
    if(s == "Beer"){
      this.beerFilter = true; 
      this.wineFilter = false;
    } 
    else if(s == "Wine"){
      this.beerFilter = false;
      this.wineFilter = true;
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
    console.log(this.filtered_city);
    console.log(this.value + " is this");
    if (((name.includes(this.value))|| this.value == undefined) && this.hasBeer(name) && this.hasWine(name) && name.includes(this.filtered_city)){
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
