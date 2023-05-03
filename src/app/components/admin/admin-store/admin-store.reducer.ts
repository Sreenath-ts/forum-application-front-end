import {ActionReducerMap} from '@ngrx/store'
import * as fromTag from '../addtags/store/tag.reducer'

export interface AppState{
tag:fromTag.State
}

export const appReducer :ActionReducerMap<AppState> = {
tag:fromTag.ChatReducer
}