import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { SessionService } from '../../services/shared.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{



  public isLoading: boolean = false;
  public userName: string = '';


  
rlam: any;
  constructor(private _router: Router, private sessionService: SessionService, private route: ActivatedRoute, ) {}
 



 

onLogoutClick() {
  // console.log('hello done');
 this.isLoading = true;
        this.sessionService.logout();

       
        
}



  activeLink: boolean = false;

  ngOnInit(): void {
    // Detect route changes
    this._router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.activeLink = this._router.url === '/dashboard';
      }
    });




    // --------------------------------


    if (this.route.snapshot.data['home']) {
      this.route.data
          .subscribe(data => {
              if (data['home'][0]) {
                  /* previously it was this.userName = data.home[0].body.userName; 
                  changing this.userName = data.home[0].body.userId to show name as body.userName is not passed!!!
                  */
                  this.userName = data['home'][0].body.userId;
              
                  
              }
          });


  }









  }

}
