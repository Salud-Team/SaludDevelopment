import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
 

@Component({
  selector: 'app-salud-loading-screen',
  templateUrl: './salud-loading-screen.component.html',
  styleUrls: ['./salud-loading-screen.component.scss']
})
export class SaludLoadingScreenComponent implements OnInit {

  constructor(private router: Router) {
   }

  ngOnInit(): void {
    //wait logic
    this.waitToLoad(); 
  }


  clearPage(): void {
    
  }

  waitToLoad(): void{
    this.resolveAfter5Seconds(20).then(value => {
      this.router.navigate(['/salud-welcome-screen']);
    });
  }

  resolveAfter5Seconds(x) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(x);
      }, 5000);
    });
  }

}
