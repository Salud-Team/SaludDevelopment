import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from '../shared/crud.service';

@Component({
  selector: 'app-salud-thank-you-order-screen',
  templateUrl: './salud-thank-you-order-screen.component.html',
  styleUrls: ['./salud-thank-you-order-screen.component.scss']
})
export class SaludThankYouOrderScreenComponent implements OnInit {

  constructor(public crudService: CrudService, public router: Router) { }

  ngOnInit(): void {
  }

  backToOrderScreen(){
    this.router.navigate(['/salud-personal-order-screen']);
  }

}
