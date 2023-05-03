import {Action} from '@ngrx/store'

export const QUESTION_FETCH_START = '[SimQ] Question_fetch_start'

export const QUESTION_FETCH_SUCCESS = '[SimQ] Question_fetch_success'

export const QUESTION_ERROR = '[SimQ] Question_Error'

export const SINGLE_QUESTION_POST = '[SimQ] Single_QUestion_post'

export const SINGLE_QUESTION_POST_SUCCESS = '[SimQ] Single_QUestion_post_success'

export const GET_ALL_QUESTION = '[Question] Get all question'

export const GET_ALL_QUESTION_START = '[Question] Get all question start'

export const ACTIVE_QUESTION_START = '[Question] Action Question Start'

export const ACTIVE_QUESTION_SUCCESS = '[Question] Action Question Success'

export const ACTIVE_QUESTION_REACTION_CHANGING = '[Question] AcTIVE QUESTION REACTION CHANGING'

export const REACTION_CALL_START = '[QUESTION] REACTION call START'

export const ACTIVE_QUESTION_REPORT_START = '[QUESTION] ACTIVE QUESTION REPORT START'

export class QuestionFetchStart implements Action{
 readonly type = QUESTION_FETCH_START
 constructor(public payload:{title:string}){}
}

export class QuestFetchSuccess implements Action{
readonly type = QUESTION_FETCH_SUCCESS
constructor(
    public payload:Array<{titleHtml:String,
    body:String,
    userId : String,
_id:string}>
    ){}
}

export class QuestionError implements Action{
    readonly type = QUESTION_ERROR
    constructor(public payload:{error:String | null}){}
}

export class Single_Question_Post implements Action{
    readonly type = SINGLE_QUESTION_POST
    constructor(public payload:{Content:string,ContentHtml:string,ContentBody:string}){}
}

export class Single_Question_Post_Sucess implements Action{
    readonly type = SINGLE_QUESTION_POST_SUCCESS
}

export class GetAllQuestionStart implements Action{
    readonly type: string = GET_ALL_QUESTION_START
    constructor(public payload:{offset:number}){}
}

export class ActiveQuestionStart implements Action{
readonly type = ACTIVE_QUESTION_START
constructor(public payload:string | null){}
}

export class ActiveQuestionSuccess implements Action{
    readonly type = ACTIVE_QUESTION_SUCCESS
    constructor(
        public payload:{titleHtml:String,
        body:String,
        userId : String,
    _id:string,reactions:number,userReaction?:string
}
        ){}

}

export class ActiveQuestionReactionChanging implements Action{
    readonly type = ACTIVE_QUESTION_REACTION_CHANGING
    constructor(public payload:{like:number,dislike:number}){}
}

export class Reaction_Call_Start implements Action{
    readonly type = REACTION_CALL_START
    constructor(public payload:{count:number,qId:String | undefined}){}
}

export class ActiveQuestionReportStart implements Action{
    readonly type = ACTIVE_QUESTION_REPORT_START
    constructor(public payload:{reason:string,qId:String | undefined}){}
}