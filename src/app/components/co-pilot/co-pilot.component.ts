import { Component } from '@angular/core';
import { CoPilotService } from './service/co-pilot.service';

@Component({
  selector: 'app-co-pilot',
  templateUrl: './co-pilot.component.html',
  styleUrls: ['./co-pilot.component.css']
})
export class CoPilotComponent {
  messageText!:String
  res=[]
  sendMessage(){
   
    
this.service.pilot(this.messageText).subscribe((data:any)=>{
  console.log(data,'data here message');
  
this.res = data
setTimeout(()=>{
  console.log('spee spee kin');
  
  const message = new SpeechSynthesisUtterance('hello world');
  //@ts-ignore
message.voice = speechSynthesis.getVoices().find(voice => voice.lang === 'en-GB');
message.rate = 1.5;
window.speechSynthesis.speak(message);

},2000)
})
  }
//   speak(){
//     const message = new SpeechSynthesisUtterance(this.res[0]);
//     //@ts-ignore
// message.voice = speechSynthesis.getVoices().find(voice => voice.lang === 'en-GB');
// message.rate = 1.5;
// window.speechSynthesis.speak(message);

//   }
  constructor(private service:CoPilotService){}
}
