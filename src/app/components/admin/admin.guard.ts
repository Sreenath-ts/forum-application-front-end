import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router'
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators'; 
import { AuthService } from '../auth-component/auth.service'; 
@Injectable({
    providedIn:'root'
})
export class AdminAuthGuard implements CanActivate {
    constructor (private authService:AuthService,private router : Router){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        // return  this.authService.admin.pipe(take(1),map(res=>{
        //     console.log(res,'guard subject admin.....................');
            
        //       const Auth = !!res
        //         if(Auth){
        //            return true
        //         }else{
        //             console.log('guard false');
                    
        //             return this.router.createUrlTree(['/admin/login'])
        //         }
        //     }))
        if(localStorage.getItem('admin')){
            return true
        }else{
            console.log('guard false');
                    
                    return this.router.createUrlTree(['/admin/login'])
        }
    
    }

}