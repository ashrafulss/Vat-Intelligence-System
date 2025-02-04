import { Injectable } from '@angular/core';
import { resourceServerUrl } from '../../../common/constants/server-settings';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { getHttpHeaders } from '../../../common/constants/constants';
import { BehaviorSubject, Observable, of } from 'rxjs';

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















  // Full Commissioners Data
  private commissionerData = [
    { id: "01", value: "01", name: "Customs, Excise and VAT Commissionerate, Dhaka (North)", date: "30 Jan 2025" },
    { id: "02", value: "02", name: "Customs, Excise and VAT Commissionerate, Dhaka (South)", date: "31 Jan 2025" },
    { id: "03", value: "03", name: "Customs, Excise and VAT Commissionerate, Chittagong", date: "01 Feb 2025" },
    { id: "04", value: "04", name: "Customs, Excise and VAT Commissionerate, Rajshahi", date: "02 Feb 2025" },
    { id: "05", value: "05", name: "Customs, Excise and VAT Commissionerate, Khulna", date: "03 Feb 2025" },
    { id: "06", value: "06", name: "Customs, Excise and VAT Commissionerate, Sylhet", date: "04 Feb 2025" },
    { id: "07", value: "07", name: "Customs, Excise and VAT Commissionerate, Barisal", date: "05 Feb 2025" },
    { id: "08", value: "08", name: "Customs, Excise and VAT Commissionerate, Bogura", date: "06 Feb 2025" },
    { id: "09", value: "09", name: "Customs, Excise and VAT Commissionerate, Mymensingh", date: "07 Feb 2025" },
    { id: "10", value: "10", name: "Customs, Excise and VAT Commissionerate, Cumilla", date: "08 Feb 2025" },
    { id: "11", value: "11", name: "Customs, Excise and VAT Commissionerate, Khulna (North)", date: "09 Feb 2025" },
    { id: "12", value: "12", name: "Customs, Excise and VAT Commissionerate, Rangpur", date: "10 Feb 2025" },
    { id: "13", value: "13", name: "Customs, Excise and VAT Commissionerate, Jessore", date: "11 Feb 2025" },
    { id: "14", value: "14", name: "Customs, Excise and VAT Commissionerate, Naogaon", date: "12 Feb 2025" },
    { id: "15", value: "15", name: "Customs, Excise and VAT Commissionerate, Narsingdi", date: "13 Feb 2025" },
    { id: "16", value: "16", name: "Customs, Excise and VAT Commissionerate, Dinajpur", date: "14 Feb 2025" },
    { id: "17", value: "17", name: "Customs, Excise and VAT Commissionerate, Pabna", date: "15 Feb 2025" },
    { id: "18", value: "18", name: "Customs, Excise and VAT Commissionerate, Tangail", date: "16 Feb 2025" },
    { id: "19", value: "19", name: "Customs, Excise and VAT Commissionerate, Chapainawabganj", date: "17 Feb 2025" },
    { id: "20", value: "20", name: "Customs, Excise and VAT Commissionerate, Meherpur", date: "18 Feb 2025" }
  ];

  // Full Division Data
  private divisionData = [
    { id: "01", value: "01", name: "Division, Dhaka (North)", date: "30 Jan 2025" },
    { id: "02", value: "02", name: "Division, Dhaka (South)", date: "31 Jan 2025" },
    { id: "03", value: "03", name: "Division, Chittagong", date: "01 Feb 2025" },
    { id: "04", value: "04", name: "Division, Rajshahi", date: "02 Feb 2025" },
    { id: "05", value: "05", name: "Division, Khulna", date: "03 Feb 2025" },
    { id: "06", value: "06", name: "Division, Sylhet", date: "04 Feb 2025" },
    { id: "07", value: "07", name: "Division, Barisal", date: "05 Feb 2025" },
    { id: "08", value: "08", name: "Division, Bogura", date: "06 Feb 2025" },
    { id: "09", value: "09", name: "Division, Mymensingh", date: "07 Feb 2025" },
    { id: "10", value: "10", name: "Division, Cumilla", date: "08 Feb 2025" },
    { id: "11", value: "11", name: "Division, Khulna (North)", date: "09 Feb 2025" },
    { id: "12", value: "12", name: "Division, Rangpur", date: "10 Feb 2025" },
    { id: "13", value: "13", name: "Division, Jessore", date: "11 Feb 2025" },
    { id: "14", value: "14", name: "Division, Naogaon", date: "12 Feb 2025" },
    { id: "15", value: "15", name: "Division, Narsingdi", date: "13 Feb 2025" },
    { id: "16", value: "16", name: "Division, Dinajpur", date: "14 Feb 2025" },
    { id: "17", value: "17", name: "Division, Pabna", date: "15 Feb 2025" },
    { id: "18", value: "18", name: "Division, Tangail", date: "16 Feb 2025" },
    { id: "19", value: "19", name: "Division, Chapainawabganj", date: "17 Feb 2025" },
    { id: "20", value: "20", name: "Division, Meherpur", date: "18 Feb 2025" }
  ];

  // Full Taxpayer Data
  private taxPayerData = [
    { sino: "01", taxpayerName: "ABC Corporation", binNo: "123456789", E_tin: "100200300", contactNo: "017XXXXXXXX", dateAdded: "30 Jan 2025" },
    { sino: "02", taxpayerName: "XYZ Ltd.", binNo: "987654321", E_tin: "200300400", contactNo: "018XXXXXXXX", dateAdded: "31 Jan 2025" },
    { sino: "03", taxpayerName: "LMN Traders", binNo: "456789123", E_tin: "300400500", contactNo: "019XXXXXXXX", dateAdded: "01 Feb 2025" },
    { sino: "04", taxpayerName: "PQR Industries", binNo: "789123456", E_tin: "400500600", contactNo: "016XXXXXXXX", dateAdded: "02 Feb 2025" },
    { sino: "05", taxpayerName: "DEF Ltd.", binNo: "321654987", E_tin: "500600700", contactNo: "015XXXXXXXX", dateAdded: "03 Feb 2025" },
    { sino: "06", taxpayerName: "GHI Corporation", binNo: "654987321", E_tin: "600700800", contactNo: "014XXXXXXXX", dateAdded: "04 Feb 2025" },
    { sino: "07", taxpayerName: "JKL Enterprises", binNo: "852741963", E_tin: "700800900", contactNo: "013XXXXXXXX", dateAdded: "05 Feb 2025" },
    { sino: "08", taxpayerName: "MNO Pvt. Ltd.", binNo: "963852741", E_tin: "800900100", contactNo: "012XXXXXXXX", dateAdded: "06 Feb 2025" },
    { sino: "09", taxpayerName: "STU Agencies", binNo: "741963852", E_tin: "900100200", contactNo: "011XXXXXXXX", dateAdded: "07 Feb 2025" },
    { sino: "10", taxpayerName: "VWX Group", binNo: "369258147", E_tin: "100200300", contactNo: "010XXXXXXXX", dateAdded: "08 Feb 2025" }
  ];

  // BehaviorSubjects for real-time updates
  private commissionerSubject = new BehaviorSubject<any[]>(this.commissionerData);
  private divisionSubject = new BehaviorSubject<any[]>(this.divisionData);
  private taxPayerSubject = new BehaviorSubject<any[]>(this.taxPayerData);



  // 📌 Get Full Data
  getAllData(): Observable<any> {
    return of({
      status: 200,
      body: {
        commissioners: this.commissionerSubject.value,
        divisions: this.divisionSubject.value,
        taxpayers: this.taxPayerSubject.value
      }
    });
  }

  // 📌 Get Commissioner Data
  getCommissionerArray(): Observable<any> {
    return of({ status: 200, body: this.commissionerSubject.value });
  }

  // 📌 Get Division Data
  getDivisionArray(): Observable<any> {
    return of({ status: 200, body: this.divisionSubject.value });
  }

  // 📌 Get Taxpayer Data
  getTaxPayerArray(): Observable<any> {
    return of({ status: 200, body: this.taxPayerSubject.value });
  }

  // 📌 Add New Commissioner


    // Add Commissioner (push data into the array)
    addCommissioner(newCommissioner: any): void {
      this.commissionerSubject.value.push(newCommissioner);  // Push data into the array
      this.commissionerSubject.next(this.commissionerSubject.value); // Emit the updated array
    }

  // 📌 Add New Division
  addDivision(newDivision: any): void {
    const updatedData = [...this.divisionSubject.value, newDivision];
    this.divisionSubject.next(updatedData);
  }

  // 📌 Add New Taxpayer
  addTaxPayer(newTaxPayer: any): void {
    const updatedData = [...this.taxPayerSubject.value, newTaxPayer];
    this.taxPayerSubject.next(updatedData);
  }



  // In DataService
editCommissionerate(updatedCommissionerate: any): void {
  const updatedData = this.commissionerSubject.value.map(commissionerate => 
    commissionerate.id === updatedCommissionerate.id ? updatedCommissionerate : commissionerate
  );
  this.commissionerSubject.next(updatedData);
}










}
