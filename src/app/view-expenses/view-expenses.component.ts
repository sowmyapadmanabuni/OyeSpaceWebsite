import { Component, OnInit, TemplateRef } from '@angular/core';
import { ViewExpensesService } from '../services/view-expenses.service';
import { Viewexpense } from '../models/viewexpense';
import { Observable } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ExpenseData } from '../models/expense-data';
import { EditExpenseData } from '../models/edit-expense-data';
import { AddExpenseService } from '../services/add-expense.service';
import { BlocksByAssoc } from '../models/blocks-by-assoc';
import { PurchaseOrdersByAssoc } from '../models/purchase-orders-by-assoc';
import { UnitsByBlockID } from '../models/units-by-block-id';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { formatDate } from '@angular/common';
import { HttpEventType } from '@angular/common/http';
import { GlobalServiceService } from '../global-service.service';
import { ViewInvoiceService } from '../services/view-invoice.service';

@Component({
  selector: 'app-view-expenses',
  templateUrl: './view-expenses.component.html',
  styleUrls: ['./view-expenses.component.css']
})
export class ViewExpensesComponent implements OnInit {
  modalRef: BsModalRef;

  viewexpenses: Observable<Viewexpense[]>;
  mgrName: Observable<string>;

  associationlist: object;
  associationDetails: object;
  assnName: string;
  todayDate: Date;

  blockID: string;
  availableNoOfBlocks: number;
  allBlocksLists: BlocksByAssoc[];
  purchaseOrders: PurchaseOrdersByAssoc[];
  blockName: string;
  dateandTime: Date;
  purchaseorderid: string;
  applicableto: string;
  expenserecurrencetype: string;
  expensetype: string;
  expenseHead: object[];
  categories: object[];
  expensecategories: object[];
  applicabltToUnits: object[];
  distributionTypes: object[];
  expensehead: string;
  applies: string;
  distribution: string;
  ascUnit: UnitsByBlockID[];
  unitid: number;
  unit: string;
  methodArray: object[];
  checkField: string;
  paybymethod: string;
  selectedFile: File;
  expensedata: ExpenseData;
  editexpensedata: EditExpenseData;
  BPIden: number;
  EXRABudg: number;
  VNName: string;
  POEAmnt: number;
  p: number;
  dynamic: number;

  currentAssociationID: string;

  invoiceLists: any[];

  viewexpensesByBlockId: Object[];
  currentassociationname:string;

  constructor(private viewexpenseservice: ViewExpensesService,
    private modalService: BsModalService,
    private addexpenseservice: AddExpenseService,
    private router: Router,
    private toastr: ToastrService,
    private globalservice: GlobalServiceService,
    private viewinvoiceservice: ViewInvoiceService
  ) {
    this.currentassociationname=this.globalservice.getCurrentAssociationName();
    this.blockID = '';
    this.todayDate = new Date();
    this.currentAssociationID = this.globalservice.getCurrentAssociationId();

    //this.viewexpenseservice.GetExpenseListByAssocID();
    //this.mgrName= this.viewexpenseservice.GetBlockListByBlockID('1107');
    //this.viewexpenseservice.GetPurchaseOrderListByAssocID();

    this.expensedata = new ExpenseData();
    this.editexpensedata = new EditExpenseData();
    this.selectedFile = null;
    this.blockName = '';
    this.purchaseorderid = '';
    this.expensehead = '';
    this.expenserecurrencetype = '';
    this.applicableto = '';
    this.expensetype = '';
    this.distribution = '';
    this.unit = '';
    this.paybymethod = '';
    this.dateandTime = new Date();
    //this.editexpensedata.BLBlockID = 1107;
    //this.editexpensedata.ASAssnID = 1156;
    this.editexpensedata.EXHead = '';
    this.editexpensedata.EXRecurr = '';
    this.editexpensedata.EXApplTO = '';
    this.editexpensedata.EXType = '';
    this.editexpensedata.EXDisType = '';
    this.editexpensedata.PMID = '';
    this.editexpensedata.unUniIden = '';
    this.p = 1;
    this.dynamic = 0;

    //this.editexpensedata.UnUniIden = '';
    //this.editexpensedata.PMID = '';

    this.expenseHead = [
      { 'name': '', 'displayName': 'Corpus', 'id': 1 },
      { 'name': '', 'displayName': 'Generator', 'id': 2 },
      { 'name': '', 'displayName': 'Common Area Electric Bill', 'id': 3 },
      { 'name': '', 'displayName': 'Security Fees', 'id': 4 },
      { 'name': '', 'displayName': 'HouseKeeping', 'id': 5 },
      { 'name': '', 'displayName': 'Fixed Maintenance', 'id': 6 }
    ]

    this.categories = [
      { "name": "Monthly", "displayName": "Monthly", "id": 1 },
      { "name": "Quaterly", "displayName": "Quaterly", "id": 3 },
      { "name": "HalfYearly", "displayName": "Half Yearly", "id": 6 },
      { "name": "Annually", "displayName": "Annually", "id": 12 }
    ]

    this.expensecategories = [{ "name": "Fixed", "displayName": "Fixed", "id": 10 }, { "name": "Variable", "displayName": "Variable", "id": 11 }]

    this.applicabltToUnits = [
      { 'name': 'All', 'displayName': 'All Units' },
      { 'name': 'Single', 'displayName': 'Single Unit' },
      { 'name': 'SoldOwnerOccupied', 'displayName': 'Sold Owner-Occupied' },
      { 'name': 'SoldTenantOccupied', 'displayName': 'Sold Tenant-Occupied' },
      { 'name': 'SoldVacant', 'displayName': 'Sold Vacant' },
      { 'name': 'UnsoldVacant', 'displayName': 'Unsold Vacant' },
      { 'name': 'UnsoldTenant', 'displayName': 'Unsold Tenant-Occupied' },
      { 'name': 'AllSold', 'displayName': 'All Sold' },
      { 'name': 'AllUnSold', 'displayName': 'All UnSold' }
    ]

    this.methodArray = [{ 'name': 'Cash', 'displayName': 'Cash', 'id': 1 },
    { 'name': 'Cheque', 'displayName': 'Cheque', 'id': 2 },
    { 'name': 'DemandDraft', 'displayName': 'Demand Draft', 'id': 3 },
    { 'name': 'OnlinePay', 'displayName': 'OnlinePay', 'id': 4 }
    ]
  }

