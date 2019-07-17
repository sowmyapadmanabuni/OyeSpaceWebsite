import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashBoardService {
  
  scopeIP:string;
  scriptIP:string;
  headers:HttpHeaders;
  mrmRoleID:number;
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'X-Champ-APIKey': this.scriptIP,
      'Access-Control-Allow-Origin': "*"
    })
  };
  acfName: any;
  aclName: any;

  memberdoesnotexist:boolean;
  
  constructor(private http:HttpClient) {
    
    this.scopeIP="https://apidev.oyespace.com/";
    this.scriptIP="1FDF86AF-94D7-4EA9-8800-5FBCCFF8E5C1";
    this.headers= new HttpHeaders().append('Content-Type',  'application/json')
                                   .append('X-Champ-APIKey', this.scriptIP)
                                   .append('Access-Control-Allow-Origin', "*");

                                  
   }//Constructor Ends

   getAssociation(accountID){
    return this.http.get(this.scopeIP + 'oyeliving/api/v1/GetAssociationListByAccountID/' +accountID ,  {headers:this.headers});
  }
  getAmount(associationID:string){
    let headers= new HttpHeaders().append('Content-Type',  'application/json')
                                   .append('X-Champ-APIKey','1FDF86AF-94D7-4EA9-8800-5FBCCFF8E5C1')
                                   .append('Access-Control-Allow-Origin', "*");
     return this.http.get('http://apidev.oyespace.com/oyeliving/api/v1/GetPaymentsListByAssocID/' + associationID, {headers:headers} );
  }

  getMembers(accountID){
    return this.http.get(this.scopeIP + 'oyeliving/api/v1/Member/GetMemberListByAccountID/'+accountID,  {headers:this.headers});
  }

  getTickets(associationId:string){
    let headers= new HttpHeaders().append('Content-Type',  'application/json')
                                   .append('X-OYE247-APIKey','7470AD35-D51C-42AC-BC21-F45685805BBE')
                                   .append('Access-Control-Allow-Origin', "*");
    // http://apidev.oyespace.com/oye247/api/v1/GetTicketingListByAssocID/{AssociationID}
    return this.http.get('http://apidev.oyespace.com/oye247/api/v1/GetTicketingListByAssocID/' + associationId, {headers:headers});
  //No such API
  }

  getVehicle(associationID:string){
    http://apidev.oyespace.com/oyeliving/api/v1/Vehicle/GetVehicleListByAssocID/{AssociationID}
    let headers= new HttpHeaders().append('Content-Type',  'application/json')
                                   .append('X-Champ-APIKey','1FDF86AF-94D7-4EA9-8800-5FBCCFF8E5C1')
                                   .append('Access-Control-Allow-Origin', "*");
     return this.http.get(this.scopeIP + 'oyeliving/api/v1/Vehicle/GetVehicleListByAssocID/' + associationID, {headers:headers} );
  }
getStaff(associationID:string){
  let headers= new HttpHeaders().append('Content-Type',  'application/json')
                                   .append('X-OYE247-APIKey','7470AD35-D51C-42AC-BC21-F45685805BBE')
                                   .append('Access-Control-Allow-Origin', "*");
    return this.http.get('http://apidev.oyespace.com/oye247/api/v1/GetWorkerListByAssocID/' +associationID, {headers:headers});                               
}
getVisitors(associationID:string){
  let headers= new HttpHeaders().append('Content-Type',  'application/json')
                                   .append('X-OYE247-APIKey','7470AD35-D51C-42AC-BC21-F45685805BBE')
                                   .append('Access-Control-Allow-Origin', "*");
   return this.http.get('http://apidev.oyespace.com/oyesafe/api/v1/VisitorLog/GetVisitorLogListByAssocID/'+associationID,{headers:headers});
}
getAccountFirstName(accountID){
  return this.http.get(this.scopeIP + 'oyeliving/api/v1/GetAccountListByAccountID/'+accountID,  {headers:this.headers});
}

}//DashboardService Ends
