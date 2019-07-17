import { Component, OnInit } from '@angular/core';
import { ViewUnitService } from './view-unit.service';
import Swal from 'sweetalert2';
//import * as swal from 'sweetalert2';
import { GlobalServiceService } from '../global-service.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-view-unit',
  templateUrl: './view-unit.component.html',
  styleUrls: ['./view-unit.component.css']
})
export class ViewUnitComponent implements OnInit {
  addUnitISTPage: boolean = true;
  addUnit2NDPage: boolean = false;
  blockID: string;
  addmyVehicle: boolean = false;
  ACAccntID: number;
  ASAssnID: string;
  associationID: string;
  currentAssociationID: string;
  currentAssociationName: string;
  tenantDetails: boolean = false;
  ownerDetails: boolean = true;
  unit_Form: boolean = false;
  selectBlock: boolean = false;
  allBlocksLists: any[];
  blBlockID: string;
  viewAddunitUI:boolean;
  showCreateUnitemplate:boolean;


  blocks: any = [];
  units: any = [];
  bank: any = {};
  unit: any = {};
  owner: any = {};
  tenant: any = {};
  config: any;
  repUnit: any = {};
  viewUnitRow: any = {};
  parkings: any = [];
  newParking: any = {};
  allUnitBYBlockID: any[];
  accountTypes:object[];
  unitTypes:object[];
  calculationTypes:object[];
  occupencys:object[];

  unitType:string;
  unitno:number;
  unitdimension:number;
  unitrate:number;
  calculationtype:string;
  occupency:string;
  ownerFirtname:string;
  ownerLastname:string;
  ownerMobnumber:number;
  ownerAltnumber:number;
  ownerEmail:string;
  ownerAltemail:string;
  tenantFirtname:string;
  tenantLastname:string;
  tenantMobnumber:number;
  tenantEmail:string;

  constructor(private viewUniService: ViewUnitService,
     private globalService: GlobalServiceService,
     private router:Router) {
    this.ACAccntID=this.globalService.acAccntID;
    this.currentAssociationID=this.globalService.getCurrentAssociationId();
    //pagination
    this.config = {
      itemsPerPage: 10,
      currentPage: 1
    };

    this.blBlockID = '';
    this.unitType='';
    this.calculationtype='';
    this.occupency='';

    this.accountTypes = [
      { "name": "Saving" },
      { "name": "Current" }
    ];
  
    this.unitTypes = [
      { "name": "Flat" },
      { "name": "Villa" },
      { "name": "Vaccant Plot" }
    ];
  
    this.calculationTypes = [
      { "name": "Flat Rate Value" },
      { "name": "Dimension Based" }
    ];
  
    this.occupencys = [
      { "name": "Sold Owner Occupied" },
      { "name": "Sold Tenant Occupied" },
      { "name": "Sold Vaccant" },
      { "name": "Unsold Vaccant" },
      { "name": "Unsold Tenant Occupied" }
    ];
  }


  pageChanged(event) {
    this.config.currentPage = event;
  }


  ngOnInit() {
    this.currentAssociationID = this.globalService.getCurrentAssociationId();
    this.currentAssociationName = this.globalService.getCurrentAssociationName();
    //this.associationID="10";
    this.getUnitDetails();
    this.getBlocks();
    this.viewUniService.GetBlockListByAssocID(this.currentAssociationID)
      .subscribe(data => {
        this.allBlocksLists = data['data'].blocksByAssoc;
        console.log('allBlocksLists',this.allBlocksLists);
      });
  }


  getUnitDetails() {
    //console.log(this.associationID);
    console.log(" Current association ID:" + this.currentAssociationID);
    this.viewUniService.getUnitDetails(this.currentAssociationID).subscribe(res => {
      //console.log(JSON.stringify(res));
      var data: any = res;
      this.units = data.data.unit;
    });
  }

  getBlocks() {
    this.viewUniService.getBlocks(this.currentAssociationID).subscribe(res => {
      //console.log(JSON.stringify(res));
      var data: any = res;
      console.log('data.data.blocksByAssoc', data.data.blocksByAssoc);
      this.blocks = data.data.blocksByAssoc;

    });
  }

