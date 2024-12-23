import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{



  activeLink: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Detect route changes
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.activeLink = this.router.url === '/dashboard';
      }
    });
  }

}
