import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';

import { DataStoreageService } from 'src/app/shared-service/data-storeage.service';
import { AuthService } from '../auth-component/auth.service';

import {Store} from '@ngrx/store'

import * as fromApp from '../app-store/app-store.reducer'
import { map } from 'rxjs';

import * as AuthACtions from '../auth-component/store/auth.actions'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,AfterViewInit {
  
     constructor(private authService:AuthService,
      private dataStorage:DataStoreageService,
      private store:Store<fromApp.AppState>){}
      body!:any
      savedTheme!:any
      themes!:any
      count!:any
      div1 = document.getElementsByClassName('bodyMiddle_top_text')
      div2 = document.getElementsByClassName('bodyLeftSide_ul_li_names')
      
  ngAfterViewInit(): void {
   this.body = document.body
  
    
    this.savedTheme = localStorage.getItem('theme') || ''
    
    if (this.savedTheme) {
        this.body.className = this.savedTheme
    }
    this.themes = ['light', 'solar', 'dark']
    
    this.count = (this.savedTheme !== undefined || null || '') ? this.themes.indexOf(this.savedTheme) : 0;
    
   
  }


   theme() {
    console.log('theme changeer.................')
    if(this.count == 2){
      
      for (var i = 0; i < this.div1.length; i++) {
        this.div1[i].classList.remove("bodyMiddle_top_text1"); // remove old class
        this.div1[i].classList.add("bodyMiddle_top_text"); // add new class
      }
      for (var i = 0; i < this.div2.length; i++) {
        this.div2[i].classList.remove("bodyLeftSide_ul_li_names1"); // remove old class
        this.div2[i].classList.add("bodyLeftSide_ul_li_names"); // add new class
      }
    }
      this.count++
      let selected = ''
      if (this.count=== 0) {
          selected = this.themes[0]
      }
      if (this.count=== 1) {
          selected = this.themes[1]
      } if (this.count === 2) {
          selected = this.themes[2]
      }
      if (this.count > 2) {
          selected = this.themes[0]
          this.count = 0
      }
      if(selected == 'dark'){
      
        for (var i = 0; i < this.div1.length; i++) {
          this.div1[i].classList.remove("bodyMiddle_top_text"); // remove old class
          this.div1[i].classList.add("bodyMiddle_top_text1"); // add new class
        }
        for (var i = 0; i < this.div2.length; i++) {
          this.div2[i].classList.remove("bodyLeftSide_ul_li_names"); // remove old class
          this.div2[i].classList.add("bodyLeftSide_ul_li_names1"); // add new class
        }
        
      }
      localStorage.setItem('theme', selected)
      this.body.className = selected
  }

     authenticated = false
  ngOnInit(): void {
    this.store.select('auth').pipe(map(data => data.user)).subscribe(Res=>{
      this.authenticated = !!Res
    })
  }
  logout(){
   // this.authService.logout()
   this.store.dispatch(new AuthACtions.Logout())
  }

  

}
