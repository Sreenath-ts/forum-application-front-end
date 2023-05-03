import { Component, OnInit } from '@angular/core';
import { DataStoreageService } from 'src/app/shared-service/data-storeage.service';
import { AuthService } from '../auth-component/auth.service';
import { User } from '../auth-component/user.model';
import {Store} from '@ngrx/store'
import * as fromState from '../app-store/app-store.reducer'
import { map } from 'rxjs';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  isLoading = false
  userData!:User | null;
    constructor(private authService:AuthService,private dataStoreage:DataStoreageService,private store:Store<fromState.AppState>){}
  ngOnInit(): void {
    this.isLoading=true
      this.store.select('auth').pipe(map(data => data.user)).subscribe(resData=>{
       
        this.userData = resData
        this.isLoading=false
      })
  }
 
  profile(event:any,id:string ){
    if(event.target.files.length>0){
      const profile=event.target.files[0]
      console.log(profile,'pro');
      
      const form = new FormData()
       form.append('profile',profile)
       console.log(form,'form img');
       
       this.dataStoreage.profileEdit(form,id).subscribe((res)=>{
        console.log('data comed');
        this.profileUpdate()
       })
    }else{
      console.log('upload a photo');
      
    }
    
  }

  profileUpdate(){
    this.store.select('auth').pipe(map(data => data.user)).subscribe(resData=>{
       
      this.userData = resData
    
    })
  }

}
