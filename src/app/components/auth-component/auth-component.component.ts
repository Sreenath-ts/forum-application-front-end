import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Store } from '@ngrx/store';
import * as fromApp from '../app-store/app-store.reducer';
import * as AuthACtions from './store/auth.actions';
@Component({
  selector: 'app-auth-component',
  templateUrl: './auth-component.component.html',
  styleUrls: ['./auth-component.component.css'],
})
export class AuthComponentComponent implements OnInit, OnDestroy {
  user: any;
  loggedIn: any;
  otpStart:boolean = false 
  otpValid:boolean = false
  showErrors = false;

  private storeSub!: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private authService2: SocialAuthService,
    private store: Store<fromApp.AppState>
  ) {}

   valid(b:boolean){
    console.log(b,'valid aaaaa');
    
    this.showErrors=b
   }

  ngOnInit() {
    this.authService2.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = user != null;
      if (this.loggedIn) {
        //  this.isLoading = true
        console.log(this.user, 'google user sign', this.loggedIn);
        // let authObs :Observable<AuthResponseData>
        if (!this.isLoginMode) {
          

          console.log('google user signup');
          const email = user.email;
          const name = user.name;
          const googleToken = user.idToken;
          const password = 'google';
          this.store.dispatch(
            new AuthACtions.SignupStart({
              name,
              email,
              password,
              googleToken: user.idToken,
            })
          );
          // authObs =  this.authService.signup(name,email,password,googleToken)
        } else {
          const email = user.email;
          const password = 'google';
          this.store.dispatch(
            new AuthACtions.LoginStart({
              email,
              password,
              googleToken: user.idToken,
            })
          );
          //authObs = this.authService.login(email,password,user.idToken)
        }

        // authObs.subscribe((resData)=>{
        //   console.log(resData);
        //   this.isLoading = false
        //   this.router.navigate(['/'])
        // },error=>{
        //   this.error=error
        //   setTimeout(()=>this.error='',3000)
        //   this.isLoading = false
        // })
      }
    });
    this.storeSub = this.store.select('auth').subscribe((authState) => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
     
      setTimeout(() => (this.error = ''), 3000);
    });
  }

  isLoginMode = true;
  isLoading = false;
  error: null | string = null;
  onSwitch() {
    this.isLoginMode = !this.isLoginMode;
  }
  authSubmit(form: NgForm) {
  
    // let authObs :Observable<AuthResponseData>
    // this.isLoading = true
    if (!form.valid) {
      return;
    }
    if (!this.isLoginMode) {
      
     
   
      const email = form.value.email;
      const name = form.value.name;
      const password = form.value.password;
      // authObs =  this.authService.signup(name,email,password)
      this.store.dispatch(
        new AuthACtions.SignupStart({ name, email, password })
      );
      
    } else {
      this.isLoading = true;
      const email = form.value.email;
      const password = form.value.password;
      // authObs =  this.authService.login(email,password)
      this.store.dispatch(new AuthACtions.LoginStart({ email, password }));
    }

    // authObs.subscribe((resData)=>{
    //   console.log(resData);
    //   this.isLoading = false
    //   this.router.navigate(['/'])
    // },error=>{
    //   this.error=error
    //   setTimeout(()=>this.error='',3000)
    //   this.isLoading = false
    // })
    form.reset();
  }

  ngOnDestroy(): void {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
}
