import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { OAuth2Service } from './auth.service';  // Assuming the path is correct
import { SessionService } from './session.service';  // Assuming the path is correct

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private oAuth2Service: OAuth2Service,
    private sessionService: SessionService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {

    if (this.oAuth2Service.oAuth2.isAuthorized()) {
      return true;
    }

    // If the user is not authorized, store the requested URL and perform logout
    if (state.url !== '' && state.url !== '/') {
      this.sessionService.redirectUrl = state.url;
      this.sessionService.logoutMessage = 'You are not logged in';
    }

    this.sessionService.logout();
    return false;
  }
}
