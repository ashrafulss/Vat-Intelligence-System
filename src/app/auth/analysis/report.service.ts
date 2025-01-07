import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { resourceServerUrl } from '../../common/constants/server-settings';
import { getHttpHeaders } from '../../common/constants/constants';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) { }

  getCircleListByParams(commissionerateOid:string, divisionOid: string, circleOid: string, taxPayerOid: string): Observable<any> {
    let url=`${resourceServerUrl}/v1/report/commissionerate`;
    //  let url=`${resourceServerUrl}/v1/report`;
   
    return this.http.get(url, {
      params: new HttpParams()
      .set('commissionerateOid', commissionerateOid)
      .set('divisionOid', divisionOid)
      .set('circleOid', circleOid)
      .set('taxPayerOid', taxPayerOid),
      headers: getHttpHeaders(),
        observe: 'response',
        responseType: 'blob',
    });
  }

  getNotEnlistedHSCodeImportByEnlistedCompany(taxPayerOid: string, fromDate: Date, toDate: Date): Observable<any> {
    let url=`${resourceServerUrl}/v1/report/not-enlisted-hscode-import`;
   
    return this.http.get(url, {
      params: new HttpParams()
      .set('taxPayerOid', taxPayerOid ? taxPayerOid.toString() : '')
      .set('fromDate', this.dateFormat(fromDate))
      .set('toDate', this.dateFormat(toDate)),
      headers: getHttpHeaders(),
        observe: 'response',
        responseType: 'blob',
    });
  }
  getATReport(companyBin: string, fromDate: Date, toDate: Date): Observable<any> {
    let url=`${resourceServerUrl}/v1/report/at-report`;
   
    return this.http.get(url, {
      params: new HttpParams()
      .set('companyBin', companyBin ? companyBin.toString() : '')
      .set('fromDate', this.dateFormat(fromDate))
      .set('toDate', this.dateFormat(toDate)),
      headers: getHttpHeaders(),
        observe: 'response',
        responseType: 'blob',
    });
  }

  getRebateReport(companyBin: string, fromDate: Date, toDate: Date): Observable<any> {
    let url=`${resourceServerUrl}/v1/report/rebate-report`;
   
    return this.http.get(url, {
      params: new HttpParams()
      .set('companyBin', companyBin ? companyBin.toString() : '')
      .set('fromDate', this.dateFormat(fromDate))
      .set('toDate', this.dateFormat(toDate)),
      headers: getHttpHeaders(),
        observe: 'response',
        responseType: 'blob',
    });
  }

  getImportRatioReport(companyBin: string, fromDate: Date, toDate: Date): Observable<any> {
    let url=`${resourceServerUrl}/v1/report/import-ratio-report`;
   
    return this.http.get(url, {
      params: new HttpParams()
      .set('companyBin', companyBin ? companyBin.toString() : '')
      .set('fromDate', this.dateFormat(fromDate))
      .set('toDate', this.dateFormat(toDate)),
      headers: getHttpHeaders(),
        observe: 'response',
        responseType: 'blob',
    });
  }
  

  // companyBin, companyName, hsCode, itemName, month, fromDate, toDate
  getMushak_6_1(companyBin: string, companyName: string, companyAddress: string, hsCode: string, itemName: string, month: string, fromDate: Date, toDate: Date): Observable<any> {
    let url=`${resourceServerUrl}/v1/mushak/mushak-6-1`;
    return this.http.get(url, {
      params: new HttpParams()
      .set('companyBin', companyBin ? companyBin.toString() : '')
      .set('companyName', companyName ? companyName.toString() : '')
      .set('companyAddress', companyAddress ? companyAddress.toString() : '')
      .set('hsCode', hsCode ? hsCode.toString() : '')
      .set('itemName', itemName ? itemName.toString() : '')
      .set('month', month ? month.toString() : '')
      .set('fromDate', this.dateFormat(fromDate))
      .set('toDate', this.dateFormat(toDate)),
      headers: getHttpHeaders(),
        observe: 'response',
        responseType: 'blob',
    });
  }
  // this.lastMonthFromDate, this.lastMonthToDate
  getMushak_9_1(companyBin: string, returnType: string, fromDate: Date, toDate: Date, lastMonthFromDate: Date, lastMonthToDate: Date): Observable<any> {
    let url=`${resourceServerUrl}/v1/mushak/mushak-9-1`;
    return this.http.get(url, {
      params: new HttpParams()
      .set('companyBin', companyBin ? companyBin.toString() : '')
      .set('returnType', returnType ? returnType.toString() : '')
      // .set('companyName', companyName ? companyName.toString() : '')
      // .set('companyAddress', companyAddress ? companyAddress.toString() : '')
      // .set('hsCode', hsCode ? hsCode.toString() : '')
      // .set('itemName', itemName ? itemName.toString() : '')
      // .set('month', month ? month.toString() : '')
      .set('fromDate', this.dateFormat(fromDate))
      .set('toDate', this.dateFormat(toDate))
      .set('lastMonthFromDate', this.dateFormat(lastMonthFromDate))
      .set('lastMonthToDate', this.dateFormat(lastMonthToDate)),
      headers: getHttpHeaders(),
        observe: 'response',
        responseType: 'blob',
    });
  }

  getNotEnlistedCompanyImport(hsCode: string, fromDate: Date, toDate: Date): Observable<any> {
    let url=`${resourceServerUrl}/v1/report/not-enlisted-company-import`;
    //  let url=`${resourceServerUrl}/v1/report`;
   
    return this.http.get(url, {
      params: new HttpParams()
      .set('hsCode', hsCode ? hsCode.toString() : '')
      .set('fromDate', this.dateFormat(fromDate))
      .set('toDate', this.dateFormat(toDate)),
      headers: getHttpHeaders(),
        observe: 'response',
        responseType: 'blob',
    });
  }

  getNotEnlistedCompanyImportHistory(companyBin: string, fromDate: Date, toDate: Date): Observable<any> {
    let url=`${resourceServerUrl}/v1/report/not-enlisted-company-import-history`;
    //  let url=`${resourceServerUrl}/v1/report`;
   
    return this.http.get(url, {
      params: new HttpParams()
      .set('companyBin', companyBin ? companyBin.toString() : '')
      .set('fromDate', this.dateFormat(fromDate))
      .set('toDate', this.dateFormat(toDate)),
      headers: getHttpHeaders(),
        observe: 'response',
        responseType: 'blob',
    });
  }

  getCompanyWiseImportCount(companyName: string, fromDate: Date, toDate: Date): Observable<any> {
    let url=`${resourceServerUrl}/v1/report/company-wise-import-count`;
   
    return this.http.get(url, {
      params: new HttpParams()
      .set('companyName', companyName ? companyName.toString() : '')
      .set('fromDate', this.dateFormat(fromDate))
      .set('toDate', this.dateFormat(toDate)),
      headers: getHttpHeaders(),
        observe: 'response',
        responseType: 'blob',
    });
  }

  getVatPayerList(): Observable<HttpResponse<any>> {
    const url: string = `${resourceServerUrl}/v1/taxpayer/all`;
    return this.http.get(url, {
        headers: getHttpHeaders(), observe: 'response'
    });
  }

  getHsCodeList(category: string ="Cement"): Observable<HttpResponse<any>> {
    const url: string = `${resourceServerUrl}/v1/hscode`;
    return this.http.get(url, {
      params: new HttpParams()
      .set('category', category ? category.toString() : ''),
        headers: getHttpHeaders(), observe: 'response'
    });
  }

  getOfficeList(): Observable<HttpResponse<any>> {
    const url: string = `${resourceServerUrl}/v1/office`;
    return this.http.get(url, {
        headers: getHttpHeaders(), observe: 'response'
    });
  }

  dateFormat(str: any){
    var date = new Date(str),
     mnth = ("0" + (date.getMonth() + 1)).slice(-2),
     day = ("0" + date.getDate()).slice(-2);
     return [date.getFullYear(), mnth, day].join("-");
  }

  getRegistrationWiseCompanyList(registrationType: string, fromDate: Date, toDate: Date): Observable<any> {
    let url=`${resourceServerUrl}/v1/report/registration-wise-company`;
    //  let url=`${resourceServerUrl}/v1/report`;
    return this.http.get(url, {
      params: new HttpParams()
      .set('registrationType', registrationType ? registrationType.toString() : '')
      .set('fromDate', this.dateFormat(fromDate))
      .set('toDate', this.dateFormat(toDate)),
      headers: getHttpHeaders(),
        observe: 'response',
        responseType: 'blob',
    });
  }

  getHsCodList(categoryType: string): Observable<any> {
    let url=`${resourceServerUrl}/v1/report/hscode`;
   
    return this.http.get(url, {
      params: new HttpParams()
      .set('categoryType', categoryType ? categoryType.toString() : ''),
      headers: getHttpHeaders(),
        observe: 'response',
        responseType: 'blob',
    });
  }

  getDownloadPurchaseInformationDetails(oid: string): Observable<any> {
    let url=`${resourceServerUrl}/v1/purchase-information/pdf/detail`;
   
    return this.http.get(url, {
      params: new HttpParams()
      .set('oid', oid ? oid.toString() : ''),
      headers: getHttpHeaders(),
        observe: 'response',
        responseType: 'blob',
    });
  }

  // getFileDownload(refId: string): Observable<any> {
  //   const url = `${resourceServerUrl}/v1/application/file/${refId}`;
  //   return this.http.get(url, {
  //       headers: getHttpHeaders(),
  //       observe: 'response',
  //       responseType: 'blob',
  //   });
  // }
}
