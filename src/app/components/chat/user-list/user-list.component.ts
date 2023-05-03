import { Component, OnDestroy, OnInit } from '@angular/core';
import { AllUsers } from '../store/all-user.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../../app-store/app-store.reducer'
import * as fromChatAction from '../store/chat.action'
import { Subscription ,Subject} from 'rxjs';
import { Router } from '@angular/router';
import { ChatServiceService } from '../chat-service.service';
 


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit,OnDestroy {

  



allUsers!:AllUsers[];
StoreSub!:Subscription



chatRooms:any[] = []

constructor(private store:Store<fromApp.AppState>,private router:Router,private chat:ChatServiceService){
  this.store.dispatch(new fromChatAction.GetChatRooms())
}
 
  ngOnInit(): void {
   this.store.dispatch(new fromChatAction.GetAllUsers())

  this.StoreSub = this.store.select('chat').subscribe((res)=>{
    this.allUsers = res.AllUsers
    this.chatRooms =  res.chatRooms
  })
    


  }

  chatRomAdd(userId:String){
    console.log(userId,'adding ')
  const chatRoom =  this.allUsers.find(el => el._id == userId)
  console.log(chatRoom,'chatRoom')
     this.store.dispatch(new fromChatAction.AddChatRoom(chatRoom))
  }


  // chatOpen(chatterId:String){
  //   const chat_btn = document.querySelector("#chatter"+chatterId);
  //   const chat_box = document.querySelector("#chat-boxx"+chatterId);
  //   console.log(chat_box,'click on icon');
    
  //   chat_btn?.addEventListener('click',()=>{
  //     chat_btn.classList.toggle("expanded")
  //     setTimeout(() => {
  //       chat_box?.classList.toggle("expanded");
  //     }, 100);
  //   })
   
  // }

  room(reciever:String){
  
    this.chat.videoRoom(reciever)
  }

  ngOnDestroy(): void {
   if(this.StoreSub){
    this.StoreSub.unsubscribe()
   }
  }


}
