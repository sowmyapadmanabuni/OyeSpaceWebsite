import { Injectable,Component, TemplateRef, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEventType } from '@angular/common/http';
import  {CreateAssn} from './../create-assn';
import {BsModalService,BsModalRef} from 'ngx-bootstrap/modal'
import{Sendrequest} from '../models/sendrequest'

@Injectable({
  providedIn: 'root'
})
export class ViewAssociationService { 
  
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

  onUpLoad(fd: FormData) {
    //let headers = this.getHttpheaders();
    this.url = `http://mediaupload.oyespace.com/oyeliving/api/v1/association/upload`
    return this.http.post(this.url, fd, {
       reportProgress: true,
       observe: 'events'
     })
  }

  constructor(private http:HttpClient, private modalService: BsModalService) {
    this.scopeIP="http://apidev.oyespace.com/";
    //this.scopeIP = "https://apidemo.oyespace.com/";
    this.scriptIP="1FDF86AF-94D7-4EA9-8800-5FBCCFF8E5C1";
    this.headers = new HttpHeaders().append('Content-Type', 'application/json')
    .append('X-Champ-APIKey', this.scriptIP)
    .append('Access-Control-Allow-Origin', '*');
   }



   createAssn(createAsssociationData)
  {
    console.log('createAsssociationData',createAsssociationData);
    return this.http.post(this.scopeIP + 'oyeliving/api/v1/association/create',JSON.stringify(createAsssociationData),  {headers:this.headers});
  }


  getAssociationDetails(accountID)
  {
    console.log(accountID);
    return this.http.get(this.scopeIP + 'oyeliving/api/v1/GetAssociationListByAccountID/' + accountID,  {headers:this.headers});
  }


  privacyPolicyModel(viewreceiptmodal: TemplateRef<any>) {
    this.modalRef = this.modalService.show(viewreceiptmodal, Object.assign({}, { class: 'gray modal-lg' }));
}
getAssociationDetail(asAssnID){
  return this.http.get(this.scopeIP + 'oyeliving/api/v1/association/getAssociationList/'+ asAssnID , {headers:this.headers});
}
getAssociationDetailsByAssociationid(asAssnID:string)
{
  console.log(asAssnID);
  return this.http.get(this.scopeIP + 'oyeliving/api/v1/association/getAssociationList/' +asAssnID ,  {headers:this.headers});
}
UpdateAssociation(editassndata) {
  //http://apidev.oyespace.com/oyeliving/api/v1/association/Update
  return this.http.post(this.scopeIP + 'oyeliving/api/v1/association/Update', JSON.stringify(editassndata), { headers: this.headers });
}

getAssociationAllDetails()
{
  console.log();
  return this.http.get(this.scopeIP + 'oyeliving/api/v1/association/getAssociationList' ,  {headers:this.headers});
}

getBlockDetailsByAssociationID(currentAssociationID)
{
  //this.currentAssociationID=4217;
  console.log(currentAssociationID);
  //http://localhost:54400/oyeliving/api/v1/Block/GetBlockListByAssocID/{AssociationID}
  return this.http.get('http://apidev.oyespace.com/oyeliving/api/v1/Block/GetBlockListByAssocID/' +currentAssociationID ,  {headers:this.headers});
}
GetUnitListByBlockID(blockId:string){
  //this.blockId=4206;
  console.log('blockId',blockId);
  return this.http.get('http://apidev.oyespace.com/oyeliving/api/v1/Unit/GetUnitListByBlockID/'+ blockId , {headers:this.headers});
}
// http://localhost:54400/oyeliving/api/v1/Unit/GetUnitListByUnitID/{UnitID}
GetUnitListByUnitID(unUnitID:string){
  //this.blockId=4206;
  console.log('unitId',unUnitID);
  return this.http.get('http://apidev.oyespace.com/oyeliving/api/v1/Unit/GetUnitListByUnitID/'+ unUnitID , {headers:this.headers});
}

GetAccountListByAccountID(acAccntID){
  acAccntID=21;
  console.log('acAccntID',acAccntID);
 // http://localhost:54400/oyeliving/api/v1/GetAccountListByAccountID/{ACAccntID}
  return this.http.get('http://apidev.oyespace.com/oyeliving/api/v1/GetAccountListByAccountID/'+acAccntID, {headers:this.headers});
}

sendRequestmethod(senddata:Sendrequest)
  {
    console.log('senddata',senddata);
    return this.http.post('http://apidev.oyespace.com/oyeliving/api/v1/SendMsging', senddata, {headers:this.headers});

  }

}
