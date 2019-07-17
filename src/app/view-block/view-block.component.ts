import { Component, OnInit, TemplateRef } from '@angular/core';
import { ViewBlockService } from './view-block.service';
import { GlobalServiceService } from '../global-service.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-view-block',
  templateUrl: './view-block.component.html',
  styleUrls: ['./view-block.component.css']
})
export class ViewBlockComponent implements OnInit {
  blocksData: boolean = true;
  addBlock_form: boolean = false;
  dimensionBasedRate: boolean = false;
  flatRatevalue: boolean = false;
  currentAssociationID: string;
  allBlocksLists: any = [];
  block: any = {};
  bank: any = {};
  createBlockData: any = {};
  associationID: string;
  ACAccntID: number;
  ASAssnID: string;
  currentAssociationName: string;
  config: any;
  viewBlockRow: any = {};
  assnName: string;
  totalNoofblocks: number;
  availableNoOfBlocks: number;
  allBlocksList: object;

  modalRef: BsModalRef;
  myDate = new Date();
  BLBlkName: string;
  BLBlkType: string;
  BLNofUnit: number;
  BLMgrName: string;
  BLMgrMobile: number;
  BLMgrEmail: string;
  ASMtType: string;
  ASMtFRate: number;
  ASMtDimBs: string;
  ASUniMsmt: string;
  ASDPyDate: string;
  ASLPCType: string;
  ASLPChrg: number;
  ASLPSDate: string;
  editblockdata: object;
  BLBlockID: string;
  ASBGnDate: string;
  ASIcRFreq: string;

  addRate: string;
  addRate1: string;

  bkname: string;
  bktype: string;
  bknofflrs: string;
  bknofunit: string;

  bsConfig: object;

  blocktypes: object[];

  constructor(private viewBlkService: ViewBlockService,
    private globalService: GlobalServiceService,
    private router: Router,
    private modalService: BsModalService, ) {
    //pagination
    this.config = {
      itemsPerPage: 10,
      currentPage: 1
    };

    this.bsConfig = Object.assign({}, { containerClass: 'theme-orange', dateInputFormat: 'YYYY-MM-DD' });

    this.allBlocksList = null;

    this.blocktypes = [{
      'name': 'Residential', 'displayName': 'Residential'
    },
    {
      'name': 'Commercial', 'displayName': 'Commercial'
    },
    {
      'name': 'Residential and Commercial', 'displayName': 'Residential and Commercial'
    }]

    this.ACAccntID=this.globalService.getacAccntID();
  }


  pageChanged(event) {
    this.config.currentPage = event;
  }


  ngOnInit() {
    this.currentAssociationID = this.globalService.getCurrentAssociationId();
    this.currentAssociationName = this.globalService.getCurrentAssociationName();
    console.log('this.currentAssociationName',this.currentAssociationName);
    console.log('this.currentAssociationID',this.currentAssociationID);
    this.getBlockDetails();
    this.viewBlkService.getassociationlist(this.currentAssociationID)
      .subscribe(data => {
        this.assnName = data['data'].association.asAsnName;
        this.totalNoofblocks = data['data'].association.asNofBlks
      });
      this.allBlocksLists='';
  }


  getBlockDetails() {
    this.viewBlkService.getBlockDetails(this.currentAssociationID).subscribe(data => {
      this.allBlocksLists = data['data'].blocksByAssoc;
      console.log('allBlocksLists', this.allBlocksLists);
      this.availableNoOfBlocks = data['data'].blocksByAssoc.length;
      //asbGnDate
    });
  }

  viewBlockDetails(blBlkName, blBlkType, blNofUnit) {
    this.bkname = blBlkName;
    this.bktype = blBlkType;
    this.bknofunit = blNofUnit;
    //$scope.rowId = idx;
  }

  addBlocksValidation() {
    let totalNoofblocks = this.totalNoofblocks;
    let availableNoOfBlocks = this.availableNoOfBlocks;
    if (totalNoofblocks <= availableNoOfBlocks) {
      Swal.fire({
        title: "Block limit Reached",
        type: "success",
        confirmButtonColor: "#f69321",
        confirmButtonText: "Yes"
      })
    } else {
      this.router.navigate(['home/addBlocks']);
    }
  }

  addBlockForm() {
    this.blocksData = false;
    this.addBlock_form = true;

    console.log(JSON.stringify(this.frequencys));
  }
  /*
    checkRate(){
        this.dimensionBasedRate=false;
        this.flatRatevalue=true; 
    }
  
    checkRate1(){
      this.dimensionBasedRate=true;
      this.flatRatevalue=false; 
  }
  */
  // checkRate() {

  //   if (this.block.rate == true) {
  //     this.flatRatevalue = true;
  //   }
  //   else {
  //     this.flatRatevalue = false;
  //   }
  //   if (this.block.rate1 == true) {
  //     this.dimensionBasedRate = true;
  //   }
  //   else {
  //     this.dimensionBasedRate = false;
  //   }

  // }

  checkRate1(rate1) {
    if (rate1 == true) {
      this.addRate1 = 'dimension';
    } else {
      this.addRate1 = '';
    }
  }

  checkRate(rate) {

    if (rate == true) {
      this.addRate = 'flatRatevalue';
    } else {
      this.addRate = '';
    }
  }

