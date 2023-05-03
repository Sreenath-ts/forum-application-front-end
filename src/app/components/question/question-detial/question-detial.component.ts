import { Component, OnDestroy, OnInit,ViewChild, ElementRef,  AfterViewInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { SimilarQuestion } from '../question.model';
import * as fromApp from '../../app-store/app-store.reducer'
import * as fromQuestion from '../store/question.action'
import * as fromAnswer from '../question-answer/store/q-answer.action'
import { Subscription } from 'rxjs';
import Quill from 'quill';
import { SocketServiceService } from '../socket-service.service';
import * as hljs from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';
import xml from 'highlight.js/lib/languages/xml';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

hljs.default.registerLanguage('javascript', javascript);
hljs.default.registerLanguage('xml', xml);
@Component({
  selector: 'app-question-detial',
  templateUrl: './question-detial.component.html',
  styleUrls: ['./question-detial.component.css'],
  host:{style:'flex:1;'}
})
export class QuestionDetialComponent implements OnInit,OnDestroy,AfterViewInit {
  editor!:any
  @ViewChild('editor1') editorRef!: ElementRef;
  constructor(private route: ActivatedRoute,private store:Store<fromApp.AppState>,private router:Router,private socketService:SocketServiceService, private elRef: ElementRef,private http:HttpClient) { }
  ngOnDestroy(): void {
    if(this.qSub){
      this.qSub.unsubscribe()
    }
  }
  qdet!:SimilarQuestion | null;
  qSub!:Subscription;
  paramValue!:string | null;

  showModal = false;
  toggleModal(num:number){
    if(num==1){
      let reason;
      if(this.text){
        reason = this.text
      }else{
        reason = this.Reason
      }
      const qId = this.qdet?._id
      this.store.dispatch(new fromQuestion.ActiveQuestionReportStart({reason,qId}))
    }
    this.showModal = !this.showModal;
  }

  Reason!: string;
  text!:string
  seasons: string[] = ['Rude or vulgar', 'Harassment or hate speech', 'Spam or copyright issue', 'Inappropriate listings message/category','other'];
  
  ngOnInit() {
    this.paramValue = this.route.snapshot.paramMap.get('paramName');
    this.route.params.subscribe(params => {
      this.paramValue = params['id'];
     
    });
   
    this.store.dispatch(new fromQuestion.ActiveQuestionStart(this.paramValue))

  this.qSub =  this.store.select('simQ').subscribe(data=>{
  
    this.qdet = data.activeQuestion

    // var btn1 = document.querySelector('#green');
    //   var btn2 = document.querySelector('#red');
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


  var btn1 = document.querySelector('#green');
  var btn2 = document.querySelector('#red');
  
  btn1?.addEventListener('click', () => {
    
      if (btn2?.classList.contains('red')) {
        btn2.classList.remove('red');
      } 
    btn1?.classList.toggle('green');
    
  });
  
  btn2?.addEventListener('click', function() {
    
      if (btn1?.classList.contains('green')) {
        btn1.classList.remove('green');
      } 
    btn2?.classList.toggle('red');
    
  });
 //here
 
 let click = 0

 const selectBtn = document.querySelector(".select-btn"),
 items = document.querySelectorAll(".item");

selectBtn?.addEventListener("click", () => {
selectBtn.classList.toggle("open");
});

items.forEach(item => {
  if(click==0){
item.addEventListener("click", () => {
   item.classList.toggle("checked");
   click++;
   let checked = document.querySelectorAll(".checked"),
       btnText = document.querySelector(".btn-text");
       
       if(checked && checked.length > 0){
        // let languages = {
        //   'java':1,
        //   'c':2,
        //   'c99':3,
        //   'cpp':4,
        //   'cpp14':5,
        //   'cpp17':6,
        //   'php':7,
        //   'python2':8,
        //   'go':9,
        //   'sql':10,
        //   'dart':11,
        //   'nodejs':12
        // }

        let lan = item.textContent
         this.router.navigate(['/ide',lan])
       if(btnText?.textContent)        btnText.textContent = `${checked.length} Selected`
       }else{
        if(btnText?.textContent)     btnText.textContent = "Select Language"
       }
});
  }
})
  }
  ngAfterViewInit(): void {
    const editorElem = this.editorRef.nativeElement;
   
  this.editor = new Quill(editorElem, {
    modules: {
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],

        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction

        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults
        [{ 'font': [] }],
        [{ 'align': [] }],

        ['clean'],                                         // remove formatting button
        ['link', 'image', 'video']                         // link and image, video
      ],
      history: {
        delay: 0,
        maxStack: 500,
        userOnly: false
      }
  
    },
    theme: 'snow'                                          // or 'bubble'
  });
  
  
  }
  getEditorContent(): string {
    return this.editor.root.innerHTML;
  }
  editorData(_id:String | undefined){
    
    
    
    
     const body = this.getEditorContent()
     console.log(_id,'editorData',body);
     this.store.dispatch(new fromAnswer.AnswerPostStart({body,qId:_id}))
     this.editor.root.innerHTML = ''
  }
  copyCode(val:string){
    console.log('copyy.......................');
    
    navigator.clipboard.writeText(val);
  }
  vote(count:number,qId:String | undefined){
    console.log('vote',count);
    
    this.store.dispatch(new fromQuestion.Reaction_Call_Start({count,qId}))
  }
}
