
import { Action } from "@ngrx/store";
import * as AuthActions  from "./auth.actions";
import { User } from "../user.model";



export interface State{
user:User | null,                                                                                                                                                                                     
authError : string | null,
loading : boolean,
otpValid : boolean | undefined,
otpError : string | null
}

const initialState:State = {
    user:null,
    authError:null,
    loading:false,
    otpValid:false,
    otpError:null
}

export function authReducer(state=initialState,action:any){
    switch (action.type){
        case AuthActions.AUTHENTICATE_SUCCESS:
            const newUser = new User(
                action.payload.email,
                action.payload.name,
                action.payload.id,
                action.payload._token,
                action.payload._tokenExpirationDate,
                action.payload.photo,
                action.payload.role,
                action.payload.access,
                action.payload.refreshToken,
                action.payload.otpValid
              );
              return {
                ...state,
                authError:null,
                user:newUser,
                otpValid:newUser.otpValid,
                loading:false
              }
            case AuthActions.LOGOUT:
                return {
                    ...state,
                    user:null
                }
                case AuthActions.LOGIN_START:
                    case AuthActions.SIGNUP_START:
                    return {
                        ...state,
                        authError:null,
                        loading:true
                    }
                    case AuthActions.AUTHENTICATE_FAIL:
                        return {
                            ...state,
                            user:null,
                            authError: action.payload,
                            loading:false
                        }
                        case AuthActions.OTP_START:
                            return {
                                ...state,
                                otpValid : false,
                                loading:true
                            }
                            case AuthActions.OTP_SUCCESS:{
                             const tryAgain :any= {...state.user}
                             console.log(tryAgain,'tryagain')
                             const newUser = new User(
                                tryAgain.email,
                                tryAgain.name,
                               tryAgain.id,
                               tryAgain._token,
                               tryAgain._tokenExpirationDate,
                               tryAgain.photo,
                               tryAgain.role,
                               tryAgain.access,
                               tryAgain.refreshToken,
                               true
                              );
                                return {
                                    ...state,
                                    user:newUser  ,
                                    otpValid:true,
                                    loading:false
                                }
                            }
                            case AuthActions.OTP_VERIFY:
                                return{
                                    ...state,
                                    loading:true
                                }
                            case AuthActions.OTP_PAGE:
                                return{
                                    ...state,
                                    loading:false
                                }
                default:
                    return state
    }
}