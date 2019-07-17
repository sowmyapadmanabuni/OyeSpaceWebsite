import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ViewReceiptService {
  ipAddress: string;
  url: string;

  constructor(private http: HttpClient) { 
    this.ipAddress = 'http://apidev.oyespace.com/';
  }

  getpaymentlist(currentAssociationID){
    console.log('currentAssociationID-'+currentAssociationID);
    //url: scopeIP+'/oyeliving/api/v1/payment/getpaymentlist/' + $scope.curAssociationID,
    //http://apidev.oyespace.com/oyeliving/api/v1/GetPaymentsListByAssocID/%7BAssociationID%7D
    //http://apidev.oyespace.com/oyeliving/api/v1/GetPaymentsListByAssocID/4217

    let headers = this.getHttpheaders();
    this.url = `${this.ipAddress}oyeliving/api/v1/GetPaymentsListByAssocID/${currentAssociationID}`
    return this.http.get(this.url, { headers: headers });
  }

  getHttpheaders(): HttpHeaders {
    const headers = new HttpHeaders()
      .set('Authorization', 'my-auth-token')
      .set('X-Champ-APIKey', '1FDF86AF-94D7-4EA9-8800-5FBCCFF8E5C1')
      .set('Content-Type', 'application/json');
    return headers;
  }
  
}
