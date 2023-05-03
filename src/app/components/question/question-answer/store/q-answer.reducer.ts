import * as fromAnswerAction from './q-answer.action'
import { Answer } from "./answer.model";
import { Comment } from './comment.model';
export interface State{
    answers:Answer[] | [],
    fetchingStart:boolean,
    error:string | null,
    comments:Comment[] | []
}

 const initialState :State ={
   answers:[],
   fetchingStart:false,
   error:null,
   comments:[]
}

export function AnswerReducer (state = initialState,action:any){
  switch (action.type){
    case fromAnswerAction.ANSWER_POST_START:
       return {
        ...state,
   fetchingStart:true,
   error:null
       } 
       case fromAnswerAction.ANSWER_POST_FAIL:
        return {
            ...state,
            answer:[],
            fetchingStart:false,
            error:action.payload
        }
        case fromAnswerAction.ANSWER_POST_SUCCESS:
         
          
            return {
                ...state,
                answers:action.payload,
                error:null,
                fetchingStart:false
            }
            case fromAnswerAction.ADD_ANSWER:
             
              const ans = [...state.answers,action.payload]
             
              
              return {
                ...state,
                answers:ans,
                error:null,
                fetchingStart:false
            }
            case fromAnswerAction.COMMENT_SUCCESS:
              return {
                ...state,
                comments:action.payload,
                error:null,
                fetchingStart:false
              }
              case fromAnswerAction.ADD_COMMENT:
                const newcomments = [...state.comments,action.payload]
                return {
                  ...state,
                  comments:newcomments,
                  error:null,
                fetchingStart:false
                }
                case fromAnswerAction.CHANGE_ANSWER_VOTE:
                const newAnswer = {...state}
                  const upAns = newAnswer.answers
                 
                
               console.log(action.payload.userReaction,'userReaction')
               
                return{
                  ...state,
                  answers:upAns.map(el=> {const reactions = el._id == action.payload.ansId ? el.reactions + action.payload.liked + action.payload.disliked : el.reactions 
                    const userReaction = el._id == action.payload.ansId ? action.payload.userReaction : el.userReaction 
                     return { ...el ,reactions,userReaction}})
                }
       default :
       return {
        ...state
       }
  }
}