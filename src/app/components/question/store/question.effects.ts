import {Actions,ofType,createEffect} from '@ngrx/effects'
import {Injectable} from '@angular/core'
import { Observable, of } from 'rxjs'
import { Store } from '@ngrx/store'
import { catchError, exhaustMap, map, switchMap,tap, withLatestFrom } from 'rxjs/operators'
import * as fromApp from '../../app-store/app-store.reducer'
import * as fromSimilarQuestions from './question.action'
import * as fromAnswer from '../question-answer/store/q-answer.action'
import { HttpClient } from '@angular/common/http'
import { BaseUrl } from '../../auth-component/store/auth.effects'
@Injectable()

export class SimqEffects{
    fetchSimq = createEffect(()=>{
      return this.action$.pipe(ofType(fromSimilarQuestions.QUESTION_FETCH_START),
      switchMap((actionData:any)=>{
        console.log(actionData,'action smQ')
         return this.http.post(`${BaseUrl}/similar-question`,{
            title:actionData.payload.title
         }).pipe(map((resData:any)=>{
            console.log(resData.data.length,'res')
            if(resData.data.length>0){
                console.log('if')
                return new fromSimilarQuestions.QuestFetchSuccess(resData.data)
            }else{
                console.log('else..............................................................................')
              return new fromSimilarQuestions.QuestionError({error:'No similar Question'})  
            }
         }))
      }))
    })

    singleQPost = createEffect(()=>{
        return this.action$.pipe(ofType(fromSimilarQuestions.SINGLE_QUESTION_POST),
        switchMap((actionData:any)=>{
           
               
          
            
            return this.http.post(`${BaseUrl}/question`,{
                titleHtml:actionData.payload.ContentHtml,
                title:actionData.payload.Content,
                body:actionData.payload.ContentBody
            }).pipe(map((resData:any)=>{
                console.log(resData,'rslt ethi')
                if(resData.err){
                    return new fromSimilarQuestions.QuestionError({error:resData.err})
                }
                return new fromSimilarQuestions.Single_Question_Post_Sucess()
            }))
        }))
    })
     stop=false
    allQuestions = createEffect(()=>{
        return this.action$.pipe(ofType(fromSimilarQuestions.GET_ALL_QUESTION_START),
        exhaustMap((actionData:any)=>{
           if(!this.stop){
            return  this.http.get(`${BaseUrl}/Home?offset=${actionData.payload.offset}`)
           }else{
            return of({data:[]})
           }
        })).pipe(map((resData:any)=>{
          if(resData && resData.data.length>0){
           resData.data.forEach((el:any)=>{
                
                 el.user = el.user.email
            })
            console.log(resData.data,'chnge data')
            return resData.data;
          }else{
            return []
          }
        }),map((resData:any)=>{
            console.log(resData,'resallllllllll')
          this.stop =  resData.length==1 || resData.length ==  0 ? true : false
          console.log(this.stop,'stop or what')
            if(resData.length>0){
                console.log('if')
                return new fromSimilarQuestions.QuestFetchSuccess(resData)
            }else{
                console.log('else ******************************************************************')
              return new fromSimilarQuestions.QuestionError({error:null})  
            }
         }))
    })

    activeQuestion = createEffect(()=>{
        return this.action$.pipe(ofType(fromSimilarQuestions.ACTIVE_QUESTION_START),
        switchMap((actionData:any)=>{
          return this.http.get(`${BaseUrl}/active-question/${actionData.payload}`).pipe(map((resData:any)=>{
            if(resData.answer.length>0){
              console.log(resData.answer,'answeeeeeeeeeeeeeeeeeeeeeeeeeeeeeer.//////////')
              resData.answer.forEach((el:any)=>{
                 el.user = el.user.email
              })
            }
            
              return resData
          }),map((resData:any)=>{
            console.log(resData.comments,'active q');
            
           
                
                this.store.dispatch(new fromAnswer.AnswerPostSuccess(resData.answer))
            
                this.store.dispatch(new fromAnswer.CommentSuccess(resData.comments))
                  
            return new fromSimilarQuestions.ActiveQuestionSuccess(resData.data)
          }))
        })
        )
    })

    ReactionChangeCall = createEffect(()=>{
      return this.action$.pipe(ofType(fromSimilarQuestions.REACTION_CALL_START),
      switchMap((actionData:any)=>{
       return  this.http.patch(`http://localhost:3000/vote`,actionData.payload).pipe(map((res:any)=>{
        const like = res.liked
        const dislike = res.disliked
       return  new fromSimilarQuestions.ActiveQuestionReactionChanging({like,dislike})
       }))
      }))
    })

    ReportQuestionCall = createEffect(()=>{
      return this.action$.pipe(ofType(fromSimilarQuestions.ACTIVE_QUESTION_REPORT_START),
     switchMap((actionData:any)=>{
      const reason = actionData.payload.reason
      const qId = actionData.payload.qId
      return this.http.patch(`${BaseUrl}/report-question`,{reason,qId})
     }) )
    },{dispatch:false})

    constructor(private action$:Actions,private store:Store<fromApp.AppState>,private http:HttpClient){}
}