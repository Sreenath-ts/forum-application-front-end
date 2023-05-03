import { Component, OnInit, Input, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ChatServiceService } from './chat-service.service';
import { AllUsers } from './store/all-user.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../app-store/app-store.reducer'
import * as fromChat from './store/chat.action'
import { Subscription,map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import moment from 'moment'

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit,OnDestroy {

  @Input() chatter!:AllUsers

 

  messageArray: Array<{user: String,userName:String, message: {msg:any,contentType:String,date:Date}}> = [];
    
  public isEmojiPickerVisible!: boolean;

   private storeSub!:Subscription
   private chatSub!:Subscription
   
   private userDetials!:AllUsers | undefined;

  public isTyping = false;

  private useremail!:any;

  private chatroom!:String;
  public message!: String;

  currentUser : String | undefined;
  currentUserId : String | undefined 
  currentName : String | undefined 
   count = 0
  constructor(private chat:ChatServiceService,private store:Store<fromApp.AppState>,private router: ActivatedRoute){


console.log('constricuor worjing fiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiie');
this.chat.connect()  

    this.chat.newMessageReceived().subscribe(data => {
       

       if(data.message.contentType == 'audio'){
       
        const blob = this.b64toBlob(data.message.msg,'audio/mpeg')
      
       if(blob){ var url = URL.createObjectURL(blob);
        data.message.msg = url
       }
       }
          
      

      this.store.dispatch(new fromChat.NewMessageSuccess(data))
      
      
      
      this.isTyping = false;
    });
    this.chat.receivedTyping().subscribe(bool => {
      this.isTyping = bool.isTyping;
    });
   
   
    //  this.count ++;
  }
 

 
   
  

ngOnInit(): void {
  let ids = this.router.snapshot.paramMap.get('id')
  this.storeSub = this.store.select('chat').subscribe(data=>{
    this.userDetials =  data.AllUsers.find(el => el._id == ids)
    if(this.userDetials) this.chatter = this.userDetials
     })
  
  
  
   
   this.useremail = this.chatter.email
  
  
  this.storeSub = this.store.select('auth').subscribe(user=>{
    this.currentUser = user.user?.email
    this.currentUserId = user.user?.id
    this.currentName = user.user?.name
  })
  if(this.currentUser)
  if (this.currentUser < this.useremail) {
  this.chatroom = this.currentUser.concat(this.useremail);
  } else {
  this.chatroom = this.useremail.concat(this.currentUser);
  }
  console.log(this.chatroom,'joining new room in classsssssssssssssssssssssssssssssssssssssss')
  this.chat.joinRoom({user: this.currentUser, room: this.chatroom});
  
  this.store.dispatch(new fromChat.GetChatMessage(this.chatroom))
  
  this.chatSub =   this.store.select('chat').pipe( map(messages => {
    return messages.messageArray.map(el => {
      if (el.message.contentType === 'audio') {
        
        const blob = this.b64toBlob(el.message.msg,'audio/mpeg')
        const url = URL.createObjectURL(blob);
        return {
          user: el.user,
          message: {
            msg: url,
            contentType: el.message.contentType
          }
        };
      } else {
        return el;
      }
    });
  })
    ).subscribe((messages:any)=>{
  
  
    this.messageArray = messages
  })

//  ivd
  let id :any ;
   this.router.params.subscribe(params => {
   
    id = params['id'];
    this.storeSub = this.store.select('chat').subscribe(data=>{
      this.userDetials =  data.AllUsers.find(el => el._id == id)
      if(this.userDetials) this.chatter = this.userDetials
      console.log(this.chatter,'chatter888888')
       })

    
      this.count++
      // if(this.count>1){
      //   console.log('diconnecting')
      //   this.chat.disconnect()
      // }
    
        //  this.chat.connect()
          
      
       
       this.useremail = this.chatter.email
      
    
     this.storeSub = this.store.select('auth').subscribe(user=>{
        this.currentUser = user.user?.email
        this.currentUserId = user.user?.id
     })
     if(this.currentUser)
     if (this.currentUser < this.useremail) {
      this.chatroom = this.currentUser.concat(this.useremail);
    } else {
      this.chatroom = this.useremail.concat(this.currentUser);
    }

   
    console.log(this.chatroom,'joining new room in class')

    this.chat.joinRoom({user: this.currentUser, room: this.chatroom});
    
    this.store.dispatch(new fromChat.GetChatMessage(this.chatroom))
    
    this.chatSub =   this.store.select('chat').subscribe(messages=>{
    
      console.log(messages,'messages messavges messages')
        this.messageArray = messages.messageArray
      })
            
  });
  
  


}

sendAudio(){
  var device = navigator.mediaDevices.getUserMedia({audio:true})
  var items:any = []
  var blob
  device.then(stream=>{
    var recorder = new MediaRecorder(stream)
    recorder.ondataavailable = async(e) =>{
      items.push(e.data)
      if(recorder.state == 'inactive'){
         blob = new Blob(items,{type:'audio/webm'})
         //chnage
         const base64String = await this.blobToBase64(blob);
         this.chat.sendAudio(this.chatroom,this.currentUserId,this.currentName,base64String)
        //  this.chat.sendAudio(this.chatroom,this.currentUserId,blob)
      }
    }
    recorder.start(100)
    setTimeout(()=>{
      recorder.stop()
    },5000)
  })
  
} 


blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result as string);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}


b64toBlob(b64Data: string, contentType: string): any{
  try{
  console.log(b64Data,'b54datatatatatatat000000000atatataattaatat')
  contentType = contentType || '';
  const sliceSize = 512;
  const byteCharacters = atob(b64Data);
  const byteArrays = [];
  for (
    let offset = 0;
    offset < byteCharacters.length;
    offset += sliceSize
  ) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);
    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }
  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
}catch(e){
console.log(e)
}
  
}




sendMessage() {
  
  this.chat.sendMessage({room: this.chatroom, user: this.currentUserId,userName: this.currentName, message: this.message});
  this.message = '';
}

typing() {
  this.chat.typing({room: this.chatroom, user: this.currentUser});
}

public addEmoji(event:any) {
  if(this.message){
   
    this.message = `${this.message}${event.emoji.native}`;

  }else{
    this.message = event.emoji.native
  }
  this.isEmojiPickerVisible = false;
}


ngOnDestroy(): void {
  console.log('destroyinggggg')
  if(this.storeSub){
   this.storeSub.unsubscribe()
  }
  if(this.chatSub){
    this.chatSub.unsubscribe()
  }
   this.chat.disconnect()
 }
  
 formatDate(date:Date){
  return moment(date).fromNow()
 }

}
