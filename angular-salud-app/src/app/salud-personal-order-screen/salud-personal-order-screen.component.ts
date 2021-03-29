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

  constructor(public crudService: CrudService, public router: Router) { }

  ngOnInit(): void {
    this.loadInfo();
  }

  loadInfo(){
    this.SaludUser = this.crudService.getSaludUser(); 
    this.headerText = this.SaludUser.name;
  }

}
