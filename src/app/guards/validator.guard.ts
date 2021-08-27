import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ValidatorGuard implements CanActivate {
  constructor(private cookieService: CookieService, private router: Router) {
  }
  redirect(flag: any): any{
  if(flag == null){
  this.router.navigate(['/'])
  }

}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const cookie = this.cookieService.check('jwt');
    const token = localStorage.getItem('token')
    this.redirect(token);
    return cookie;
  }

}
