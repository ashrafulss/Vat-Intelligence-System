import { Injectable } from '@angular/core';
import { resourceServerUrl } from '../../../common/constants/server-settings';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { getHttpHeaders } from '../../../common/constants/constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommissionerateService {

  constructor(private http: HttpClient) { }

  getCommissionerates(): Observable<HttpResponse<any>> {
    const url: string = `${resourceServerUrl}/v1/commissionerate/all`;
    return this.http.get(url, {
        headers: getHttpHeaders(), observe: 'response'
    });
  }






  getDivisions(commissionerateOid: string): Observable<HttpResponse<any>> {
    let url ="";

    // if(commissionerateOid =='' || commissionerateOid==null){
    //   url = `${resourceServerUrl}/v1/division/all`;
    // } else{
    //   url = `${resourceServerUrl}/v1/division/commissionerate/${commissionerateOid}`;
    // }


    url = `${resourceServerUrl}/v1/division/commissionerate/${commissionerateOid}`;

    return this.http.get(url, {
        headers: getHttpHeaders(), observe: 'response'
    });



  }




  getCircles(divisionOid: string, commissionerateOid: string): Observable<HttpResponse<any>> {
    let url ="";
      url = `${resourceServerUrl}/v1/circle/division/${divisionOid}`;
    return this.http.get(url, {
      params: new HttpParams()
            .set('commissionerateOid', commissionerateOid ? commissionerateOid.toString() : ''),
        headers: getHttpHeaders(), observe: 'response'
    });
  }




  getTaxPayers(circleOid: string, divisionOid: string, commissionerateOid: string): Observable<HttpResponse<any>> {
    let url ="";
      url = `${resourceServerUrl}/v1/taxpayer/circle/${circleOid}`;
    return this.http.get(url, {
      params: new HttpParams()
            .set('divisionOid', divisionOid ? divisionOid.toString() : '')
            .set('commissionerateOid', commissionerateOid ? commissionerateOid.toString() : ''),
        headers: getHttpHeaders(), observe: 'response'
    });
  }


}
