import { Component, OnInit , ElementRef, ViewChild} from '@angular/core';
import {DashBoardService} from './dash-board.service';
import {GlobalServiceService} from '../global-service.service';
import { AppComponent } from '../app.component';
import {LoginAndregisterService} from '../services/login-andregister.service';
import {Router, NavigationEnd} from '@angular/router';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements OnInit {
  associations:any= [];
  allMemberByAccount=[];
  allTicketByAssociation=[];
  allVehicleListByAssn=[];
  allStaffByAssn=[];
  account=[];
  allVisitorsByAssn=[];
  accountID:number;
  totalMember:string;
  associationID:string;
  totalTickets:string;
  totalVehicles:string;
  totalStaffs:string;
  totalVisitors:string;
  amount:string;
  AssociationAmountDue:boolean=false;
  memberDeatils:boolean=false;
  ticketDetails:boolean=false;
  vehicleDetails:boolean=false;
  currentAssociationName:string;
  association:string;
  amt:any[];
  mrmRoleID:number;
  staffDetails: boolean;
  visitorDetails: boolean;

  @ViewChild('amounts') public amounts:ElementRef;
@ViewChild('member') public member:ElementRef;
@ViewChild('ticket') public ticket:ElementRef;
@ViewChild('vehicle') public vehicle:ElementRef;
@ViewChild('staff') public staff:ElementRef;
@ViewChild('visitor') public visitor:ElementRef;
  acfName: any;
  aclName: any;
 

  constructor(private dashBrdService: DashBoardService, private appComponent:AppComponent,
     private globalService:GlobalServiceService,
     private loginandregisterservice:LoginAndregisterService,
     private router: Router) { 
      this.accountID=this.globalService.acAccntID;
       this.association='';
     }

  ngOnInit() {
    this.getAssociation();
    this.getAmount();
    this.getMembers();
    this.getTickets();
    this.getVehicle();
    this.getStaff();
    this.getVistors();
    this.getAccountFirstName();
  }

  getAssociation(){
    console.log('this.accountID',this.accountID);
    this.dashBrdService.getAssociation(this.accountID).subscribe(res => {
      //console.log(JSON.stringify(res));
      var data:any = res;
      this.associations = data.data.associationByAccount;
      console.log('associations',this.associations);
      },
      res=>{
        console.log('Error in getting Associations',res);
      });
  }
  getAmount(){
    this.dashBrdService.getAmount(this.associationID).subscribe(res=>{
      console.log('amount',res);
      // if (res['data']['errorResponse']) {
      //   this.amount = "0";
      // }
      // else if (res['data']['payments'][1].pyAmtDue) {
      //   this.amount=res['data']['payments'][1].pyAmtDue;
        
      // }
     this.amt =  res['data']['payments'].filter(item=>{
         console.log(item);
         if(item['pyStat'] == "UnPaid"){
         return item['pyAmtDue'];
         }
         })
      
       console.log('amounts',this.amt[0]['pyAmtDue']);
       this.amount = this.amt[0]['pyAmtDue'];
    })
  }

  // getMembers(){
  //     this.dashBrdService.getMembers(this.accountID).subscribe(res => {
  //       //console.log(JSON.stringify(res));
  //       var data:any = res;
  //       this.allMemberByAccount = data.data.memberListByAccount;
  //       console.log('allMemberByAccount',this.allMemberByAccount);
  //      this.mrmRoleID= this.allMemberByAccount[0]['mrmRoleID'];
  //      this.dashBrdService.mrmRoleID=this.mrmRoleID;
  //       this.totalMember= data.data.memberListByAccount.length;
  //       });
  // }

  getMembers() {
    this.dashBrdService.getMembers(this.accountID).subscribe(res => {
      //console.log(JSON.stringify(res));
      var data: any = res;
      this.allMemberByAccount = data.data.memberListByAccount;
      console.log('allMemberByAccount', this.allMemberByAccount);
      this.mrmRoleID = this.allMemberByAccount[0]['mrmRoleID'];
      this.dashBrdService.mrmRoleID = this.mrmRoleID;
      this.totalMember = data.data.memberListByAccount.length;
    },
      (res) => {
        console.log(res);
        this.dashBrdService.memberdoesnotexist = true;

      });
  }

  getTickets() {
    this.dashBrdService.getTickets(this.associationID).subscribe(res => {
      console.log('ticketresult-', res);
      if (res['data']['errorResponse']) {
        this.totalTickets = "0";
      }
      else if (res['data']['ticketing']) {
        this.allTicketByAssociation = res['data']['ticketing'];
        this.totalTickets = res['data']['ticketing'].length;
        console.log('totalTickets', this.totalTickets);
      }
      // var data:any = res;

    });
  }

  getAccountFirstName(){
    this.dashBrdService.getAccountFirstName(this.accountID).subscribe(res => {
      //console.log(JSON.stringify(res));
      var data:any = res;
      this.account = data.data.account;
      console.log('account',this.account);
     this.acfName= this.account[0]['acfName'];
     this.aclName= this.account[0]['aclName'];
     this.dashBrdService.acfName=this.acfName;
     this.dashBrdService.aclName=this.aclName;
      });
}

  getVehicle(){
      this.dashBrdService.getVehicle(this.associationID).subscribe(res => {
        console.log('vehicle',res);
        var data:any = res;
        this.allVehicleListByAssn = data.data.vehicleListByAssocID;
        this.totalVehicles= data.data.vehicleListByAssocID.length;
        });
  }
  getStaff(){
    this.dashBrdService.getStaff(this.associationID).subscribe(res=>{
      console.log('staff',res);
      if (res['data']['errorResponse']) {
        this.totalStaffs = "0";
      }
      else if (res['data']['worker']) {
        this.allStaffByAssn=res['data']['worker'];
      this.totalStaffs=res['data']['worker'].length;
        
     }
    })
  }
  getVistors(){
    this.dashBrdService.getVisitors(this.associationID).subscribe(res=>{
      console.log('visitors',res);
      if (res['data']['errorResponse']) {
        this.totalVisitors = "0";
      }
      else if (res['data']['visitorLog']) {
        this.allStaffByAssn=res['data']['visitorLog'];
      this.totalVisitors=res['data']['visitorLog'].length;
        
     }
    })
  }

  loadAssociation(associationName:string){
    //this.appComponent.myMenus=true;
    console.log("AssociationName: ",associationName);
    this.currentAssociationName = associationName;
    this.associations.forEach(association => {
      if(association.asAsnName == associationName)
      {
        this.globalService.setCurrentAssociationId(association.asAssnID);
        this.globalService.setCurrentAssociationName(associationName);
        this.associationID=this.globalService.getCurrentAssociationId();
        console.log("Selected AssociationId: " + this.globalService.getCurrentAssociationId());
      }
      
    });
    this.getAmount();
    this.getMembers();
    this.getTickets();
    this.getVehicle();
    this.getStaff();
    this.getVistors();
    
  }

  assnAmountDue(){
    this.AssociationAmountDue=true;
    this.memberDeatils=false;
    this.ticketDetails=false;
    this.vehicleDetails=false;
    this.staffDetails=false;
    this.visitorDetails=false;
    this.amounts.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'start' });
    }
   
    members(){
      this.AssociationAmountDue=false;
      this.memberDeatils=true;
      this.ticketDetails=false;
      this.vehicleDetails=false;
      this.staffDetails=false;
      this.visitorDetails=false;
      this.member.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'start' });
   
    }
   
    tickets(){
      this.AssociationAmountDue=false;
      this.memberDeatils=false;
      this.ticketDetails=true;
      this.vehicleDetails=false;
      this.staffDetails=false;
      this.visitorDetails=false;
      this.ticket.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'start' });
    }
   
   vehicles(){
       this.vehicleDetails=true;
       this.AssociationAmountDue=false;
       this.memberDeatils=false;
       this.ticketDetails=false;
       this.staffDetails=false;
       this.visitorDetails=false;
       this.vehicle.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'start' });
   }

 staffs(){
  this.staffDetails=true;
  this.vehicleDetails=false;
  this.AssociationAmountDue=false;
  this.memberDeatils=false;
  this.ticketDetails=false;
  this.visitorDetails=false;
  this.staff.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'start' });
 }
 visitors(){
  this.visitorDetails=true;
  this.staffDetails=false;
  this.vehicleDetails=false;
  this.AssociationAmountDue=false;
  this.memberDeatils=false;
  this.ticketDetails=false;
  this.visitor.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'start' });
 }

}