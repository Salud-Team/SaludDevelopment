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

  constructor(public crudService: CrudService, public router: Router) { }

  ngOnInit(): void {
    this.loadInfo();
  }

  loadInfo(){
    this.SaludUser = this.crudService.getSaludUser(); 
    this.headerText = this.SaludUser.name;
    this.crudService.getUserOrders(this.SaludUser.id).subscribe((res: {}) => {
      if (res == undefined){
        console.log("Didnt work");
      }
      else{
        console.log(res);
        var counter = 0; 
        for (var i in res){
          this.order += "<p> Order:" + res[counter].id + "Gifter_ID:" + res[counter].gifter_id + "Receiverer_ID:" + res[counter].receiver_id + "Description:" + res[counter].description + "</p>";
          counter += 1; 
        }
      }
    }); 
    //console.log(this.crudService.getSaludUsers());
  }

}
