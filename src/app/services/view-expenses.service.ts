import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import { Viewexpense } from '../models/viewexpense';
import { Observable } from 'rxjs';
import { PurchaseOrdersByAssoc } from '../models/purchase-orders-by-assoc';
import { EditExpenseData } from '../models/edit-expense-data';

@Injectable({
  providedIn: 'root'
})
export class ViewExpensesService {
  ipAddress: string;
  currentAssociationID: number;
  url: string;
  block: string;
  editRowId: number;

  todayDate: Date;

  purchaseordersbyassoc: PurchaseOrdersByAssoc[];

  invoiceLists: any[];
  totalItems: number;

  currentBlockId: string;

  constructor(private http: HttpClient) {
    this.ipAddress = 'http://apidev.oyespace.com/';
    this.todayDate = new Date();
  }

  getAssociationList(currentAssociationID) {
    console.log('getAssociationList', currentAssociationID);
    let headers = this.getHttpheaders();
    this.url = `${this.ipAddress}oyeliving/api/v1/association/getAssociationList/${currentAssociationID}`;
    return this.http.get(this.url, { headers: headers })
  }

  /*GetExpenseListByAssocID(): Observable<Viewexpense>{
    console.log('GetExpenseListByAssocID')
    let mgrName:Observable<string>;
    let headers = this.getHttpheaders();
    this.url = `${this.ipAddress}oyeliving/api/v1/Expense/GetExpenseListByAssocID/${this.currentAssociationID}`;
    return this.http.get(this.url, { headers: headers })
      .pipe(
        map((data)=>{
          console.log(data['data'].expenseByAssoc);
        mgrName = this.GetBlockListByBlockID(data['data'].expenseByAssoc[0].blBlockID);
        this.block=data['data'].expenseByAssoc[0].blBlockID;
           return data['data'].expenseByAssoc.map(item => {
            return new Viewexpense
              (item.unUniIden,
                item.exApplTO,
                item.exDate,
                item.expAmnt,
                mgrName)
          })
        })
      )
  }*/

  GetExpenseListByAssocID(currentAssociationID): Observable<Viewexpense[]>{
    console.log('GetExpenseListByAssocID')
    let headers = this.getHttpheaders();
    this.url = `${this.ipAddress}oyeliving/api/v1/Expense/GetExpenseListByAssocID/${currentAssociationID}`;
    return this.http.get(this.url, { headers: headers })
      .pipe(
        map(data => {
          return data['data'].expenseByAssoc.map(item => {
            return new Viewexpense
              (item.exid,
                item.unUniIden,
                item.exApplTO,
                item.exDate,
                item.expAmnt,
                item.exDesc,
                '',
                item.exHead,
                item.exType,
                item.pmid,
                item.inNumber,
                item.EXDDNo,
                item.EXDDDate,
                item.poid,
                item.inGenDate,
                item.exPyCopy,
                item.exRecurr,
                item.blBlockID
              )
          })
        })
      )
  }

  GetExpenseListByBlockID(BlockID){
   //http://apidev.oyespace.com/oyeliving/api/v1/Expense/GetExpenseListByBlockID/{BlockID}
    let headers = this.getHttpheaders();
    this.url = `${this.ipAddress}oyeliving/api/v1/Expense/GetExpenseListByBlockID/${BlockID}`;
    return this.http.get(this.url, { headers: headers })
    .pipe(map(data => {return data['data']['expenseByBlock']})
    )
  }

  GetBlockListByBlockID(data: object): Observable<Viewexpense[]> {
    console.log('expenseByAssoc', data['data'].expenseByAssoc);
    console.log('GetBlockListByBlockID')
    this.block = data['data'].expenseByAssoc[0].blBlockID;
    let headers = this.getHttpheaders();
    this.url = `${this.ipAddress}oyeliving/api/v1/Block/GetBlockListByBlockID/${this.block}`;
    return this.http.get(this.url, { headers: headers })
      .pipe(map(obj => {
        console.log('length', data['data'].expenseByAssoc.length);
        this.totalItems = data['data'].expenseByAssoc.length;
        console.log('expenseByAssoc', data['data'].expenseByAssoc);
        return data['data'].expenseByAssoc.map(item => {
          return new Viewexpense
            (item.exid,
              item.unUniIden,
              item.exApplTO,
              item.exDate,
              item.expAmnt,
              item.exDesc,
              obj['data'].blocksByBlockID[0].blMgrName,
              item.exHead,
              item.exType,
              item.pmid,
              item.inNumber,
              item.EXDDNo,
              item.EXDDDate,
              item.poid,
              item.inGenDate,
              item.exPyCopy,
              item.exRecurr,
              item.blBlockID
            )
        })
      }))
  }

