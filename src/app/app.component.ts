import { Component } from '@angular/core';
import { appRouteAnimations } from './app-routing.animations';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [appRouteAnimations],
})
export class AppComponent {
  title = 'bas-app';



  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'] || null;
  }
  
}
