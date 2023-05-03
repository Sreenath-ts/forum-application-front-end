import { Component, OnInit,HostListener, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import * as fromApp from '../app-store/app-store.reducer'
import * as fromAction from '../auth-component/store/auth.actions'
import * as fromQuestion from '../question/store/question.action'
import { Subscription } from 'rxjs';
import { SimilarQuestion } from '../question/question.model';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  host:{
    style:'flex:1;'
  }
})
export class HomeComponent implements OnInit,OnDestroy{
  otpValidated!:boolean | undefined
  storeSub!:Subscription
  qSub!:Subscription
  data: SimilarQuestion[] = [];
  offset = 0;
  limit = 5;
  isLoading=false
  constructor(private store:Store<fromApp.AppState>,private route:Router){}
  ngOnDestroy(): void {
   if(this.storeSub) this.storeSub.unsubscribe()
  }
  ngOnInit(): void {
  this.storeSub =  this.store.select('auth').subscribe((authData)=>{
       this.otpValidated = authData.user?.otpValid
    })
     
    this.qSub = this.store.select('simQ').subscribe((resData)=>{
      this.data = resData.questions
    })

     this.store.dispatch(new fromQuestion.GetAllQuestionStart({offset:this.offset}))
  }
  otpIniated(){
    this.store.dispatch(new fromAction.OtpStart())
  }
  askQ(){
    this.route.navigate(['/askQuestion'])
  }

  @ViewChild('myDivElement') myDivElement!: ElementRef;
  @HostListener('window:scroll', ['$event'])
  onScroll(event:Event) {
    console.log('scroller event')
    if ( window.scrollY  >= document.body.offsetHeight) {
      console.log('scroller')
       this.fetchMoreData();
    }
  }
  fetchMoreData() {
    console.log('unni amme pnem vilichu');
    
    this.offset += this.limit;
    this.store.dispatch(new fromQuestion.GetAllQuestionStart({offset:this.offset}))
  }
  qDet(id:String){
    console.log(id,'id......~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`')
    this.route.navigate([`/question-detial`,id])
  }
}
