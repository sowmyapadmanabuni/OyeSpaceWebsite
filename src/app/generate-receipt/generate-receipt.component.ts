import { Component, OnInit } from '@angular/core';
import { GenerateReceiptService } from '../services/generate-receipt.service';
import { GlobalServiceService } from '../global-service.service';
import swal from 'sweetalert2';
import {Router} from '@angular/router';

@Component({
  selector: 'app-generate-receipt',
  templateUrl: './generate-receipt.component.html',
  styleUrls: ['./generate-receipt.component.css']
})
export class GenerateReceiptComponent implements OnInit {

  allBlocksByAssnID: any[];
  blBlockID: string;
  unpaidUnits: any[];
  unit: string;
  methodArray: object[];
  paymentmethod: string;
  checkField: string;
  chequeDate: Date;

  voucherNo: string;
  PymtRefNo: string;
  ddNo: string;
  chequeNo: string;
  dateandTime: Date;
  getMemberId: number;
  curAssociationID: number;

  amountPaid: number;
  invoice: number;
  amountDue: number;
  unitID: number;
  bankname: string;
  bankList: string[];
  paymentDescription: string;
  MEMemID: string;
  PYRefNo: string;
  PMID: string;

  pyid: string;

  constructor(private generatereceiptservice: GenerateReceiptService,
    private globalservice: GlobalServiceService,
    private router:Router) {
    this.blBlockID = '';
    this.unit = '';
    this.paymentmethod = '';
    this.dateandTime = new Date();
    this.curAssociationID = parseInt(this.globalservice.getCurrentAssociationId());

    this.pyid = '';
    this.bankname = '';
    this.paymentDescription = 'PaymentMade';


    this.methodArray = [{ 'name': 'Cash', 'displayName': 'Cash', 'id': 1 },
    { 'name': 'Cheque', 'displayName': 'Cheque', 'id': 2 },
    { 'name': 'Demand Draft', 'displayName': 'Demand Draft', 'id': 3 },
    { 'name': 'OnlinePay', 'displayName': 'OnlinePay', 'id': 4 }
    ];

    this.bankList = [
      'Allahabad Bank',
      'Andhra Bank',
      'Bank of Baroda',
      'Bank of India',
      'Bank of Maharashtra',
      'Canara Bank',
      'Central Bank of India',
      'Corporation Bank',
      'Indian Bank',
      'Indian Overseas Bank',
      'Oriental Bank of Commerce',
      'Punjab and Sind Bank',
      'Punjab National Bank',
      'State Bank of India',
      'Syndicate Bank',
      'UCO Bank',
      'Union Bank of India',
      'United Bank of India',
      'Catholic Syrian Bank',
      'City Union Bank',
      'DCB Bank',
      'Dhanlaxmi Bank',
      'Federal Bank',
      'HDFC Bank',
      'ICICI Bank',
      'IDFC First Bank',
      'IndusInd Bank',
      'Jammu & Kashmir Bank',
      'Karnataka Bank',
      'Karur Vysya Bank',
      'Kotak Mahindra Bank',
      'Lakshmi Vilas Bank',
      'Nainital Bank',
      'RBL Bank',
      'South Indian Bank',
      'Tamilnad Mercantile Bank Limited',
      'Yes Bank',
      'IDBI Bank'
    ]
  }

  ngOnInit() {
    this.generatereceiptservice.GetBlockListByAssocID(this.curAssociationID)
      .subscribe(data => {
        this.allBlocksByAssnID = data['data'].blocksByAssoc;
        console.log('allBlocksByAssnID', this.allBlocksByAssnID);
      });
  }

  getCurrentBlockDetails(blBlockID) {
    this.generatereceiptservice.getCurrentBlockDetails(blBlockID, this.curAssociationID)
      .subscribe(data => {
        this.unpaidUnits = data['data']['paymentsUnpaid'];
        console.log('unpaidUnits', this.unpaidUnits);
      })
  }

  showMethod(paymentmethod) {
    this.checkField = paymentmethod;
  }

  gotoviewreceipt() {
    this.router.navigate(['home/viewreceipt']);
  }

  rowDetails(pyid) {
    console.log('pyid-' + pyid);
    let invobj = this.unpaidUnits.find(item => item['pyid'] == pyid);
    console.log('inNumber-' + invobj['inNumber']);
    console.log('pyAmtDue-' + invobj['pyAmtDue']);
    console.log('pyAmtPaid-' + invobj['pyAmtPaid']);
    console.log('unUnitID-' + invobj['unUnitID']);
    this.invoice = invobj['inNumber'];
    this.amountDue = invobj['pyAmtDue'];
    this.amountPaid = invobj['pyAmtPaid'];
    this.unitID = invobj['unUnitID'];
    this.MEMemID = invobj['meMemID'];
    this.PYRefNo = invobj['pyid'];
    this.PMID = invobj['pmid'];
  }

  generateReceipt() {

    if (this.voucherNo != '' || this.voucherNo != undefined) {
      this.PymtRefNo = this.voucherNo;
    } else if (this.ddNo != '' || this.ddNo != undefined) {
      this.PymtRefNo = this.ddNo;
    } else if (this.chequeNo != '' || this.chequeNo != undefined) {
      this.PymtRefNo = this.chequeNo;
    } else {
      this.PymtRefNo = '';
    }

    let newReceipt = {
      "MEMemID": "1",//this.MEMemID,
      "PYRefNo": this.PYRefNo,
      "PYBkDet": this.bankname,
      "PYAmtPaid": this.amountPaid,
      "INNumber": this.invoice,
      "UNUnitID": this.unitID,
      "PYTax": "12.6",
      "ASAssnID": this.curAssociationID,
      "PMID": 1,//this.PMID,
      "PYDesc": "PaymentMade"
    }

    this.generatereceiptservice.addPayment(newReceipt)
      .subscribe(data => {
        console.log(data);
        swal.fire({
          title: "Receipt Generated Successfully",
          text: "",
          type: "success",
          confirmButtonColor: "#f69321",
          confirmButtonText: "OK"
        })

      },
      ()=>{
        swal.fire({
          title: "Error in Receipt Creation",
          text: "",
          type: "error",
          confirmButtonColor: "#f69321",
          confirmButtonText: "OK"
        })
      })

  }

}
