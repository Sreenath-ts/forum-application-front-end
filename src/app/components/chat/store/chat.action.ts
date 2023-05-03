import { Action } from "@ngrx/store"
import { AllUsers } from "./all-user.model"

export const GET_ALL_USERS = '[CHAT] Get All Users'
export const GET_ALL_USERS_SUCCESS = '[CHAT] Get All Users Success'
export const GET_CHAT_MESSAGE = '[CHAT] GET CHAT MESSAGE'
export const GET_CHAT_MESSAGE_SUCCESS = '[CHAT] GET CHAT MESSAGE SUCCESS'
export const NEW_MESSAGE_SUCCESS = '[CHAT] NEW MESSAGE SUCCESS'
export const GET_CHAT_ROOMS = '[CHAT] GET CHAT ROOMS'
export const GET_CHAT_ROOMS_SUCCESS = '[CHAT] GET CHAT ROOMS SUCCESS'
export const ADD_A_CHAT_ROOM = '[CHAT] ADD A CHAT ROOM'
export class GetAllUsers  implements Action{
    readonly type: string = GET_ALL_USERS
}

export class GetAllUsersSuccess  implements Action{
    readonly type: string = GET_ALL_USERS_SUCCESS
    constructor(public payload:AllUsers[]){}
}

export class GetChatMessage implements Action{
    readonly type: string = GET_CHAT_MESSAGE
    constructor(public payload:String){}
}

export class GetChatMessageSuccess implements Action{
    readonly type: string = GET_CHAT_MESSAGE_SUCCESS
    constructor(public payload: Array<{user: String,userName: String, message: {msg:any,contentType:String,date:Date}}>){}
}

export class NewMessageSuccess implements Action{
    readonly type: string = NEW_MESSAGE_SUCCESS
    constructor(public payload:{user:String,userName:String,message:{msg:any,contentType:String,date:Date}}){}
}

export class GetChatRooms implements Action{
    readonly type: string = GET_CHAT_ROOMS
    constructor(){}
}

export class GetChatRoomsSuccess implements Action{
    readonly type: string = GET_CHAT_ROOMS_SUCCESS
    constructor(public payload:Array<{name:String,email:String,_id:String}>){}
}

export class AddChatRoom implements Action {
    readonly type: string= ADD_A_CHAT_ROOM
    constructor(public payload:AllUsers | undefined){}
}