  ngOnInit() {
    // this.addexpenseservice.GetBlockListByAssocID()
    //   .subscribe(item => {
    //     console.log('item',item);
    //     this.addexpenseservice.GetBudgetProjectionsByBlockID(item[0].blBlockID);
    //     this.allBlocksLists = item;
    //     this.blockID = item[0].blBlockID;
    //     this.availableNoOfBlocks = item.length;

    //   });

    this.viewexpenseservice.getAssociationList(this.currentAssociationID)
      .subscribe(data => {
        this.associationlist = data['data'].association;
        this.associationDetails = data['data'].association;
        this.assnName = data['data'].association.asAsnName;
      });

    //this.viewexpenses = this.viewexpenseservice.GetExpenseListByAssocID(this.currentAssociationID);
    this.viewexpenses = this.viewexpenseservice.GetExpenseListByAssocID(this.currentAssociationID);
    //http://apidev.oyespace.com/oyeliving/api/v1/Expense/GetExpenseListByBlockID/{BlockID}


    this.addexpenseservice.GetPurchaseOrderListByAssocID(this.currentAssociationID)
      .subscribe(data => {
        console.log(data);
        this.purchaseOrders = data;
      });

    this.addexpenseservice.GetBlockListByAssocID(this.currentAssociationID)
      .subscribe(item => {
        this.allBlocksLists = item;
        console.log('allBlocksLists', this.allBlocksLists);
      });
  }

  GetExpenseListByBlockID(blockID) {
    console.log('GetExpenseListByBlockID',blockID);
    this.viewexpenseservice.currentBlockId=blockID;
    this.viewexpenseservice.GetExpenseListByBlockID(blockID)
    .subscribe(
      data=>{
        //console.log(data);
        this.viewexpensesByBlockId=data;
      }

    )
    //this.viewexpenseservice.GetExpenseListByBlockID(blockID);
    console.log(this.viewexpensesByBlockId);
  }

  poDetails() {
    console.log('poDetails');
    this.POEAmnt = this.purchaseOrders[0]['poEstAmt'];
    this.VNName = this.purchaseOrders[0]['poPrfVen'];
    this.BPIden = this.purchaseOrders[0]['bpIden'];
    this.EXRABudg = 0;
  }

