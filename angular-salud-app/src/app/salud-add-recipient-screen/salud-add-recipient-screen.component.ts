import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from '../shared/crud.service';

@Component({
  selector: 'app-salud-add-recipient-screen',
  templateUrl: './salud-add-recipient-screen.component.html',
  styleUrls: ['./salud-add-recipient-screen.component.scss']
})
export class SaludAddRecipientScreenComponent implements OnInit {

  chosenRecipientId: number; 
  recipientHTMLList = []; 
  value: string = ""; 

  constructor(public crudService: CrudService, public router: Router) { }

  ngOnInit(): void {
    this.pullAllUsersIntoSearchDiv(); 
  }

  pullAllUsersIntoSearchDiv(){
    this.crudService.getOtherPersonalUsers(this.crudService.getSaludUser().id).subscribe((res: {}) => {
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
          console.log(order);
          this.recipientHTMLList.push(order); 
          counter += 1; 
        }
      }
    }); 
    
  }

  showItem(name: string){
    console.log("here");
    if (name.includes(this.value)){
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
    this.chosenRecipientId = value; 
    console.log(value);
    this.crudService.recipient_id = value; 
    this.router.navigate(['/salud-add-gift-screen']);
  }

}