  generateInvoice(currentAssociationID) {
    console.log('currentBlockId', this.currentBlockId);
    console.log('currentAssociationID', currentAssociationID);
    let headers = this.getHttpheaders();
    this.url = `${this.ipAddress}oyeliving/api/v1/invoice/list/${currentAssociationID}/${this.currentBlockId}`;
    return this.http.get(this.url, { headers: headers })
      .pipe(switchMap(data => this.generateInvoice_post(data)))
  }

  generateInvoice_post(data: object) {
    console.log('data', data);
    let headers = this.getHttpheaders();
    this.invoiceLists = data['data'].invoices;
    let test = '';

    for (let i = 0; i < this.invoiceLists.length; i++) {
      if (i == this.invoiceLists.length - 1)
        test += "'" + this.invoiceLists[i].inid + "'";
      else
        test += "'" + this.invoiceLists[i].inid + "',";
    }
    let url = `${this.ipAddress}oyeliving/api/v1/invoice/generate`
    console.log('generateinvoice', test);
    return this.http.post(url, JSON.stringify(test), { headers: headers });
  }


  GetUnitListByBlockID() {
    let headers = this.getHttpheaders();
    this.url = `${this.ipAddress}oyeliving/api/v1/Unit/GetUnitListByBlockID/${this.block}`;
    this.http.get(this.url, { headers: headers })
      .subscribe(data => {
        console.log(data);
      });
  }
  deleteExpense(viewexpense) {
    console.log('viewexpense', viewexpense);
    let headers = this.getHttpheaders();
    this.url = `${this.ipAddress}oyeliving/api/v1/Expense/ExpenseUpdate`;
    return this.http.post(this.url, JSON.stringify(viewexpense), { headers: headers });
  }
  editExpense(repexpense1, idx) {
    this.editExpense = repexpense1;
    this.editRowId = idx;
  }
  // updateExpense(idx) {
  //   this.viewExpenses[idx] = this.editExpense;
  //   let headers = this.getHttpheaders();
  //   this.url = `${this.ipAddress}oyeliving/api/v1/Expense/ExpenseUpdate`;
  //   this.http.post(this.url, JSON.stringify(this.viewExpenses[idx]), { headers: headers }).subscribe(data => console.log(data));
  // }
  GetPurchaseOrderListByAssocID() {
    let headers = this.getHttpheaders();
    this.url = `${this.ipAddress}oyeliving/api/v1/PurchaseOrder/GetPurchaseOrderListByAssocID/${this.currentAssociationID}`;
    this.http.get(this.url, { headers: headers })
      .pipe(map(data => {
        return data['data'].purchaseOrdersByAssoc.map(item => {
          return new PurchaseOrdersByAssoc(
            item.acAccntID,
            item.asAssnID,
            item.blBlockID,
            item.bpIden,
            item.poAprMEID,
            item.poAprStat,
            item.poDesc,
            item.poEstAmt,
            item.poHead,
            item.poIsActive,
            item.poPrfVen,
            item.poQnty,
            item.poUniMsmt,
            item.podCreated,
            item.podUpdated,
            item.poetDel,
            item.poid,
            item.vnid)
        })
      }))
      .subscribe(data => {
        this.purchaseordersbyassoc = data;
      });
  }
  updateExpense(editexpensedata: EditExpenseData) {
    console.log(JSON.stringify(editexpensedata));
    let headers = this.getHttpheaders();
    this.url = `${this.ipAddress}oyeliving/api/v1/Expense/ExpenseUpdate`;
    return this.http.post(this.url, JSON.stringify(editexpensedata), { headers: headers });
  }
  getHttpheaders(): HttpHeaders {
    const headers = new HttpHeaders()
      .set('Authorization', 'my-auth-token')
      .set('X-Champ-APIKey', '1FDF86AF-94D7-4EA9-8800-5FBCCFF8E5C1')
      .set('Content-Type', 'application/json');
    return headers;
  }

}