  deleteExpense(unUniIden, exApplTO, inGenDate) {
    let viewexpense = {
      "UnUniIden": unUniIden,
      "EXApplTO": exApplTO,
      "INGenDate": inGenDate,
      "ASAssnID": this.viewexpenseservice.currentAssociationID
    }
    this.viewexpenseservice.deleteExpense(viewexpense)
      .subscribe(data => console.log(data));
  }
  generateInvoice() {
    this.viewexpenseservice.generateInvoice(this.currentAssociationID)
      .subscribe(() => {
        swal.fire({
          title: "Invoice Generated Successfully",
          text: "",
          type: "success",
          confirmButtonColor: "#f69321",
          confirmButtonText: "OK"
        })
      },
        () => {
          this.toastr.error('', 'Invoice has been generated for all expenses', {
            timeOut: 3000
          });
        }
      );
  }
  editExpense(repexpense1, idx) {
    console.log('repexpense1-', repexpense1);
    console.log('idx-', idx);
  }
  openModal(editexpensetemplate: TemplateRef<any>, exid: number, exDesc: any, expAmnt: string, exApplTO, exHead, exType, pmid, inNumber, poid, exPyCopy, exRecurr, exDate, blBlockID) {

    this.POEAmnt = this.purchaseOrders[0]['poEstAmt'];
    this.VNName = this.purchaseOrders[0]['poPrfVen'];
    this.BPIden = this.purchaseOrders[0]['bpIden'];
    this.EXRABudg = 0;

    this.editexpensedata.EXID = exid;
    this.editexpensedata.EXDesc = exDesc;
    this.editexpensedata.EXPAmnt = expAmnt;
    this.editexpensedata.EXApplTO = exApplTO;
    this.editexpensedata.EXHead = exHead;
    this.editexpensedata.EXType = exType;
    this.editexpensedata.PMID = pmid;
    this.editexpensedata.inNumber = inNumber;
    this.editexpensedata.POID = poid;
    this.editexpensedata.EXPyCopy = exPyCopy;
    this.editexpensedata.EXRecurr = exRecurr;
    this.editexpensedata.EXDate = formatDate(exDate, 'MM/dd/yyyy', 'en');
    this.editexpensedata.BLBlockID = blBlockID;

    this.modalRef = this.modalService.show(editexpensetemplate,
      Object.assign({}, { class: 'gray modal-lg' }));

    const dataTransfer = new ClipboardEvent('').clipboardData || new DataTransfer();
    dataTransfer.items.add(new File([exPyCopy], exPyCopy));
    console.log('dataTransfer', dataTransfer);
    const inputElement: HTMLInputElement = document.getElementById('uploadFileinput') as HTMLInputElement;
    console.log('inputElement', inputElement.files);
    inputElement.files = dataTransfer.files;
  }

  prerequisitesAddUnit(blockName: string) {
    this.addexpenseservice.prerequisitesAddUnit(this.blockID);
  }
  applicableTo(applicableto: string) {
    let blockid = this.editexpensedata.BLBlockID;
    console.log(applicableto);
    this.applies = applicableto;
    if (this.applies == 'All' || this.applies == 'SoldOwnerOccupied' || this.applies == 'SoldTenantOccupied') {
      this.distributionTypes = [{ "name": "Dimension Based" }, { "name": "Per Unit" }, { "name": "Actuals" }];
    }
    //  $scope.ascUnit = '';
    this.addexpenseservice.GetUnitListByBlockID(blockid)
      .subscribe(data => {
        console.log(data);
        this.ascUnit = data;
      })
  }

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
    let splitarr = this.selectedFile['name'].split('.')
    let currentdate = new Date();
    let expycopy = splitarr[0] + '_' + currentdate.getTime().toString() + '.' + splitarr[1];

    this.editexpensedata.EXPyCopy = expycopy;
  }

  onUpLoad() {
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.editexpensedata.EXPyCopy);
    this.addexpenseservice.onUpLoad(fd)
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          console.log('Upload Progress: ' + Math.round(event.loaded / event.total * 100) + '%');
          this.dynamic = Math.round(event.loaded / event.total * 100);
        }
        else if (event.type === HttpEventType.Response) {
          console.log(event);
          this.dynamic = 0;
        }
      });
  }

  showMethod(PMID: string) {
    let paymentobj = this.methodArray.filter(item => item['id'] == PMID)
    this.checkField = paymentobj[0]['name'];
  }
  gotoAddexpense() {
    this.router.navigate(['home/addexpense']);
  }

  updateExpense() {
    this.editexpensedata.EXDate = formatDate(this.editexpensedata.EXDate, 'yyyy/MM/dd', 'en');
    console.log('editexpensedata', this.editexpensedata);
    this.viewexpenseservice.updateExpense(this.editexpensedata)
      .subscribe(data => {
        swal.fire({
          title: "Expense update Successfully",
          text: "",
          type: "success",
          confirmButtonColor: "#f69321",
          confirmButtonText: "OK"
        })
      })
  }

  getCurrentBlockDetails(blBlockID) {
    console.log('blBlockID-' + blBlockID);
    this.viewinvoiceservice.getCurrentBlockDetails(blBlockID, this.currentAssociationID)
      .subscribe(data => {
        this.invoiceLists = data['data'].invoices;
        console.log('invoiceLists?', this.invoiceLists);
      })
  }

}

