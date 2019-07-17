import { Component, OnInit,ViewChild } from '@angular/core';
import { formatDate } from '@angular/common';
import { AddBlockService } from '../services/add-block.service';
import { GlobalServiceService } from '../global-service.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-blocks',
  templateUrl: './add-blocks.component.html',
  styleUrls: ['./add-blocks.component.css']
})
export class AddBlocksComponent implements OnInit {

  frequencies: object[];
  assnName: string;
  bsConfig: object;
  latePymtChrgTypes: object[];
  addRate: string;
  addRate1: string;

  blockname: string;
  blocktype: string;
  noofunits: number;
  mngName: string;
  mobile: number;
  manageremail: number;
  flatRatevalue: number;
  maintenanceValue: number;
  measurements: number;
  billGenerationDate: Date;
  dueDate: string;
  latePymtChargeType: string;
  latePymtCharge: number;
  startsFrom: Date;
  frequency: string;

  blocktypes: object[];

  minDate: Date;
  minDateinNumber: number;
  startsFromMaxDate: Date;
  dueDateinNumber: number;
  enableduedatevalidation: boolean;
  duedatechanged: boolean;
  invoicedatechanged: boolean;
  startsFromMaxDateinNumber: number;
  enablestartfromdatevalidation: boolean;
  startsfromDateChanged: boolean;

  currentAssociationID: string;
  currentAssociationName: string;
  currentaccountID:number;

  @ViewChild('ctrateBlockform') ctrateBlockform: any;


  constructor(private addblockservice: AddBlockService,
    private globalservice: GlobalServiceService,
    private router:Router) {
    this.currentAssociationID = this.globalservice.getCurrentAssociationId();
    this.currentAssociationName = this.globalservice.getCurrentAssociationName();
    this.currentaccountID=this.globalservice.acAccntID;
    this.assnName = this.currentAssociationName;
    this.bsConfig = Object.assign({}, { containerClass: 'theme-orange', dateInputFormat: 'YYYY-MM-DD' });
    this.frequency = '';
    this.latePymtChargeType = '';
    this.blocktype = '';
    this.enableduedatevalidation = false;
    this.duedatechanged = false;
    this.invoicedatechanged = false;
    this.enablestartfromdatevalidation = false;
    this.startsfromDateChanged = false;

    this.latePymtChrgTypes = [
      { "name": "Monthly", "displayName": "Monthly" },
      { "name": "quaterly", "displayName": "Quaterly" },
      { "name": "Annually", "displayName": "Annually" }
    ];

    this.frequencies = [
      { "name": "Monthly", "displayName": "Monthly" },
      { "name": "Quarterly", "displayName": "Quarterly" },
      { "name": "Half Yearly", "displayName": "Half Yearly" },
      { "name": "Yearly", "displayName": "Yearly" }
    ];

    this.blocktypes = [{
      'name': 'Residential', 'displayName': 'Residential'
    },
    {
      'name': 'Commercial', 'displayName': 'Commercial'
    },
    {
      'name': 'Residential and Commercial', 'displayName': 'Residential and Commercial'
    }]

  }

  ngOnInit() {

  }

  ngAfterViewInit() {
  }

