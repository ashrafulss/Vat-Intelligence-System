import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { getHttpHeaders } from '../../common/constants/constants';
import { resourceServerUrl } from '../../common/constants/server-settings';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  
  


  constructor(private http: HttpClient) {
  }


  






  getDashboardCount(): Observable<HttpResponse<any>> {
    const url: string = `${resourceServerUrl}/v1/dashboard`;
    return this.http.get(url, {
        params: new HttpParams(),
        headers: getHttpHeaders(), observe: 'response'
    });
}


}



