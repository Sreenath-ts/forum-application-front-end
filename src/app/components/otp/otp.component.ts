import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromApp from '../app-store/app-store.reducer'
import * as authActions from '../auth-component/store/auth.actions'
@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {
   isLoading:boolean=false
    code!:string
     
       // exTime.setMinutes(exTime.getMinutes() + 1.5);
   authSubmit(data:NgForm){
 if(this.seconds>=0){
  const values = data.value
  this.code = values.f + values.s + values.t + values.fr
const code =  this.code

  this.store.dispatch(new authActions.OtpVerify({code}))
 }


   }
   resend(){
    this.store.dispatch(new authActions.OtpStart())
     clearInterval(this.setTimout)
     this.timer()
    // this.seconds =  90000
    const code =  this.code
    if(code){
      this.store.dispatch(new authActions.OtpVerify({code}))
     
     
    }
    
   }
     
   constructor(private store:Store<fromApp.AppState>){}

   setTimout:any;
   seconds = 90000;
   min!:number
   sec!:number
   timer(){
        this.seconds = 90000
       this.setTimout = setInterval(()=>{
        this.seconds -=1000;
        // to remove
        if(this.seconds>0){
          this.min = Math.floor((this.seconds/1000/60) << 0);
          this.sec = Math.floor((this.seconds/1000) % 60);
        }
        
      else{
        clearInterval(this.setTimout)
      }

        
        //remove
       },1000)

   }

  ngOnInit(): void {
   this.timer()
  }
 
}
