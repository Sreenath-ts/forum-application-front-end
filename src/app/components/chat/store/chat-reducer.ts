import { AllUsers } from "./all-user.model";
import * as fromChatAction from './chat.action'

export interface State {
AllUsers:AllUsers[];
messageArray: Array<{user: String,userName:String, message: {msg:any,contentType:String,date:Date}}> ;
chatRooms:Array<{name:String,email:String,_id:String}> | AllUsers[]
}

export const initialState:State ={
AllUsers:[],
messageArray:[],
chatRooms:[]
}

export function ChatReducer (state = initialState,action:any){
    switch (action.type) {
      case fromChatAction.GET_ALL_USERS_SUCCESS :
          return{
            ...state,
            AllUsers:action.payload
          }
          case fromChatAction.GET_CHAT_MESSAGE_SUCCESS:
           
            
            return {
              ...state,
              messageArray:action.payload
            }
            case fromChatAction.NEW_MESSAGE_SUCCESS:
              console.log(action.payload,'action payload');
              
              const newArray = [...state.messageArray,action.payload]
              return {
                ...state,
                messageArray:newArray
              }
              case fromChatAction.GET_CHAT_ROOMS_SUCCESS:
                return {
                  ...state,
                  chatRooms:action.payload
                }
                case fromChatAction.ADD_A_CHAT_ROOM:
                  return{
                    ...state,
                    chatRooms:[...state.chatRooms,action.payload]
                  }
      default:
         return{...state}
      
    }
}