  telInputObject(telinputobj) {
    console.log(telinputobj);
  }
  hasError(errorobj) {
    console.log(errorobj);
  }
  getNumber(numberobj) {
    console.log(numberobj);
  }
  onCountryChange(countryobj) {
    console.log(countryobj['dialCode']);
  }
  onValueChange(value: Date): void {
    console.log(value);
    if (value != null) {
      this.invoicedatechanged = true;
      this.minDate = new Date(value);
      this.minDateinNumber = new Date(value).getTime();
      console.log('minDateinNumber', this.minDateinNumber);
      if (this.duedatechanged) {
        if (this.dueDateinNumber < this.minDateinNumber) {
          this.enableduedatevalidation = true;
        }
        else if (this.dueDateinNumber > this.minDateinNumber) {
          this.enableduedatevalidation = false;
        }
        else if (this.dueDateinNumber == this.minDateinNumber) {
          this.enableduedatevalidation = false;
        }
      }

    }
    //this.minDate.setDate(this.minDate.getDate() + 1);
  }
  gotoviewBlocks(){
    this.router.navigate(['home/viewBlocks']);
  }
  _keyPress(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
        event.preventDefault();
    }
  }

  onDueDateValueChange(value: Date) {
    this.enableduedatevalidation = false;
    if (value != null) {
      this.duedatechanged = true;
      this.startsFromMaxDate = new Date(value);
      this.dueDateinNumber = new Date(value).getTime();
      console.log('dueDateinNumber', this.dueDateinNumber);
      if (this.invoicedatechanged) {
        if (this.dueDateinNumber < this.minDateinNumber) {
          this.enableduedatevalidation = true;
        }
        else if (this.dueDateinNumber > this.minDateinNumber) {
          this.enableduedatevalidation = false;
        }
        else if (this.dueDateinNumber == this.minDateinNumber) {
          this.enableduedatevalidation = false;
        }
      }

      if (this.startsfromDateChanged) {
        if (this.startsFromMaxDateinNumber < this.dueDateinNumber) {
          this.enablestartfromdatevalidation = true;
        }
        else if (this.startsFromMaxDateinNumber == this.dueDateinNumber) {
          this.enablestartfromdatevalidation = false;
        }
      }
    }
    //this.startsFromMaxDate.setDate(this.startsFromMaxDate.getDate() + 1);
  }
  onStartsFromDateValueChange(value: Date) {
    if (value != null) {
      this.startsfromDateChanged = true;
      this.startsFromMaxDateinNumber = new Date(value).getTime();
      if (this.duedatechanged) {
        if (this.startsFromMaxDateinNumber < this.dueDateinNumber) {
          this.enablestartfromdatevalidation = true;
        }
        else if (this.startsFromMaxDateinNumber == this.dueDateinNumber) {
          this.enablestartfromdatevalidation = false;
        }
      }
    }
  }

  checkRate(rate) {
    if (rate == true) {
      this.addRate = 'flatRatevalue';
    } else {
      this.addRate = '';
    }
  }

  checkRate1(rate1) {
    if (rate1 == true) {
      this.addRate1 = 'dimension';
    } else {
      this.addRate1 = '';
    }
  }

  passvalue(frequency) {
    console.log(frequency);
  }

  createBlock(frm) {
    frm.classList.add('was-validated');
    if (this.ctrateBlockform.valid) {
      let CreateBockData = {
        "ASAssnID": this.currentAssociationID,
        "ACAccntID": this.currentaccountID,
        "blocks": [
          {
            "ASAssnID": this.currentAssociationID,
            "BLBlkName": this.blockname,
            "BLBlkType": this.blocktype,
            "BLNofUnit": this.noofunits,
            "BLMgrName": this.mngName,
            "BLMgrMobile": this.mobile,
            "BLMgrEmail": this.manageremail,
            "ASMtType": '',
            "ASMtDimBs": this.maintenanceValue,
            "ASMtFRate": this.flatRatevalue,
            "ASUniMsmt": this.measurements,
            "ASIcRFreq": this.frequency,
            "ASBGnDate": formatDate(this.billGenerationDate, 'yyyy/MM/dd', 'en'),
            "ASLPCType": this.latePymtChargeType,
            "ASLPChrg": this.latePymtCharge,
            "ASLPSDate": formatDate(this.startsFrom, 'yyyy/MM/dd', 'en'),
            "ASDPyDate": formatDate(this.dueDate, 'yyyy/MM/dd', 'en'),
            "BankDetails": ''
          }
        ]
      }

      console.log('CreateBockData', CreateBockData);
      this.addblockservice.createBlock(CreateBockData)
        .subscribe(data => {
          console.log(data);
          if(data['data'] == null){
            swal.fire({
              title: "Block Created Successfully",
              text: "",
              type: "success",
              confirmButtonColor: "#f69321"
            }).then(
              (result) => {
                if (result.value) {
                  this.router.navigate(['home/viewBlocks']);
                }
              })
          }
          else if (data['data'] != null){
            swal.fire({
              title: "Error",
              text: data['data']['errorResponse']['message'],
              type: "error",
              confirmButtonColor: "#f69321"
            });
          }
       
        },
          () => {
            swal.fire({
              title: "Error",
              text: "Block Creation Unsuccessfull",
              type: "error",
              confirmButtonColor: "#f69321"
            });
          });

    }
  }

  removeValidationClass(frm) {
    this.enableduedatevalidation = false;
    frm.classList.remove('was-validated');
  }

}
