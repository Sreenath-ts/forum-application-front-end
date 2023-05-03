 import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from './components/auth-component/auth.service';
import * as fromApp from './components/app-store/app-store.reducer'
import { Subscription } from 'rxjs';
import { NotifiService } from './shared-service/notification/notifi.service';
import { ChatServiceService } from './components/chat/chat-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,OnDestroy{
  constructor(private authService:AuthService,private store:Store<fromApp.AppState>,private sharedService:NotifiService,private chatService:ChatServiceService,private route:Router){}
  sub!:Subscription

  ngOnDestroy(): void {
    if(this.storeSub){
      this.storeSub.unsubscribe()
    }
  //  this.sharedService.disconnect()
   if(this.sub){
    this.sub.unsubscribe()
   }
  }

  storeSub!:Subscription
  loader!:boolean
  pageInitiate=0
  ngOnInit(): void {
    this.authService.autoLogin()
    this.storeSub = this.store.select('auth').subscribe((authData)=>{
      
     this.loader = authData.loading
    //  if(this.pageInitiate>0){
    //   this.sharedService.disconnect()
    //  }
    console.log(authData.user,'app component #### akatha')
     if(authData.user?.id){
        console.log('connection established',)
      this.sharedService.connect(authData.user.id)
      this.pageInitiate++;
     }
    })
  // this.sub = this.sharedService.inComingCall().subscribe(res=>{
  //   console.log(res,'notification comedddddddddddooooddddddddddddddddddddddddddddddddddd')
  //  })
  this.sharedService.Notobservable.subscribe(res=>{
   
    if(res){
      console.log(res,'res 9999999999999000000000000')
      Notification.requestPermission().then(perm=>{
        if(perm === 'granted' ){
          let roomParams:any =  res.roomId
          let user:any = res.reciever
          
       const notification =   new Notification("Incoming Video call",{
            body:"You have a video call",
            icon:'assets/icons/help-question-svgrepo-com.svg',
            tag:'video call',
            vibrate: [200, 100, 200]
          })
          notification.addEventListener('click',()=>{
              
            this.route.navigate(['/video-room',roomParams,user])
          })
        }
      })
    }
  })
  }
  title = 'front-end';
}
