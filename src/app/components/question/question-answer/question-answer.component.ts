import { Component,HostListener,Input, OnInit,OnDestroy, ElementRef} from '@angular/core';
import { Subscription } from 'rxjs';
import { SocketServiceService } from '../socket-service.service';
import { Answer } from './store/answer.model';
import * as fromApp from '../../app-store/app-store.reducer'
import * as fromAnswer from '../question-answer/store/q-answer.action'
import { Store } from '@ngrx/store';
import { NgForm } from '@angular/forms';
import { Comment } from './store/comment.model';
import * as hljs from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';
import xml from 'highlight.js/lib/languages/xml';

hljs.default.registerLanguage('javascript', javascript);
hljs.default.registerLanguage('xml', xml);
@Component({
  selector: 'app-question-answer',
  templateUrl: './question-answer.component.html',
  styleUrls: ['./question-answer.component.css']
})
export class QuestionAnswerComponent implements OnInit,OnDestroy{
@Input() qId!:any
sub!:Subscription
i:any
answerReplay(i:any){
  this.i = i
  var replyForm
  replyForm = document.getElementById(`comment-${i}-reply-form`);
  replyForm?.classList.toggle("d-none");
}

ngOnInit(): void {
  this.socketService.connect()
this.sub = this.store.select('answers').subscribe((resData)=>{
  this.answers = resData.answers
  this.comments = resData.comments

  // if(this.qdet?.userReaction=='liked'){
  //   if (btn2?.classList.contains('red')) {
  //     btn2.classList.remove('red');
  //   } 
  // btn1?.classList.toggle('green');
  // }else if(this.qdet?.userReaction=='disliked'){
  //   if (btn1?.classList.contains('green')) {
  //     btn1.classList.remove('green');
  //   } 
  // btn2?.classList.toggle('red');
  // }

 


  setTimeout(()=>{
    const codeBlock = this.elRef.nativeElement.querySelectorAll('pre');
  
  
 codeBlock.forEach((el:any)=>{
 
  
 hljs.default.highlightElement(el)
 },5000)
  })
})

this.socketService.answer.subscribe((answer)=>{
  
  
  this.answers = [...this.answers,answer]
  setTimeout(()=>{
    const codeBlock = this.elRef.nativeElement.querySelectorAll('pre');
  
  
 codeBlock.forEach((el:any)=>{
 
  
 hljs.default.highlightElement(el)
 },5000)
  })
})

this.socketService.comment.subscribe((comment)=>{
  this.comments = [...this.comments,comment]
})

}
answers!:Answer[]
comments!:Comment[]

cSub(cForm:NgForm,ansId:string){
  var replyForm
  replyForm = document.getElementById(`comment-${this.i}-reply-form`);
  replyForm?.classList.toggle("d-none");
const body = cForm.value.body
this.store.dispatch(new fromAnswer.AddCommentStart({body,ansId}))
}
constructor(private socketService: SocketServiceService,private store:Store<fromApp.AppState>,private elRef:ElementRef){}
ngOnDestroy(): void {
  if(this.sub) this.sub.unsubscribe()
}
copyCode(val:string){
  navigator.clipboard.writeText(val);
}
// {count,ansId,qId}
vote(count:number,ansId:string){
 

  
  const qId = this.qId
this.store.dispatch(new fromAnswer.AddAnswerVote({count,ansId,qId}))
}
}