  addBlockForm() {
    this.showCreateUnitemplate = true;
  }

  loadBlock(block: string) {
    this.unit_Form = true;
    console.log("blockID:" + this.blockID);
  }

  /*
    addVehicle(){
      this.addmyVehicle=true;
    }
    */

  addParking() {
    this.parkings.push(this.newParking)
    this.newParking = {};
  }


  deleteParking(index) {
    this.parkings.splice(index, 1);
  }

  gotoAddunit(){
    //alert('inside go to addunit');
    this.router.navigate(['home/addunit']);
  }

  tenantOwnerdiv(occupency) {
    this.occupencys.forEach(item => {
      if (occupency == 'Unsold Vaccant') {
        this.tenantDetails = true;
        this.ownerDetails = false;
      }
      else if (occupency == 'Unsold Tenant Occupied') {
        this.tenantDetails = true;
        this.ownerDetails = false;
      }
      else {
        this.tenantDetails = false;
        this.ownerDetails = true;
      }
    })
  }


  createUnit() {
    let createUnitData =
    {
      "ASAssnID": this.currentAssociationID,
      "ACAccntID": this.ACAccntID,
      "units": [
        {
          "UNUniName": this.unitno,
          "UNUniType": this.unitType,
          "UNRate": this.unitrate,
          "UNOcStat": this.occupency,
          "UNOcSDate": "2019-03-02",
          "UNOwnStat": "null",
          "UNSldDate": "2019-03-02",
          "UNDimens": this.unitdimension,
          "UNCalType": this.calculationtype,
          "FLFloorID": 1,
          "BLBlockID": this.blockID,
          "Owner":
          {

            "UOFName": this.ownerFirtname,
            "UOLName": this.ownerLastname,
            "UOMobile": this.ownerMobnumber,
            "UOISDCode": "+91",
            "UOMobile1": this.ownerAltnumber,
            "UOMobile2": "null",
            "UOMobile3": "null",
            "UOMobile4": "null",
            "UOEmail": this.ownerEmail,
            "UOEmail1": this.ownerAltemail,
            "UOEmail2": "null",
            "UOEmail3": "null",
            "UOEmail4": "null",
            "UOCDAmnt": ""
          },
          "Tenant":
          {

            "UTFName":this.tenantFirtname,
            "UTLName": this.tenantLastname,
            "UTMobile": this.tenantMobnumber,
            "UTISDCode": "",
            "UTMobile1": "",
            "UTEmail": this.tenantEmail,
            "UTEmail1": ""
          },
          "UnitParkingLot":
            [
              {
                "UPLNum": "null",
                "MEMemID": "null",
                "UPGPSPnt": "null"

              }
            ]
        }
      ]
    }

    console.log(JSON.stringify(createUnitData));
    this.viewUniService.createUnit(createUnitData).subscribe((response) => {

      Swal.fire({
        title: 'Unit Created Successfuly',
        type: 'success',
        confirmButtonText: 'OK'
      })

    },
      (response) => {
        console.log(response);
      });

  }//createUnit function ends

  viewUnit(repUnit:any){
    console.log('repUnit',JSON.stringify(repUnit));
      this.currentAssociationName=this.globalService.getCurrentAssociationName();
      this.viewUnitRow={
        unitNo : repUnit.unUniName,
        unitType: repUnit.unUniType,
        unitDimen: repUnit.unDimens,
        rate: repUnit.unRate,
        calculationType: repUnit.unCalType,
        ownershipStatus: repUnit.unOwnStat
      };
     
  }

  getAllUnitDetailsByBlockID(blBlockID) {
    this.blockID = blBlockID;
    /*-------------------Get Unit List By Block ID ------------------*/
    this.viewUniService.GetUnitListByBlockID(blBlockID)
      .subscribe(data => {
        console.log('allUnitBYBlockID',data);
        this.allUnitBYBlockID = data['data'].unitsByBlockID;
      });
  }

}//class ends
