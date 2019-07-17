import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http:HttpClient) { }
  
  ipAddress ='https://apidev.oyespace.com/';
  url:string;

  register(requestData){
    console.log('requestData',requestData);
    let headers = this.getHttpheaders();
    this.url = `${this.ipAddress}oyeliving/api/v1/account/signup`
   return this.http.post(this.url, JSON.stringify(requestData), { headers: headers });
  }

  getHttpheaders(): HttpHeaders {
    const headers = new HttpHeaders()
      .set('Authorization', 'my-auth-token')
      .set('X-Champ-APIKey', '1FDF86AF-94D7-4EA9-8800-5FBCCFF8E5C1')
      .set('Content-Type', 'application/json');
    return headers;
  }
}
