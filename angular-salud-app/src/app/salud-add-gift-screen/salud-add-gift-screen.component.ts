import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { threadId } from 'node:worker_threads';
import { CrudService } from '../shared/crud.service';

@Component({
  selector: 'app-salud-add-gift-screen',
  templateUrl: './salud-add-gift-screen.component.html',
  styleUrls: ['./salud-add-gift-screen.component.scss']
})
export class SaludAddGiftScreenComponent implements OnInit {

  constructor(public crudService: CrudService, public router: Router) { }

  ngOnInit(): void {
    this.crudService.getMerchantUsers().subscribe((res: {}) => {
      if (res == undefined){
        console.log("Didnt work");
      }
      else{
        var counter = 0; 
        for (var i in res){
          var order = {
            id: res[counter].id,
            name: res[counter].name
          }; 
          counter += 1; 
        }
      }
    }); 
  }

  

}
