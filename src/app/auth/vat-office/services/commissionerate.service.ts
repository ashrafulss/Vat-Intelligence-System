import { Injectable } from '@angular/core';
import { resourceServerUrl } from '../../../common/constants/server-settings';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { getHttpHeaders } from '../../../common/constants/constants';
import { BehaviorSubject, catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommissionerateService {


  private apiUrl = `${resourceServerUrl}/v1/commissionerate/create`;  
  private apiDeleteCommissionerate = `${resourceServerUrl}/v1/commissionerate/delete`;  
  private apiUpdateCommissionerate = `${resourceServerUrl}/v1/commissionerate/update`;  

  private apiDivisionCreate = `${resourceServerUrl}/v1/division/create`;  
  private apiDivisionDelete = `${resourceServerUrl}/v1/division/delete`; 
  private apiDivisionUpdate = `${resourceServerUrl}/v1/division/update`;  

  private apiCircleCreate = `${resourceServerUrl}/v1/circle/create`;  
  private apiCircleDelete = `${resourceServerUrl}/v1/circle/delete`; 
  private apiCircleUpdate = `${resourceServerUrl}/v1/circle/update`;  

  private apiTaxpayerCreate = `${resourceServerUrl}/v1/taxpayer/create`; 
  private apiTaxpayerDelete = `${resourceServerUrl}/v1/taxpayer/delete`;  
  private apiTaxpayerUpdate = `${resourceServerUrl}/v1/taxpayer/update`;   
 

  constructor(private http: HttpClient) { }



  getCommissionerates(): Observable<HttpResponse<any>> {
    const url: string = `${resourceServerUrl}/v1/commissionerate/all`;
    return this.http.get(url, {
        headers: getHttpHeaders(), observe: 'response'
    });
  }




  saveCommissionerates(name: string): Observable<HttpResponse<any>> {
    const payload = { name: name };
    return this.http.post<HttpResponse<any>>(this.apiUrl, payload, {
      headers: getHttpHeaders(),
      observe: 'response'
    });
  }


  updateCommissionerate(id: string, name: string): Observable<HttpResponse<any>> {
    const payload = { name: name };
    return this.http.put<HttpResponse<any>>(`${this.apiUpdateCommissionerate}/${id}`, payload, {
      headers: getHttpHeaders(),
      observe: 'response'
    });
  }
  

  updateDivision(id: string, commissionerateoid: string, name: string): Observable<HttpResponse<any>> {
    
    const payload = { name: name, commissionerateoid:commissionerateoid };
    return this.http.put<HttpResponse<any>>(`${this.apiDivisionUpdate}/${id}`, payload, {
      headers: getHttpHeaders(),
      observe: 'response'
    });
  }


  updateCircle(id: string, commissionerateoid: string, divisionoid:string, name: string): Observable<HttpResponse<any>> {
    const payload = { name: name, commissionerateoid:commissionerateoid, divisionoid:divisionoid };
    return this.http.put<HttpResponse<any>>(`${this.apiCircleUpdate}/${id}`, payload, {
      headers: getHttpHeaders(),
      observe: 'response'
    });
  }


  updateTAXpayer(id: string, 
    
    commissionerateOid: string, divisionOid:string, circleOid:string, taxPayerName: string, 
    typeOfOwnership: string, normalCentralRegistration:string, registrationCategory:string, forcedRegistration: string, 
    residencyStatus: string, oldBinNo:string, binNo:string, etinNo:string, 
    
    economicActivity: string, areasOfManufacturing:string, areasOfService:string, businessClassificationCode:string, 
    address: string, registrationType:string, emailAddress:string, mobileNo:string
  
  ): Observable<HttpResponse<any>> {

    const payload = { commissionerateOid: commissionerateOid, divisionOid: divisionOid, circleOid:circleOid, taxPayerName: taxPayerName, 
      typeOfOwnership: typeOfOwnership, normalCentralRegistration: normalCentralRegistration, registrationCategory:registrationCategory, forcedRegistration: forcedRegistration, 
      residencyStatus: residencyStatus, oldBinNo: oldBinNo, binNo:binNo, etinNo:etinNo,
  
      economicActivity: economicActivity, areasOfManufacturing: areasOfManufacturing, areasOfService:areasOfService, businessClassificationCode:businessClassificationCode,
      address: address, registrationType: registrationType, emailAddress:emailAddress, mobileNo:mobileNo   };
    
    return this.http.put<HttpResponse<any>>(`${this.apiTaxpayerUpdate}/${id}`, payload, {
      
      headers: getHttpHeaders(),
      observe: 'response'
    });
  }


  deleteCommissionerate(id: string): Observable<HttpResponse<any>> {
    return this.http.delete<HttpResponse<any>>(`${this.apiDeleteCommissionerate}/${id}`, {
      headers: getHttpHeaders(),
      observe: 'response'
    });
  }


  deleteDivision(id: string): Observable<HttpResponse<any>> {
    return this.http.delete<HttpResponse<any>>(`${this.apiDivisionDelete}/${id}`, {
      headers: getHttpHeaders(),
      observe: 'response'
    });
  }



  deleteTAXpayer(id: string): Observable<HttpResponse<any>> {
    return this.http.delete<HttpResponse<any>>(`${this.apiTaxpayerDelete}/${id}`, {
      headers: getHttpHeaders(),
      observe: 'response'
    });
  }



  getDivisionAll(): Observable<HttpResponse<any>> {
    let url ="";

     url = `${resourceServerUrl}/v1/division/all`;

    return this.http.get(url, {
        headers: getHttpHeaders(), observe: 'response'
    });



  }

  saveDivision(commissionerateoid: string, name: string): Observable<HttpResponse<any>> {
    const payload = { commissionerateoid: commissionerateoid, name: name };
    console.log('Payload being sent:', payload);  // Log payload to check
    return this.http.post<HttpResponse<any>>(this.apiDivisionCreate, payload, {
        headers: getHttpHeaders(),
        observe: 'response'
    }).pipe(
        catchError((error) => {
            if (error.status === 400) {
                console.error('Bad Request (400) - Error details:', error.error);  // Log response body if available
            } else {
                console.error('Error creating division', error);  // Log the general error
            }
            throw error;  // Re-throw the error to propagate it
        })
    );
}


saveCircle(commissionerateoid: string, divisionoid:string, name: string): Observable<HttpResponse<any>> {
  const payload = { commissionerateoid: commissionerateoid, divisionoid: divisionoid, name: name };
  console.log('Payload being sent:', payload);  // Log payload to check
  return this.http.post<HttpResponse<any>>(this.apiCircleCreate, payload, {
      headers: getHttpHeaders(),
      observe: 'response'
  }).pipe(
      catchError((error) => {
          if (error.status === 400) {
              console.error('Bad Request (400) - Error details:', error.error);  // Log response body if available
          } else {
              console.error('Error creating division', error);  // Log the general error
          }
          throw error;  // Re-throw the error to propagate it
      })
  );
}




saveTaxpayer(
  commissionerateOid: string, divisionOid:string, circleOid:string, taxPayerName: string, 
  typeOfOwnership: string, normalCentralRegistration:string, registrationCategory:string, forcedRegistration: string, 
  residencyStatus: string, oldBinNo:string, binNo:string, etinNo:string, 
  
  economicActivity: string, areasOfManufacturing:string, areasOfService:string, businessClassificationCode:string, 
  address: string, registrationType:string, emailAddress:string, mobileNo:string


): Observable<HttpResponse<any>> {
  const payload = { 
    commissionerateOid: commissionerateOid, divisionOid: divisionOid, circleOid:circleOid, taxPayerName: taxPayerName, 
    typeOfOwnership: typeOfOwnership, normalCentralRegistration: normalCentralRegistration, registrationCategory:registrationCategory, forcedRegistration: forcedRegistration, 
    residencyStatus: residencyStatus, oldBinNo: oldBinNo, binNo:binNo, etinNo:etinNo,

    economicActivity: economicActivity, areasOfManufacturing: areasOfManufacturing, areasOfService:areasOfService, businessClassificationCode:businessClassificationCode,
    address: address, registrationType: registrationType, emailAddress:emailAddress, mobileNo:mobileNo 
  
  };
  console.log('Payload being sent:', payload);  // Log payload to check
  return this.http.post<HttpResponse<any>>(this.apiTaxpayerCreate, payload, {
      headers: getHttpHeaders(),
      observe: 'response'
  }).pipe(
      catchError((error) => {
          if (error.status === 400) {
              console.error('Bad Request (400) - Error details:', error.error);  // Log response body if available
          } else {
              console.error('Error creating division', error);  // Log the general error
          }
          throw error;  // Re-throw the error to propagate it
      })
  );
}


deleteCircle(id: string): Observable<HttpResponse<any>> {
  return this.http.delete<HttpResponse<any>>(`${this.apiCircleDelete}/${id}`, {
    headers: getHttpHeaders(),
    observe: 'response'
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




  getCirclesAll(): Observable<HttpResponse<any>> {
    let url ="";
      url = `${resourceServerUrl}/v1/circle/all`;
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




  getTaxPayers(circleOid: string, commissionerateOid: string, divisionOid: string): Observable<HttpResponse<any>> {
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
