import {DashBoardService} from '../dash-board/dash-board.service'
import { Injectable,Component, TemplateRef, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEventType } from '@angular/common/http';
import {BsModalService,BsModalRef} from 'ngx-bootstrap/modal';

@Injectable({
  providedIn: 'root'
})
export class EditprofileService {
  modalRef:BsModalRef;
  scopeIP:string;
  scriptIP:string;
  url:string;
  headers:HttpHeaders;
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'X-Champ-APIKey': this.scriptIP,
      'Access-Control-Allow-Origin': "*"
    })
  };
  constructor(private http:HttpClient, private modalService: BsModalService) {
    this.scopeIP="http://apidev.oyespace.com/";
    //this.scopeIP = "https://apidemo.oyespace.com/";
    this.scriptIP="1FDF86AF-94D7-4EA9-8800-5FBCCFF8E5C1";
    this.headers = new HttpHeaders().append('Content-Type', 'application/json')
    .append('X-Champ-APIKey', this.scriptIP)
    .append('Access-Control-Allow-Origin', '*');
  }

  getProfileDetails(accountID)
  {
    console.log(accountID);
    return this.http.get(this.scopeIP + 'oyeliving/api/v1/GetAccountListByAccountID/' + accountID,  {headers:this.headers});
  }

  updateEditProfile(updateProfileData) {
    //http://apidev.oyespace.com/oyeliving/api/v1/association/Update
    return this.http.post(this.scopeIP + 'oyeliving/api/v1/AccountDetails/Update', JSON.stringify(updateProfileData), { headers: this.headers });
  }

}