import {catchError} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {forkJoin, Observable, of} from 'rxjs';

import {HomeComponent} from './home.component';

import { SessionService } from '../../common/services/session.service';
import { NavbarService } from '../navbar/navbar.service';


@Injectable({providedIn: 'root'})
export class HomeResolver implements Resolve<HomeComponent> {

    constructor(private navbarService: NavbarService,
                private sessionService: SessionService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

        return forkJoin(this.navbarService.getUserProfileInfo()).pipe(catchError((error: any) => {
            // console.error(error.message);
            this.sessionService.logout();
            return of(null);
        }));
    }
    
}
