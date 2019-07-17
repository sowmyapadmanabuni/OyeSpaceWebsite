import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import {Bank} from '../models/bank';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.css']
})
export class BankComponent implements OnInit {
  @Input()  bankites:any[];
  @Output() addBankites = new EventEmitter<number>();
  @Output() deletebank:EventEmitter<any>;
  @Output() addnewbank:EventEmitter<any>; 

  BankId:number;
  BankName:string; 
  IFSC:string;
  AccountNumber:string;
  accountType:string;
  newBank:any={};
  
  constructor() {
    this.BankId = 0;
    this.addnewbank=new EventEmitter<Object>();
    this.deletebank=new EventEmitter<any>();
  }

  ngOnInit() {
  }

  ngOnChanges() {
    console.log('bankites', this.bankites);
  }
 
  addBank() {
    // this.BankId += 1;
    // this.addBankites.emit(1);
    // this.BankName = '';
    // this.IFSC = '';
    // this.AccountNumber='';
    // this.accountType='';
    this.addnewbank.emit(this.newBank);
    this.newBank.BABName='';
    this.newBank.BAIFSC='';
    this.newBank.BAActNo='';
    this.newBank.BAActType='';

  }
 
  deleteBank(BAActNo) {
    console.log('BAActNo',BAActNo);
    this.deletebank.emit(BAActNo);
  }
  accountTypes :any=[
    {"name":"Saving"}, 
    {"name":"Current"}
  ];

}
