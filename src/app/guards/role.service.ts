import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { TokenService } from '../servicios/token.service';


@Injectable({
 providedIn: 'root'
})
export class RoleService {


 realRole: string = "";


 constructor(private tokenService: TokenService, private router: Router) { }


 canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {


   const expectedRole: string[] = next.data["expectedRole"];
   this.realRole = this.tokenService.getRol();


   if (!this.tokenService.isLogged() || !expectedRole.some(r => this.realRole.includes(r))) {
     this.router.navigate([""]);
     return false;
   }


   return true;
 }
 }


export const RoleGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
 return inject(RoleService).canActivate(next, state);
}

