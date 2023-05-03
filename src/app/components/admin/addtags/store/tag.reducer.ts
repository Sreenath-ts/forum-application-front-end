export interface tag {
   _id:String,title:String,description:String,image:any
}

export interface State{
tag:tag | null
}

export const initialState : State = {
tag:null
}

export function ChatReducer (state = initialState,action:any){
  return state
}