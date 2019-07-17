import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddBlockService {
  ipAddress: string;
  currentAssociationID: number;
  url: string;

  constructor(private http: HttpClient) {
    this.ipAddress = 'http://apidev.oyespace.com/';
    this.currentAssociationID = 4217;
   }

  createBlock(CreateBockData){
    let headers = this.getHttpheaders();
    this.url = `${this.ipAddress}oyeliving/api/v1/Block/create`
   return this.http.post(this.url, JSON.stringify(CreateBockData), { headers: headers });
  }

  getHttpheaders(): HttpHeaders {
    const headers = new HttpHeaders()
      .set('Authorization', 'my-auth-token')
      .set('X-Champ-APIKey', '1FDF86AF-94D7-4EA9-8800-5FBCCFF8E5C1')
      .set('Content-Type', 'application/json');
    return headers;
  }
}
