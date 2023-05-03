import { HttpClient } from '@angular/common/http'
import {Actions,ofType,createEffect} from '@ngrx/effects'
import {Injectable} from '@angular/core'
import { Store } from '@ngrx/store';
import * as fromApp from '../../../app-store/app-store.reducer'
import * as fromAnswer from './q-answer.action'
import { switchMap,map } from 'rxjs';
import { SocketServiceService } from '../../socket-service.service';
const  BaseUrl = `http://localhost:3000`;

@Injectable()

export class AnswerEffects {
   private qId!:string
  answerPost = createEffect(()=>{
    return this.action$.pipe(ofType(fromAnswer.ANSWER_POST_START),
    switchMap((actionData:any)=>{
      console.log(actionData,'add post answer.................................................');
        this.qId =actionData.payload.qId
        // this.socketService.subscribeToQuestion(this.qId)
        return this.http.post(`${BaseUrl}/active-question/answer`,{
          body:actionData.payload.body,
          qId:actionData.payload.qId
        }).pipe(map((resData:any)=>{
          console.log(resData,'result of single answer add.....................');
         
            return new fromAnswer.AnswerAdd(resData)
        }))
    }))
  })
  
  commentPost = createEffect(()=>{
    return this.action$.pipe(ofType(fromAnswer.ADD_COMMENT_START),
    switchMap((actionData:any)=>{
      return this.http.post(`${BaseUrl}/commentAdd`,actionData.payload).pipe(map((resData:any)=>{
        return new fromAnswer.AddComment(resData)
      }))
    })
    )
  })

  addAnswerVote = createEffect(()=>{
    return this.action$.pipe(ofType(fromAnswer.ADD_ANSWER_VOTE),
      switchMap((actionData:any)=>{
        const count = actionData.payload.count
        const ansId = actionData.payload.ansId
        const qId  = actionData.payload.qId
        return this.http.patch(`${BaseUrl}/answerVote`,{count,ansId,qId}).pipe(map((res:any)=>{
          console.log(res,'answer vote..................');
          
          const liked = res.liked 
          const disliked = res.disliked
          const ansId = actionData.payload.ansId
          const userReaction = res.status
          console.log(ansId,'answe id in effects');
          
          return new fromAnswer.ChangeAnswerVote({liked,disliked,ansId,userReaction})
        }))
      })
    )
  })
    constructor(private action$:Actions,private store:Store<fromApp.AppState>,private http:HttpClient,private socketService:SocketServiceService){}
}