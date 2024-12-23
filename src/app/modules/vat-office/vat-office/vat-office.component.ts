import { Component } from '@angular/core';
import { appRouteAnimations } from '../../../app-routing.animations';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-vat-office',
  templateUrl: './vat-office.component.html',
  styleUrl: './vat-office.component.css',
  animations: [appRouteAnimations],
})
export class VatOfficeComponent {


  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

}
