import * as fromAuth from '../auth-component/store/auth.reducer'
import * as fromSimilarQuestions from '../question/store/question.reducer'
import * as fromAnswer from '../question/question-answer/store/q-answer.reducer'
import * as fromChat from '../chat/store/chat-reducer'
import {ActionReducerMap} from '@ngrx/store'
export interface AppState{
    auth:fromAuth.State,
    simQ:fromSimilarQuestions.State,
    answers:fromAnswer.State,
    chat:fromChat.State
}

//:ActionReducerMap<AppState>

export const appReducer :ActionReducerMap<AppState> = {
    auth:fromAuth.authReducer ,
    simQ:fromSimilarQuestions.SimilarQuestionReducer,
    answers:fromAnswer.AnswerReducer,
    chat:fromChat.ChatReducer
}
