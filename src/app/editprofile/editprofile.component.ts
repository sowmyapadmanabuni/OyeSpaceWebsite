import { Component, OnInit, TemplateRef } from '@angular/core';
import { GlobalServiceService } from '../global-service.service';
import{EditprofileService} from '../services/editprofile.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import Swal from 'sweetalert2';
import swal from 'sweetalert2';
import { Router,ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {
  accountID: number;
  currentAssociationID: string;
  allAccount=[];
  acfName: any;
  aclName: any;
  acMobile: any;
  acEmail: any;
  firstname: any;
  lastname: any;
  email: any;
  mobile: any;
  updateProfileData: any = {};
  ACFName: any;
  ACLName: any;
  ACMobile: any;
  ACEmail: any;
  modalRef: any;
  ACMobile1: any;
  ACEmail1: any;
  mobile1: any;
  email1: any;
  acEmail1: any;
  acMobile1: any;
  currentaccountid: any;


  constructor(private editprofileservice:EditprofileService,
    private globalservice:GlobalServiceService,
    private router:Router,
    private modalService: BsModalService,
    ) {       
      
    this.accountID=this.globalservice.acAccntID;
    }

  ngOnInit() {
    this.currentAssociationID = this.globalservice.getCurrentAssociationId();
    //this.accountID= this.globalservice.acAccntID;
    console.log(this.accountID);
    this.getProfileDetails();
    //this.updateEditProfile();
  
  }
  
  getProfileDetails(){
    console.log(this.accountID);
    this.editprofileservice.getProfileDetails(this.accountID).subscribe(res => {
      console.log(JSON.stringify(res));
      var data:any = res;
      this.allAccount = data.data.account;
      console.log('account',this.allAccount);
     this.acfName= this.allAccount[0]['acfName'];
     this.aclName= this.allAccount[0]['aclName'];
     this.acMobile= this.allAccount[0]['acMobile'];
     this.acEmail= this.allAccount[0]['acEmail'];
     this.acEmail1= this.allAccount[0]['acEmail1'];
     this.acMobile1= this.allAccount[0]['acMobile1'];
    this.currentaccountid=this.allAccount[0]['acAccntID'];
      });
  }


  updateEditProfile() {
console.log(this.currentaccountid);
    this.updateProfileData = {
      
        "ACFName"	: this.ACFName,
        "ACLName"	: this.ACLName,
        "ACEmail"	: this.ACEmail,
        "ACISDCode" : "+91",
        "ACMobile"	: this.ACMobile,
        "ACMobile1"	: this.ACMobile1,
        "ACISDCode1": "",
        "ACMobile2"	: "",
        "ACISDCode2": "",
        "ACMobile3"	: "",
        "ACISDCode3": "",
        "ACMobile4" : "",
        "ACISDCode4": "",
        "ACEmail1"  : this.ACEmail1,
        "ACEmail2"  : "",
        "ACEmail3"	: "",
        "ACEmail4"  : "",
        "ACAccntID"	: this.currentaccountid
      
    }
  

    this.editprofileservice.updateEditProfile(this.updateProfileData).subscribe(res => {
      console.log(JSON.stringify(res));
      Swal.fire({
        title: 'Profile Updated Successfuly',
       }).then(
         (result) => {
       
           if (result.value) {
             //this.form.reset();
             this.router.navigate(['home/dashboard']);
           
           } else if (result.dismiss === swal.DismissReason.cancel) {
             this.router.navigate(['home/dashboard']);
           }
         })
       });

    }




    OpenModal(edittemplate: TemplateRef<any>, acfName,aclName,acMobile,acEmail,acMobile1,acEmail1,acAccntID) {
      this.ACFName = acfName;
      this.ACLName = aclName;
      this.ACMobile = acMobile;
      this.ACEmail = acEmail;
      this.ACMobile1=acMobile1;
      this.ACEmail1=acEmail1;
      this.accountID=acAccntID;
      console.log(acfName);
      console.log(aclName);
      console.log(acMobile);
      console.log(acEmail);
  
  
      this.editprofileservice.getProfileDetails(this.accountID).subscribe(res => {
        //console.log(JSON.str ingify(res));
        var data: any = res;
        console.log(res['data']['account'][0].acfName);
        console.log(res['data']['account'][0].aclName);
        this.ACFName = res['data']['account'][0].acfName;
        this.ACLName = res['data']['account'][0].aclName;
        this.ACMobile=res['data']['account'][0].acMobile;
        this.ACMobile1=res['data']['account'][0].acMobile1;
        this.ACEmail=res['data']['account'][0].acEmail;
        this.ACEmail1=res['data']['account'][0].acEmail1;

        console.log(res['data']['account'][0].acMobile);
        console.log(res['data']['account'][0].acEmail);
        console.log(res['data']['account'][0].acEmail1);
        console.log(res['data']['account'][0].acMobile1);
       
      });
  
      this.modalRef = this.modalService.show(edittemplate,
        Object.assign({}, { class: 'gray modal-lg' }));
    }


}