import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import {CodeService} from './code.service'
//@ts-ignore
import {InitEditor,downloadCodeFromEditor} from './codeeditor.js'
import {  Router,NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-live-coding',
  templateUrl: './live-coding.component.html',
  styleUrls: ['./live-coding.component.css'],
  host:{style:'flex-1;width:100%;heigth:100%;margin-left:10%;'}
})



export class LiveCodingComponent implements AfterViewInit,OnInit {

  clanguage!:String
 editor!:any

 result !:any

  constructor(private router:Router,private codeServ:CodeService){}
    
  @HostListener('window:updateUrl', ['$event'])
  handleCustomEvent(event: CustomEvent): void {
    // get the new query parameters from the event detail
   
    const newQueryParams = event.detail.queryParams.id
    console.log('live-coding event',event.detail.queryParams.id)
    // update the URL and navigate to the new URL
    const queryParams = {id:newQueryParams}
    this.router.navigate(['/live-coding'], { queryParams});
  }
   

  ngOnInit(): void {
  let  count = 0
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        
      if(count > 0 && event.url.startsWith('/live-coding')){
        document.getElementById('code-editor')!.innerHTML=''
        console.log('inner if')
      this.editor =  InitEditor("code-editor")
      }  

      count++

        console.log('Route changed:', event.url);
      }
    });
  }

  ngAfterViewInit(): void {
   this.editor =  InitEditor("code-editor")

    // window.addEventListener('updateUrl', (event:any) => {
     
    //   // get the new query parameters from the event detail
    //   const newQueryParams = event.detail.id;
    //   console.log('live-coding event',newQueryParams)
    //   // update the URL and navigate to the new URL
    //   const queryParams = {id:newQueryParams}
    //   this.router.navigate(['/live-coding'], { queryParams});
    // });
  }

  downloadCode(){
    downloadCodeFromEditor('code.txt')
  }

  language(e:any){
 this.clanguage = e.target.value
  }

  run(){
  this.codeServ.codeSService(this.clanguage,this.editor.getValue()).subscribe((res:any)=>{
    console.log(res.data,'response')
    this.result = res.data
  },error=>{
    console.log(error,'error response')
  })
  }
}

