import { Action } from "@ngrx/store"
import { tag } from "./tag.reducer"
export const ADD_TAG_START = '[TAG] ADD TAG START'

export class AddTagStart implements Action {
    readonly type: string = ADD_TAG_START
    constructor(public payload : any){}
}