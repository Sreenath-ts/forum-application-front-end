import { SimilarQuestion } from "../question.model";
import * as fromSimilarQuestions from './question.action'
// export function authReducer(state=initialState,action:any){
    // export interface State{
    //     user:User | null,                                                                                                                                                                                     
    //     authError : string | null,
    //     loading : boolean,
    //     otpValid : boolean | undefined,
    //     otpError : string | null
    //     }
        
    //     const initialState:State = {
    //         user:null,
    //         authError:null,
    //         loading:false,
    //         otpValid:false,
    //         otpError:null
    //     }
    export interface State{
      questions:SimilarQuestion[] | []
      fetchingSuccess:boolean
      error:String | null
      singleQuestionPost:boolean
      postFetchSuccess:boolean
      activeQuestion:SimilarQuestion | null
    }

    const initialState:State = {
        questions:[],
        fetchingSuccess:false,
        error:null,
        singleQuestionPost:false,
        postFetchSuccess:false,
        activeQuestion : null,
    }

    export function SimilarQuestionReducer(state=initialState,action:any){
         switch (action.type){
            case fromSimilarQuestions.QUESTION_FETCH_START:
                return{
                    ...state,
                    fetchingSuccess:false,
                    error:null,
                    postFetchSuccess:false
                }
                case fromSimilarQuestions.QUESTION_FETCH_SUCCESS:
                   
                    return {
                        ...state,
                        questions:state.questions.length < 1 ? action.payload : [...state.questions,...action.payload],
                        fetchingSuccess:true,
                        error:null,
                        postFetchSuccess:false
                    }
                    case fromSimilarQuestions.QUESTION_ERROR:
                        return{
                            ...state,
                            fetchingSuccess:false,
                            error:action.payload.error,
                            postFetchSuccess:false
                        }
                       case fromSimilarQuestions.SINGLE_QUESTION_POST_SUCCESS:
                        return {
                            ...state,
                            fetchingSuccess:false,
                            error:null,
                            postFetchSuccess:true
                        } 
                        case fromSimilarQuestions.ACTIVE_QUESTION_START:
                            return {
                                ...state,
                                fetchingSuccess:false
                            }
                            case fromSimilarQuestions.ACTIVE_QUESTION_SUCCESS:
                                return{
                                    ...state,
                                    fetchingSuccess:true,
                                    activeQuestion:action.payload
                                }
                                case fromSimilarQuestions.ACTIVE_QUESTION_REACTION_CHANGING:
                                    const reactions = state.activeQuestion?.reactions + action.payload.like + action.payload.dislike
                                    return {
                                        ...state,
                                        fetchingSuccess:true,
                                        activeQuestion:{...state.activeQuestion,reactions}
                                    }
            default :
            return {
                ...state
            }
         }
    }