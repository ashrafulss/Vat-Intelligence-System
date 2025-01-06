import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { resourceServerUrl } from '../../constants/server-settings';
import { getHttpHeaders } from '../../constants/constants';



@Injectable({
    providedIn: 'root'
})
export class NavbarService {

    constructor(private http: HttpClient) { }

    getUserProfileInfo(): Observable<HttpResponse<any>> {
        return this.http.get(`${resourceServerUrl}/v1/user`, {
            
            headers: getHttpHeaders(),

            observe: 'response'
        });
    }
}
