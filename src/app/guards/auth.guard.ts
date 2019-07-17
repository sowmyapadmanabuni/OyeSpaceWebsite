import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivate } from '@angular/router';
import {GlobalServiceService} from '../global-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  accountID:number;

  constructor(
      private router: Router,private globalService:GlobalServiceService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    this.accountID = this.globalService.acAccntID;
    //alert('in authGaurd,accountID-'+this.accountID);
    if (this.accountID != undefined) {
      //alert('accountID != undefined'+this.accountID);
      return true;
    }

      //alert('...state.url...'+state.url);
      // not logged in so redirect to login page with the return url
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
      return false;
  }
}