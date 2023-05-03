import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthResponseData } from '../../auth-component/auth.service';
import { AuthService } from '../../auth-component/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  
  
  
  constructor(private authService:AuthService,private router : Router){
  }
  
    isLoginMode = true
    isLoading = false
    error :null | string = null

    authSubmit(form:NgForm){
      let authObs :Observable<AuthResponseData>
      this.isLoading = true
      if(!form.valid){
        return
      }
     
        this.isLoading = true
        const email = form.value.email
        const password = form.value.password
      authObs =  this.authService.adminLogin(email,password)
      
      authObs.subscribe((resData)=>{
        console.log(resData,'admin login page');
        this.isLoading = false
        this.router.navigate(['/admin'])
      },error=>{
        this.error=error
        setTimeout(()=>this.error='',3000)
        this.isLoading = false
      })
      form.reset()
    }
  


}

  