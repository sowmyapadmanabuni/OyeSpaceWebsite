import { Component, ViewChild, ElementRef, OnInit, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import {GlobalServiceService} from '../global-service.service';
import {DashBoardService} from '../dash-board/dash-board.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  code: string;
  title = 'mylogin';
  mobile: number;
  mobilenumber: number;
  otp: number;
  ipAddress = 'http://apidev.oyespace.com';
  inpt: any;
  public countrydata: object;
  @ViewChild('myButton1') myButton1: any;
  @Output() toggleMyMenus:EventEmitter<string>;
  returnUrl: string;

  constructor(private http: HttpClient, public router: Router,
    private globalserviceservice: GlobalServiceService, private route: ActivatedRoute,
    private dashboardservice:DashBoardService) {
      //alert('inside login component');
    // redirect to home if already logged in
    if (this.globalserviceservice.acAccntID) {
      //alert('globalserviceservice.acAccntID'+this.globalserviceservice.acAccntID);
      //alert('this.globalserviceservice.acAccntID has value'+this.globalserviceservice.acAccntID);
      this.router.navigate(['home']);
    }
    else{
      //alert('inside else part in login component...');
      //alert('this.globalserviceservice.acAccntID'+this.globalserviceservice.acAccntID);
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'home';
      //alert('returnURL-'+this.returnUrl);
      //this.router.navigate([this.returnUrl]);
    }
  }

  ngOnInit() {
     // get return url from route parameters or default to '/'
     //this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
  }

  sendOTP() {
    
    let headers = this.getHttpheaders();
    let url = `${this.ipAddress}/oyeliving/api/v1/account/sendotp`
    // document.getElementById("myButton1").value="Resend";
    var mobileNoData = {
      // CountryCode: this.code,
      CountryCode: this.code,
      MobileNumber: this.mobilenumber
    };

    var timeLeft = 30;
    var elem = document.getElementById('some_div');
    var element = <HTMLInputElement>document.getElementById("myButton1");

    var timerId = setInterval(countdown, 1000);

    function countdown() {
      if (timeLeft == 0) {
        clearTimeout(timerId);
        if(element.value != null){
          element.value = "Resend";
          }
        // doSomething();
      } else {
        element.disabled=true;
        elem.innerHTML = timeLeft - 1 + ' seconds to resend';
        timeLeft--;
        if (timeLeft == 0) {
          console.log('timeLeft == 0',timeLeft);
          clearTimeout(timerId);
          if(element.value != null){
            element.value = "Resend";
            }
        }
      }
      var x = document.getElementById("snackbar");
   x.className = "show";
   setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    }

    console.log(mobileNoData);
    return this.http.post(url, JSON.stringify(mobileNoData), { headers: headers })
      .subscribe(data => { console.log(data) })
  }

  getHttpheaders(): HttpHeaders {
    const headers = new HttpHeaders()
      .set('Authorization', 'my-auth-token')
      .set('X-Champ-APIKey', '1FDF86AF-94D7-4EA9-8800-5FBCCFF8E5C1')
      .set('Content-Type', 'application/json');
    return headers;
  }

  verifyOtp() {
    //alert('inside verifyOtp...');
    let headers = this.getHttpheaders();
    let url = `${this.ipAddress}/oyeliving/api/v1/account/verifyotp`
    var otpdata = {
      // CountryCode : this.code,
      CountryCode: this.code,
      MobileNumber: this.mobilenumber,
      OTPnumber: this.otp
    };
    this.http.post(url, JSON.stringify(otpdata), { headers: headers })
      .subscribe(data => {
        console.log(data)
        if (data['data'] == null) {
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
            text: 'Please register your Number!',
            // footer: '<a href>Why do I have this issue?</a>'
          }).then((result) => {
            if (result.value) {
             this.router.navigate(['register']);
            }
          })
        }
       else if (data['data'] != null){
         //alert('inside verifyotp..data!= null');
        console.log('acAccntID',data['data']['account']['acAccntID']);
        this.globalserviceservice.acAccntID=data['data']['account']['acAccntID'];
        //alert('assigned accountid to globalserviceservice.acAccntID');
        //alert('displaying globalserviceservice.acAccntID'+this.globalserviceservice.acAccntID);
        //this.dashboardservice.getMembers(this.globalserviceservice.acAccntID).subscribe(res => {
          //alert('assigning mrmRoleID...');
          //this.dashboardservice.mrmRoleID = res['data'].memberListByAccount[0]['mrmRoleID'];
          //alert('displaying dashboardservice.mrmRoleID..'+this.dashboardservice.mrmRoleID);
          //this.router.navigate(['home']);
        //},
        //res=>{
          //alert('dashboardservice.mrmRoleID'+this.dashboardservice.mrmRoleID);
        //});

        //alert('navigate to home component...');
        this.router.navigate(['home']);
        }
      })
     
  }


  otpCall(e) {
    e.preventDefault();
    let headers = this.getHttpheaders();
    var reSendOtpData = {
      CountryCode: this.code,
      MobileNumber: this.mobilenumber,
      OTPnumber: this.otp
    };
    let url = `http://control.msg91.com/api/retryotp.php?authkey=261622AtznpKYJ5c5ab60e&mobile=${this.code}${this.mobilenumber}&retrytype=voice`;
    //http://control.msg91.com/api/retryotp.php?authkey=261622AtznpKYJ5c5ab60e&mobile=917975536425&retrytype=voice
    console.log(url);
    console.log('reSendOtpData', reSendOtpData);
    this.http.get(url)
      .subscribe(data => {
        console.log(data)
      })
  }





  resendOtp(e) {
    e.preventDefault();
    let headers = this.getHttpheaders();
    let url = `${this.ipAddress}oyeliving/api/v1/account/resendotp`
    var reSendOtpData = {
      CountryCode: this.code,
      MobileNumber: this.mobilenumber,
      OTPnumber: this.otp
    };
    console.log('reSendOtpData', reSendOtpData);
    this.http.post(url, JSON.stringify(reSendOtpData), { headers: headers })
      .subscribe(data => {
        console.log(data)
      })
  }



  telInputObject(telinputobj) {
    this.code = '+' + telinputobj['b'].getAttribute('data-dial-code');
    console.log(this.code);
  }
  hasError(errorobj) {
    console.log(errorobj);
  }
  getNumber(numberobj) {
    console.log(numberobj);
  }
  onCountryChange(countryobj) {
    this.code = countryobj['dialCode']
    console.log(countryobj);
  }




  getCountryData() {
    //alert('test')
  }
  _keyPress(event) {
    if(event.keyCode == 13) {
      this.sendOTP();
     }
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
        event.preventDefault();
    }
  }

  keyPressToDashboard(event){
    if(event.keyCode == 13) {
      this.verifyOtp();
     }
  }

}
