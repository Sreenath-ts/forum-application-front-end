import { Component,ViewChild, ElementRef, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import Quill from 'quill';
import { Subscription } from 'rxjs';
import * as fromApp from '../app-store/app-store.reducer'
import * as fromSimilarQuestions from './store/question.action'


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements AfterViewInit ,OnDestroy,OnInit{
  options:any=[]
  SimQSub!:Subscription
  err!:any
  @ViewChild('editor') editorRef!: ElementRef;
  @ViewChild('textBox') textBox !:ElementRef<HTMLDivElement>
  Content!:string
  ContentHtml!:any
 // @ViewChild('contentDisplay') contentDisplay!: ElementRef<HTMLDivElement>;
  editor!:any
  access=true
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
    // const editorElem = this.editorRef.nativeElement;
    // const editor = new Quill(editorElem);
    return this.editor.root.innerHTML;
  }

  editorData(){
    console.log('called .....................................')
   // this.contentDisplay.nativeElement.innerHTML = content
    this.store.dispatch(new fromSimilarQuestions.QuestionFetchStart({title:this.Content}))
  }

undo(){
  this.editor.history.undo() 
}
 redo(){
  this.editor.history.redo()
 }   
 
 

 next(){
  this.access = false
    

this.ContentHtml = document.createTextNode(this.textBox.nativeElement.innerHTML);
    
 this.Content = this.textBox.nativeElement.innerText

}
constructor(private store:Store<fromApp.AppState>){}
  ngOnInit(): void {
  this.SimQSub =  this.store.select('simQ').subscribe((res)=>{
    
      this.options = res.questions
     
      this.err = res.error
       console.log(res.fetchingSuccess,'fecth success')
      if(res.postFetchSuccess){
        this.editor.root.innerHTML = ''
        this.textBox.nativeElement.innerHTML=''
      }
    })
  }
  Qpost(){
 
   
    const ContentBody = this.getEditorContent();
    const myString: string = this.ContentHtml.textContent;
    this.store.dispatch(new fromSimilarQuestions.Single_Question_Post({Content:this.Content,ContentHtml:myString,ContentBody:ContentBody}))
  }
  ngOnDestroy(): void {
   if(this.SimQSub){
    console.log('destoroyed');
    
    this.SimQSub.unsubscribe()
   }
  }
}