import { Injectable } from '@angular/core';
import {HttpHeaders, HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ViewUnitService {
  scopeIP:string;
  scriptIP:string;
  headers:HttpHeaders;
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'X-Champ-APIKey': this.scriptIP,
      'Access-Control-Allow-Origin': "*"
    })
  };

constructor(private http:HttpClient) { 
      this.scopeIP="https://apidev.oyespace.com/";
      this.scriptIP="1FDF86AF-94D7-4EA9-8800-5FBCCFF8E5C1";
      this.headers= new HttpHeaders().append('Content-Type',  'application/json')
                                     .append('X-Champ-APIKey', this.scriptIP,)
                                     .append('Access-Control-Allow-Origin', "*");
  }//constructor ends

getUnitDetails(currentAssociationID:string){
    return this.http.get(this.scopeIP + 'oyeliving/api/v1/Unit/GetUnitListByAssocID/'+ currentAssociationID , {headers:this.headers});
}

getBlocks(currentAssociationID:string){
     return this.http.get(this.scopeIP + 'oyeliving/api/v1/Block/GetBlockListByAssocID/'+ currentAssociationID, {headers:this.headers} );
}

createUnit(createUnitData:any){
  console.log('createUnitData *',JSON.stringify(createUnitData));
     return this.http.post(this.scopeIP + 'oyeliving/api/v1/unit/create' ,  createUnitData, {headers:this.headers});
}

GetBlockListByAssocID(currentAssociationID:string){
  return this.http.get(this.scopeIP + 'oyeliving/api/v1/Block/GetBlockListByAssocID/'+ currentAssociationID , {headers:this.headers});
}

GetUnitListByBlockID(blockId){
  console.log('blockId',blockId);
  return this.http.get(this.scopeIP + 'oyeliving/api/v1/Unit/GetUnitListByBlockID/'+ blockId , {headers:this.headers});
}

}//class ends

