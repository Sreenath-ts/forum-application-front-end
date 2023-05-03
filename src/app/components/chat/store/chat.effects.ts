import { HttpClient } from '@angular/common/http'
import {Actions,ofType,createEffect} from '@ngrx/effects'
import {Injectable} from '@angular/core'
import { Store } from '@ngrx/store';
import { switchMap,map } from 'rxjs';
import * as fromApp from '../../app-store/app-store.reducer'
import * as fromChat from './chat.action'
const  BaseUrl = `http://localhost:3000`;

@Injectable()

export class chatEffects{
    getAllUsers = createEffect(()=>{
        return this.action$.pipe(ofType(fromChat.GET_ALL_USERS),
        switchMap(()=>{
            return this.http.get(`${BaseUrl}/allUsers`).pipe(map((res:any)=>{
                const allUsers = res.data
                 return new fromChat.GetAllUsersSuccess(allUsers)
            }))
        })
        )
    })
    getAllmessages = createEffect(()=>{
        return this.action$.pipe(ofType(fromChat.GET_CHAT_MESSAGE),
        switchMap((actionData:any)=>{
            return this.http.get(`${BaseUrl}/chatroom/${actionData.payload}`).pipe(map((res:any)=>{
                console.log(res,'messagessssssss,,,,,,,,,,,,,44,44,,4,4,44,4,4,4,4,4,4,4,4,4,4,4,4,4,')
                return new fromChat.GetChatMessageSuccess(res.data)
            }))
        }))
       
    })
    getChatRooms = createEffect(()=>{
       return this.action$.pipe(ofType(fromChat.GET_CHAT_ROOMS),
       switchMap(()=>{
        return this.http.get(`${BaseUrl}/chatrooms`).pipe(map((res:any)=>{
            return new fromChat.GetChatRoomsSuccess(res.data)
        }))
       })) 
    })
    constructor(private action$:Actions,private store:Store<fromApp.AppState>,private http:HttpClient){}
}