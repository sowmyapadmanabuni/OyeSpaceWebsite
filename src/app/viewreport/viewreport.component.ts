import { Component, OnInit } from '@angular/core';
import {ViewreportService} from '../services/viewreport.service';
import {GlobalServiceService} from '../global-service.service';

@Component({
  selector: 'app-viewreport',
  templateUrl: './viewreport.component.html',
  styleUrls: ['./viewreport.component.css']
})
export class ViewreportComponent implements OnInit {
  displaypaymentdetails:any[];
  allpaymentdetails:any[];
  reportID:string;
  currentAssociationID: string;
  frequencys:any[];

  constructor(private viewreportservice:ViewreportService,
    private globalservice:GlobalServiceService) {
      this.frequencys = [
        { "name": "Paid", "displayName": "Paid" },
        { "name": "UnPaid", "displayName": "UnPaid" }
      ];
     }

  ngOnInit() {
    this.currentAssociationID=this.globalservice.getCurrentAssociationId();
    this.getpaymentdetails();
  }

  getPaidUnpaidDetail(reportID) {
    console.log('reportID', reportID);
    this.displaypaymentdetails = this.allpaymentdetails.filter(item=>{
      return item['pyStat'] == reportID;
    })
  }
getpaymentdetails(){
  this.viewreportservice.getpaymentdetails(this.currentAssociationID).subscribe((data)=>{
  this.allpaymentdetails=data['data']['payments'];
  console.log('allpaymentdetails',this.allpaymentdetails);
  })
}

}
