import { Action } from "@ngrx/store"

export const ANSWER_POST_START = '[ANSWER] ANSWER_POST_START'

export const ANSWER_POST_SUCCESS = '[ANSWER] ANSWER_POST_SUCCESS'

export const ANSWER_POST_FAIL = '[ANSWER] ANSWER_POST_FAIL'

export const ADD_ANSWER = '[ANSWER] ANSWER ADD '

export const COMMENT_SUCCESS = '[COMMENT] ALL COMMENTS'

export const ADD_COMMENT = '[COMMENT] ADD COMMENTS'

export const ADD_COMMENT_START = '[COMMENT] ADD COMMENT START'

export const ADD_ANSWER_VOTE = '[ANSWER]ADD_ANSWER_VOTE'

export const CHANGE_ANSWER_VOTE = '[ANSWER] CHANGE_ANSWER_VOTE'

export class AnswerPostStart implements Action{
    readonly type = ANSWER_POST_START
    constructor(public payload:{body:string,qId:String | undefined}){}
}

export class AnswerPostSuccess implements Action{
    readonly type = ANSWER_POST_SUCCESS
    constructor(public payload:Array<{body:string,user:string,date:Date,_id:string,answer:string,reactions:number,userReaction:String}>){}
}

export class AnswerAdd implements Action{
    readonly type = ADD_ANSWER
    constructor(public payload:{body:string,user:string,date:Date,_id:string,answer:string,reactions:number,userReaction?:String}){}
}

export class AnswerPostFail implements Action{
    readonly type = ANSWER_POST_FAIL
    constructor(public payload:string){}
}

export class CommentSuccess implements Action{
    readonly type = COMMENT_SUCCESS
    constructor(public payload:Array<{body:string,date:Date,user:string,_id:string}>){}
}

export class AddComment implements Action{
    readonly type = ADD_COMMENT
    constructor(public payload:{body:string,date:Date,user:string,_id:string}){}
}

export class AddCommentStart implements Action{
    readonly type = ADD_COMMENT_START
    constructor(public payload:{body:string,ansId:string}){}
}

export class AddAnswerVote implements Action{
    readonly type = ADD_ANSWER_VOTE
    constructor(public payload:{count:number,ansId:string,qId:string}){}
}

export class ChangeAnswerVote implements Action{
    readonly type = CHANGE_ANSWER_VOTE
    constructor(public payload:{liked:number,disliked:number,ansId:string,userReaction:string}){}
}

