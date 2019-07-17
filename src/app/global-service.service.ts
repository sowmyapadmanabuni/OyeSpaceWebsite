import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalServiceService {

   currentAssociationId:string;
   currentAssociationName:string;
   acAccntID:number;
   
  constructor() { }


public getCurrentAssociationId(){

  return this.currentAssociationId;

}

public setCurrentAssociationId(associationId:string)
{
  this.currentAssociationId = associationId;
}

public setAccountID(acAccntID){
  this.acAccntID=acAccntID;
}

public getacAccntID(){
  return this.acAccntID;
}

public getCurrentAssociationName(){
    return this.currentAssociationName;
}

public setCurrentAssociationName(associationName:string){
   this.currentAssociationName=associationName;
}


}
