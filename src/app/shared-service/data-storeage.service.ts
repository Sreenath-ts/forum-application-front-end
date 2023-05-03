import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Subject, take, tap } from 'rxjs';
import { AuthResponseData, AuthService } from '../components/auth-component/auth.service';
import { User } from '../components/auth-component/user.model';
import {Store} from '@ngrx/store'
import * as fromApp  from '../components/app-store/app-store.reducer';
import * as AuthActions from '../components/auth-component/store/auth.actions'
@Injectable({
  providedIn: 'root'
})
export class DataStoreageService {
  BaseUrl = `http://localhost:3000`;
  constructor(private http:HttpClient,private authService:AuthService, private store : Store<fromApp.AppState>) { }

  profileEdit(profile:any,id:string){
    console.log('image function',profile);
    
    return this.http.put<AuthResponseData>(`${this.BaseUrl}/profileEdit?id=${id}`,
      profile
    ).pipe(tap(data=>{
    

      this.store.select('auth').pipe(take(1),map(data=>  data.user)).subscribe((resData=>{
        console.log(resData,'tjtjtjtjjtjtjtjjtjtjtjtjtjtjtjtjtjtjtjtjtjtjtjtj');
          const token = resData?.token  || ''
        const expiresIn = resData?._tokenExpirationDate || new Date()
        console.log(expiresIn,'expiressss Innnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn')
        const newUser = new User(
          data.data.upUser.email,
          data.data.upUser.name,
          data.data.upUser._id,
          token,
          expiresIn,
          data.data.upUser.photo,
          data.data.upUser.role,
          data.data.upUser.access
        );
        this.store.dispatch(new AuthActions.AuthenticateSuccess({
          email:newUser.email,
          name:newUser.name,
          id:newUser.id,
          _token: token,
          _tokenExpirationDate:expiresIn,
          photo:newUser.photo,
          role:newUser.role,
          access:newUser.access,
          refreshToken:newUser.refreshToken
        }))

       // this.authService.user.next(newUser);
         this.authService.loadToken(newUser);
      }))
             

          
    }))
  }
}
