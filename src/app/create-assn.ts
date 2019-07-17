export class CreateAssn {

  name:string;
  associationLogo:File;
  country:string;
  postalCode:number;
  state:string;
  city:string;
  propertyType:string;
  propertyName:string;
  locality:string;
  totalNoBlocks:number;
  totalNoUnits:number;

  constructor(values: Object = {}) {
    //Constructor initialization
    Object.assign(this, values);
}
}
