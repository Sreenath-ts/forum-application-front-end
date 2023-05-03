import { HttpClient } from '@angular/common/http'
import {Actions,ofType,createEffect} from '@ngrx/effects'
import { Observable, of } from 'rxjs'
import {Injectable} from '@angular/core'
import { catchError, map, switchMap,tap, withLatestFrom } from 'rxjs/operators'
import { AuthResponseData, AuthService } from '../auth.service'
import * as AuthActions from './auth.actions'
import * as fromAction from '../../app-store/app-store.reducer'
import { Router } from '@angular/router'
import { User } from '../user.model'
import { SocialAuthService } from '@abacritt/angularx-social-login'
import { Store } from '@ngrx/store'
import { NotifiService } from 'src/app/shared-service/notification/notifi.service'

export const  BaseUrl = `http://localhost:3000`;

const handleAuthentication = (resData:any) => {
    const expiresIn = new Date(resData.expires)
   console.log(resData,'resData')
    const newUser = new User(
        resData.data.email,
        resData.data.name,
        resData.data._id,
        resData.token,
        expiresIn,
        resData.data.photo,
        resData.data.role,
        resData.data.access,
        resData.refreshToken,
        resData.data.validated
      );
     
    console.log(newUser,'newUser in effect')

      let token = newUser.token;
      token = `Bearer ${token}`;
  
      let refreshToken = newUser.refreshToken;
      refreshToken = `Bearer ${refreshToken}`;
      console.log(token, 'token...............................................');
  
      localStorage.setItem('jwt', JSON.stringify(token));
      localStorage.setItem('Rejwt', JSON.stringify(refreshToken));
      localStorage.setItem('userData', JSON.stringify(newUser));
    
      //socket connecting for notification

    return new AuthActions.AuthenticateSuccess({
        email: newUser.email,
        name: newUser.name,
        id: newUser.id,
        _token: resData.token,
        _tokenExpirationDate: expiresIn,
        photo: newUser.photo,
        role: newUser.photo,
        access: newUser.access,
        refreshToken: newUser.refreshToken,
        otpValid: newUser.otpValid,
        redirect:true
    })
}

const handleError = (error:any) => {
    let errorMessage = `An Unknown error occurred`;
    if (!error.error || !error.error.err) {
     
     return of(new AuthActions.AuthenticateFail(errorMessage))
    }
    errorMessage = error.error.err;
    console.log(errorMessage)
             return of(new AuthActions.AuthenticateFail(errorMessage))
}
@Injectable()
export class AuthEffects{
   
authSignup = createEffect(()=>{
    return this.actions$.pipe(ofType(AuthActions.SIGNUP_START),
    switchMap((signupAction:AuthActions.SignupStart)=>{
        return this.http
        .post<AuthResponseData>(`${BaseUrl}/signup`, {
          name:signupAction.payload.name,
          email:signupAction.payload.email,
          password:signupAction.payload.password,
          googleToken:signupAction.payload.googleToken,
        }).pipe(map(resData => {
            const expiresIn = new Date(resData.expires)
            const now = new Date().getTime();
            const delay = expiresIn.getTime() - now;
            this.Service.autoLogout(delay);
            this.noti.connect(resData.data._id)
         return  handleAuthentication(resData)
        }), catchError(error =>{
       
            return handleError(error)
        
        }
        ))
    })
    )
})


   authLogin =createEffect(()=>{
    return this.actions$.pipe(
           ofType(AuthActions.LOGIN_START),
           switchMap((authData: AuthActions.LoginStart) => {
               return this.http
                   .post<AuthResponseData>(`${BaseUrl}/login`, {
                       email: authData.payload.email,
                       password: authData.payload.password,
                       googleToken: authData.payload.googleToken
                   }).pipe(map(resData => {
                    const expiresIn = new Date(resData.expires)
      const now = new Date().getTime();
      const delay = expiresIn.getTime() - now;
      this.Service.autoLogout(delay);
                       this.noti.connect(resData.data._id)
                      return handleAuthentication(resData)
                   }), catchError(error =>{
                       return handleError(error)
                }
                   ))

           })
       )
   }) 
     
   authRedirect = createEffect(()=>{
    return this.actions$.pipe(ofType(AuthActions.AUTHENTICATE_SUCCESS),tap((authData:any)=>{
        if(authData.payload.redirect)
        this.router.navigate(['/'])
    }))
   },{ dispatch: false })

   authLogout = createEffect(()=>{
     return this.actions$.pipe(ofType(AuthActions.LOGOUT),
     tap(async ()=>{
         
        localStorage.removeItem('jwt');
        localStorage.removeItem('Rejwt');
        localStorage.removeItem('userData');

        if (this.Service.ExpiringLogout) {
            clearTimeout(this.Service.ExpiringLogout);
          }
          this.Service.ExpiringLogout = null;
          await this.authService2.signOut()
          this.router.navigate(['/'])
     }))
   },{dispatch:false})

   otpStart = createEffect(()=>{
    return this.actions$.pipe(ofType(AuthActions.OTP_START),
    withLatestFrom(this.store.select('auth')),
    switchMap(([actionData,authData])=>{
        return this.http.get(`${BaseUrl}/verify-email`).pipe(map((resData:any)=>{
            
               
                this.router.navigate(['/otp'])
                return new AuthActions.OtpPage()
            

        }),catchError((error)=>{
            return handleError(error)
        }))
    })
    )
   })

   otpVerify = createEffect(()=>{
    return this.actions$.pipe(ofType(AuthActions.OTP_VERIFY),
    switchMap((actionData:any)=>{
        
       return this.http.post(`${BaseUrl}/otp-check`,{
        code:actionData.payload.code
       }).pipe(map((resData:any)=>{
          console.log(resData,'2nd')
          if(resData.status)  return new AuthActions.OtpSuccess()
          return new AuthActions.AuthenticateFail('Otp validation Failed')
       }))
    })
    )
   })

   otpRedirect = createEffect(()=>{
    return this.actions$.pipe(ofType(AuthActions.OTP_SUCCESS),tap(()=>{
        this.router.navigate(['/'])
    }))
   },{ dispatch: false })

    constructor(private actions$:Actions,private http:HttpClient,private router:Router,   private authService2: SocialAuthService,private Service:AuthService,
        private store:Store<fromAction.AppState>,private noti:NotifiService){}
}