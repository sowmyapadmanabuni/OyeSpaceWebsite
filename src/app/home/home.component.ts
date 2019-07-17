import { Component, OnInit,HostListener } from '@angular/core';
import {GlobalServiceService} from '../global-service.service';
import { LoginAndregisterService } from '../services/login-andregister.service';
import {DashBoardService} from '../dash-board/dash-board.service';
import {Router, NavigationEnd, RouterStateSnapshot, ActivatedRouteSnapshot, ActivatedRoute} from '@angular/router';
declare var $: any;


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHander(event) {
    return false;
  }

  isvalidaccountId:boolean;
  acAccntID:number;
  returnUrl:string;

  title = 'OYESPACE. You Live It. We Manage It';
  accountID:number;

  constructor(private globalService: GlobalServiceService,
    private dashboardservice: DashBoardService,
    private router: Router,
    private avroute: ActivatedRoute) {

    this.acAccntID = this.globalService.acAccntID;
    //alert('in home component');
    //alert('this.globalService.acAccntID'+this.globalService.acAccntID);

    if (this.acAccntID == undefined) {
      //alert('acAccntID undefined');
      //alert('in app acAccntID-' + this.acAccntID);
      //this.isvalidaccountId = false;
      //this.router.navigate(['/login']);
      //alert('isvalidaccountId-' + this.isvalidaccountId);
    }

    //alert('inside home component');
    //alert('displaying accountID..' + this.accountID);
    //alert('displaying mrroleid-'+this.dashboardservice.mrmRoleID);

  }

  ngOnInit() {
    // this.router.routeReuseStrategy.shouldReuseRoute = function () {
    //   return false;
    // };

    // this.router.events.subscribe((evt) => {
    //   if (evt instanceof NavigationEnd) {
    //     this.router.navigated = false;
    //     window.scrollTo(0, 0);
    //   }
    // });

    this.getMembers();
  }

  ngAfterViewInit() {

    $(document).ready(function () {

      $(document).on('click', ".dropdown-btn", function () {
        $(".dropdown-container").slideToggle();
      });

      $(document).on('click', '#sidebarCollapse', function () {
        $('#sidebar, #content').toggleClass('active');
      });

    });

  }

  gotoLoginPage() {
    this.router.navigate(['login']);
  }

  gotoViewassociation(){
    this.router.navigate(['home/association']);
  }

  getMembers() {
    //alert('inside getmembers');
    this.dashboardservice.getMembers(this.accountID).subscribe(res => {
      this.dashboardservice.mrmRoleID = res['data'].memberListByAccount[0]['mrmRoleID'];

    },
      res => {
        console.error();
      });
  }

  enableMyMenus(event) {
    //alert(event);
    this.router.navigate(['dashboard']);
  }

}
