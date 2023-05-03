import { Injectable } from '@angular/core';
import {Store} from '@ngrx/store'
import * as fromApp from '../app-store/app-store.reducer'
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { last, map, skip, take } from 'rxjs/operators';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router,
    private store:Store<fromApp.AppState> ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.store.select('auth').pipe(
      take(1),
      map((res) => {
        
        console.log(res, 'guard subject');

        const Auth = !!res.user;
        if (Auth && res.user?.access) {
          return true;
        } else {
          

          return this.router.createUrlTree(['/auth']);
        }
      })
    );
  }
}