  latePaymentChargeTypes: any = [
    { "name": "Monthly", "displayName": "Monthly" },
    { "name": "Quaterly", "displayName": "Quaterly" },
    { "name": "HalfYearly", "displayName": "HalfYearly" },
    { "name": "Annually", "displayName": "Annually" }
  ];

  frequencys: any = [
    { "name": "Monthly", "displayName": "Monthly" },
    { "name": "Quaterly", "displayName": "Quaterly" },
    { "name": "HalfYearly", "displayName": "Half Yearly" },
    { "name": "Annually", "displayName": "Annually" }
  ];

  accountTypes: any = [
    { "name": "Saving" },
    { "name": "Current" }
  ];

  createBlock() {
    this.createBlockData = {
      "ASAssnID": this.currentAssociationID,
      "ACAccntID": this.ACAccntID,
      "blocks": [{
        "BLBlkName": this.block.blockname,
        "BLBlkType": this.block.blocktype,
        "BLNofUnit": this.block.noofunits
      }]
    };

    console.log(JSON.stringify(this.createBlockData));
    this.viewBlkService.createBlock(this.createBlockData).subscribe(res => {
      console.log("Done")
      //alert("Block Created Successfully")
    });

    Swal.fire({
      title: 'Block Created Successfuly',

    })
  }//createBlock function ends


  viewBlock(repBlock) {
    this.viewBlockRow = {
      blockName: repBlock.blBlkName,
      blockType: repBlock.blBlkType,
      unitNo: repBlock.blNofUnit
    };
  }

  _keyPress(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
        event.preventDefault();
    }
  }

  OpenModal(editBlocktemplate: TemplateRef<any>, blBlkName: string, blBlkType: string, blNofUnit: number, blMgrName: string, blMgrMobile: number, blMgrEmail: string, asMtType: string, asMtFRate: number, asMtDimBs: string, asUniMsmt: string, asbGnDate: string, bldUpdated: Date, aslpcType: string, aslpChrg: number, aslpsDate: Date, blBlockID: string, asiCrFreq:string) {

    this.BLBlkName = blBlkName;
    this.BLBlkType = blBlkType;
    this.BLNofUnit = blNofUnit;
    this.BLMgrName = blMgrName;
    this.BLMgrMobile = blMgrMobile;
    this.BLMgrEmail = blMgrEmail;
    this.ASMtType = asMtType;
    this.ASMtFRate = asMtFRate;
    this.ASMtDimBs = asMtDimBs;
    this.ASUniMsmt = asUniMsmt;

    this.ASLPCType = aslpcType;
    this.ASBGnDate = formatDate(asbGnDate, 'yyyy/MM/dd', 'en');
    this.ASDPyDate = formatDate(bldUpdated, 'yyyy/MM/dd', 'en')
    this.ASLPSDate = formatDate(aslpsDate, 'yyyy/MM/dd', 'en');
    this.ASLPChrg = aslpChrg;
    this.BLBlockID = blBlockID;
    this.ASIcRFreq =asiCrFreq;

    console.log(this.BLBlkName);
    console.log(this.BLBlkType);
    console.log(this.BLNofUnit);
    console.log(this.BLMgrEmail);
    console.log(this.ASUniMsmt);
    console.log(this.ASDPyDate);
    console.log(this.ASLPChrg);
    console.log(this.ASLPSDate);
    console.log(this.BLBlockID);
    console.log(this.ASBGnDate);
    this.modalRef = this.modalService.show(editBlocktemplate,
      Object.assign({}, { class: 'gray modal-lg' }));

  }

  

  UpdateBlock() {
    this.editblockdata = {
      BLBlkName: this.BLBlkName,
      BLBlkType: this.BLBlkType,
      BLNofUnit: this.BLNofUnit,
      BLMgrName: this.BLMgrName,
      BLMgrMobile: this.BLMgrMobile,
      BLMgrEmail: this.BLMgrEmail,
      ASMtType: this.ASMtType,
      ASMtFRate: this.ASMtFRate,
      ASMtDimBs: this.ASMtDimBs,
      ASUniMsmt: this.ASUniMsmt,
      ASBGnDate: formatDate(this.ASBGnDate, 'yyyy/MM/dd', 'en'),
      ASDPyDate: formatDate(this.ASDPyDate, 'yyyy/MM/dd', 'en'),
      ASLPSDate: formatDate(this.ASLPSDate, 'yyyy/MM/dd', 'en'),
      ASLPCType: this.ASLPCType,
      ASLPChrg: this.ASLPChrg,
      BLBlockID: this.BLBlockID,
      ASAssnID: this.currentAssociationID,
      ASIcRFreq:this.ASIcRFreq
    };

    console.log('editblockdata', this.editblockdata);
    this.viewBlkService.UpdateBlock(this.editblockdata).subscribe(res => {
      console.log("Done");
      console.log(JSON.stringify(res));
      console.log('editblockdata', this.editblockdata);
      Swal.fire({
        title: 'Block Updated Successfuly',
      }).then(
        (result) => {

          if (result.value) {
            //this.form.reset();
            this.modalRef.hide();
            this.router.navigate(['viewBlocks']);


          } else if (result.dismiss === Swal.DismissReason.cancel) {
            this.router.navigate(['']);
          }
        }
      )

    });

  }
  
}
//export class ViewBlockComponent
