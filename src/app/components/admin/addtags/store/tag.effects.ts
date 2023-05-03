import { HttpClient,HttpHeaders} from '@angular/common/http'
import {Actions,ofType,createEffect} from '@ngrx/effects'
import {Injectable} from '@angular/core'
import { Store } from '@ngrx/store';
import { switchMap,map } from 'rxjs';
import  * as tagActions from './tag.action'
import * as fromApp from '../../admin-store/admin-store.reducer'
const  BaseUrl = `http://localhost:3000/admin`;
@Injectable()

export class TagEffect {
    tagAdd = createEffect(()=>{
        return this.action$.pipe(ofType(tagActions.ADD_TAG_START),
        switchMap((action:any)=>{
            for (const value of action.payload.values()) {
                console.log(value,'valuessss');
              }
            const headers = new HttpHeaders();
            headers.append('Content-Type', 'multipart/form-data');
            const options = { headers: headers };
             return this.http.post(`${BaseUrl}/add-tag`,action.payload,options).pipe(map((res)=>{
                console.log(res,'addd taggssssssssss')})
             )
        })
        )
    },{dispatch:false})
    constructor(private action$:Actions,private store:Store<fromApp.AppState>,private http:HttpClient){}
}