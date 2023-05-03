import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { BehaviorSubject, Subject, throwError, take } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
import { AdminModel } from '../admin/admin-login/admin.model';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import {Store} from '@ngrx/store'
import * as fromApp  from '../app-store/app-store.reducer';
import * as AuthActions from './store/auth.actions'
export interface AuthResponseData {
  name: string;
  email: string;
  password: undefined;
  role: string;
  token: string;
  expires: string;
  _id: string;
  data: any;
  photo?: string;
  access?: Boolean;
  refreshToken?: string;
  validated?:boolean
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  BaseUrl = `http://localhost:3000`;
  AdminBaseUrl = `http://localhost:3000/admin`;

 // user = new BehaviorSubject<any>(null);

  admin = new BehaviorSubject<any>(null);

  public ExpiringLogout: any;

  private AdminExpiringLogout: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService2: SocialAuthService,
    private store : Store<fromApp.AppState>
  ) {}

  // signup(name: string, email: string, password: string, googleToken?: string) {
  //   return this.http
  //     .post<AuthResponseData>(`${this.BaseUrl}/signup`, {
  //       name,
  //       email,
  //       password,
  //       googleToken,
  //     })
  //     .pipe(
  //       catchError((error) => {
  //         let errorMessage = `An Unknown error occurred`;
  //         if (!error.error || !error.error.err) {
  //           return throwError(errorMessage);
  //         }
  //         errorMessage = error.error.err;
  //         return throwError(errorMessage);
  //       }),
  //       tap((resData) => {
  //         console.log(resData.data);
  //         const expiresIn = new Date(resData.expires);
  //         console.log(expiresIn, resData.data.access, 'ivide');

  //         const newUser = new User(
  //           resData.data.user.email,
  //           resData.data.user.name,
  //           resData.data.user._id,
  //           resData.token,
  //           expiresIn,
  //           resData.data.user.photo,
  //           resData.data.user.role,
  //           resData.data.user.access,
  //           resData.refreshToken
  //         );
  //         this.store.dispatch(new AuthActions.AuthenticateSuccess({
  //           email:newUser.email,
  //           name:newUser.name,
  //           id:newUser.id,
  //           _token: resData.token,
  //           _tokenExpirationDate:expiresIn,
  //           photo:newUser.photo,
  //           role:newUser.role,
  //           access:newUser.access,
  //           refreshToken:newUser.refreshToken
  //         }))
  //        // this.user.next(newUser);
  //         this.loadToken(newUser);
  //         const now = new Date().getTime();
  //         const delay = expiresIn.getTime() - now;
  //         this.autoLogout(delay);
  //       })
  //     );
  // }

  // login(email: string, password: string, googleToken?: string) {
  //   return this.http
  //     .post<AuthResponseData>(`${this.BaseUrl}/login`, {
  //       email,
  //       password,
  //       googleToken,
  //     })
  //     .pipe(
  //       catchError((error) => {
  //         console.log(error, 'er');
  //         let errorMessage = `An Unknown error occurred`;
  //         if (!error.error || !error.error.err) {
  //           return throwError(errorMessage);
  //         }
  //         errorMessage = error.error.err;
  //         return throwError(errorMessage);
  //       }),
  //       tap((resData) => {
  //         // const expiresIn = new Date(new Date(resData.expires).getTime());
  //         console.log(
  //           resData.refreshToken,
  //           'hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii'
  //         );
  //         const expiresIn = new Date(resData.expires);

  //         console.log(expiresIn, 'ivide');
  //         const newUser = new User(
  //           resData.data.email,
  //           resData.data.name,
  //           resData.data._id,
  //           resData.token,
  //           expiresIn,
  //           resData.data.photo,
  //           resData.data.role,
  //           resData.data.access,
  //           resData.refreshToken
  //         );
  //         this.store.dispatch(new AuthActions.AuthenticateSuccess({
  //           email:newUser.email,
  //           name:newUser.name,
  //           id:newUser.id,
  //           _token: resData.token,
  //           _tokenExpirationDate:expiresIn,
  //           photo:newUser.photo,
  //           role:newUser.role,
  //           access:newUser.access,
  //           refreshToken:newUser.refreshToken
  //         }))
  //       //  this.user.next(newUser);
  //         console.log(resData.role, 'role in login');

  //         this.loadToken(newUser);
  //         const now = new Date().getTime();
  //         const delay = expiresIn.getTime() - now;
  //         this.autoLogout(delay);
  //       })
  //     );
  // }

  adminLogin(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(`${this.AdminBaseUrl}/login`, {
        email,
        password,
      })
      .pipe(
        catchError((error) => {
          let errorMessage = `An Unknown error occurred`;
          if (!error.error || !error.error.err) {
            return throwError(errorMessage);
          }
          errorMessage = error.error.err;
          return throwError(errorMessage);
        }),
        tap((resData) => {
          const expiresIn = new Date(resData.expires);
          console.log(
            resData,
            'photooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo'
          );

          // console.log(expiresIn, 'ivide');
          const newAdmin = new AdminModel(
            resData.data.email,
            resData.data.name,
            resData.data._id,
            resData.token,
            expiresIn,
            resData.data.photo,
            resData.data.role
          );
          console.log(newAdmin, 'login ayapooo ulla admin next');

          this.admin.next(newAdmin);
          // console.log(resData.role,'role in login');

          this.AdminloadToken(newAdmin);
          //   this.autoLogout(expiresIn.getTime())
          const now = new Date().getTime();
          const delay = expiresIn.getTime() - now;
          this.AdminautoLogout(delay);
        })
      );
  }

  loadToken(newUser: User) {
    console.log(
      newUser,
      'localstorage ullil...................................................................'
    );

    let token = newUser.token;
    token = `Bearer ${token}`;

    let refreshToken = newUser.refreshToken;
    refreshToken = `Bearer ${refreshToken}`;
    console.log(token, 'token...............................................');

    localStorage.setItem('jwt', JSON.stringify(token));
    localStorage.setItem('Rejwt', JSON.stringify(refreshToken));
    localStorage.setItem('userData', JSON.stringify(newUser));
  }

  AdminloadToken(newAdmin: AdminModel) {
    let token = newAdmin.token;
    token = `Bearer ${token}`;
    console.log(token, 'token...............................................');

    localStorage.setItem('admin', JSON.stringify(token));
    localStorage.setItem('adminData', JSON.stringify(newAdmin));
  }

  //   authChecking() {
  //     return this.http.get(`${this.BaseUrl}/allUsers`);
  //   }

  // async logout() {
  //   console.log('logging out');

  //  this.store.dispatch(new AuthActions.Logout())
  //  this.user.next(null);

  //   await this.authService2.signOut();
  //   localStorage.removeItem('jwt');
  //   localStorage.removeItem('Rejwt');
  //   localStorage.removeItem('userData');
  //  this.router.navigate(['/auth']);

  //   if (this.ExpiringLogout) {
  //     clearTimeout(this.ExpiringLogout);
  //   }
  //   this.ExpiringLogout = null;
  // }

  adminLogout() {
    this.admin.next(null);

    localStorage.removeItem('admin');
    localStorage.removeItem('adminData');
    this.router.navigate(['/admin/login']);

    if (this.AdminExpiringLogout) {
      clearTimeout(this.AdminExpiringLogout);
    }
    this.AdminExpiringLogout = null;
  }

  autoLogin() {
    let userData: {
      email: string;
      name: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
      photo: string;
      role: string;
      access: Boolean;
      otpValid: boolean
    };

    userData = JSON.parse(localStorage.getItem('userData') || '');
    let refreshToken = JSON.parse(localStorage.getItem('Rejwt') || '');
    if (!userData) {
      return;
    }

    let loadNewUser = new User(
      userData.email,
      userData.name,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate),
      userData.photo,
      userData.role,
      userData.access,
      refreshToken,
      userData.otpValid
    );
    console.log(loadNewUser,'auto login new user')
    if (loadNewUser.token) {
      this.store.dispatch(new AuthActions.AuthenticateSuccess({
        email:loadNewUser.email,
        name:loadNewUser.name,
        id:loadNewUser.id,
        _token:loadNewUser.token,
        _tokenExpirationDate: new Date(userData._tokenExpirationDate),
        photo:loadNewUser.photo,
        role:loadNewUser.role,
        access:loadNewUser.access,
        refreshToken:loadNewUser.refreshToken,
        otpValid:loadNewUser.otpValid
      }))
     // this.user.next(loadNewUser);
      let exTime = new Date(userData._tokenExpirationDate).getTime();
      let currTime = new Date().getTime();
      const expiringTimeOut = exTime - currTime;
      console.log(expiringTimeOut, 'autologintime');
      this.autoLogout(expiringTimeOut);
    }
  }

  AdminautoLogin() {
    let adminData: {
      email: string;
      name: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
      photo: string;
      role: string;
    };

    adminData = JSON.parse(localStorage.getItem('adminData') || '');
    console.log(
      adminData,
      'adminData auto Login.................................................'
    );
    if (!adminData) {
      return;
    }

    let loadNewAdmin = new AdminModel(
      adminData.email,
      adminData.name,
      adminData.id,
      adminData._token,
      new Date(adminData._tokenExpirationDate),
      adminData.photo,
      adminData.role
    );

    if (loadNewAdmin.token) {
      this.admin.next(loadNewAdmin);
      let exTime = new Date(adminData._tokenExpirationDate).getTime();
      let currTime = new Date().getTime();
      const expiringTimeOut = exTime - currTime;
      console.log(expiringTimeOut, 'autologintime');
      this.AdminautoLogout(expiringTimeOut);
    }
  }

  autoLogout(expiresTime: number) {
    console.log(expiresTime, 'timer running..................................');

    this.ExpiringLogout = setTimeout(() => {
      let token = localStorage.getItem('Rejwt') || '';
      console.log('set timeout called.........................')
      localStorage.setItem('jwt', token);

      this.http.get(`${this.BaseUrl}/refresh-token`).subscribe((data: any) => {
        console.log(data.token, 'new token refreshed');

        localStorage.setItem('jwt', JSON.stringify(`Bearer ${data.token}`));
      });
    }, expiresTime);
  }

  AdminautoLogout(expiresTime: number) {
    console.log(expiresTime, 'timer running');

    this.AdminExpiringLogout = setTimeout(() => {
      console.log(
        'timout logout admin ///////////////////////////////////////////////////////////////////////////////////////////////////////'
      );

      this.adminLogout();
    }, expiresTime);
  }

  adminAllusers() {
    return this.http.get<any>(`${this.AdminBaseUrl}/allUsers`);
  }
  blockUser(id: string, access: Boolean | undefined) {
    let accesses;
    access == true ? (accesses = 1) : (accesses = 0);
    console.log(accesses, 'accessssssssssssssssssssssssss', access);
    return this.http
      .get<AuthResponseData>(
        `${this.AdminBaseUrl}/blockUser?id=${id}&access=${accesses}`
      )
      .pipe(
        tap((res) => {
          this.store.select('auth').pipe(take(1),map(data => data.user)).subscribe((resData) => {
            const token = resData?.token || '';
            const expiresIn = resData?._tokenExpirationDate || new Date();

            console.log(res.data.upUser.access, 'newww data after block');

            const newUser = new User(
              res.data.upUser.email,
              res.data.upUser.name,
              res.data.upUser._id,
              token,
              expiresIn,
              res.data.upUser.photo,
              res.data.upUser.role,
              res.data.upUser.access
            );
            this.store.dispatch(new AuthActions.AuthenticateSuccess({
              email:newUser.email,
              name:newUser.name,
              id:newUser.id,
              _token: token,
              _tokenExpirationDate:expiresIn,
              photo:newUser.photo,
              role:newUser.role,
              access:newUser.access,
              refreshToken:newUser.refreshToken
            }))
           // this.user.next(newUser);
            this.loadToken(newUser);
          });
        })
      );
  }

  editUser(data: any) {
    return this.http.post<AuthResponseData>(
      `${this.AdminBaseUrl}/editUser`,
      data
    );
  }
}
