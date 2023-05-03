import { Action } from "@ngrx/store"

export const LOGIN_START = '[Auth] Login Start'
export const AUTHENTICATE_SUCCESS = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const AUTHENTICATE_FAIL = '[Auth] Login Fail'
export const SIGNUP_START = '[Auth] Signup Start'
export const AUTO_LOGIN = '[Auth] Auto Login'
export const OTP_START = '[Auth] Otp Start'
export const OTP_VERIFY = '[Auth] Otp Verify'
export const OTP_SUCCESS = '[Auth] Otp Success'
export const OTP_PAGE = '[Auth] Otp Page'

export class AuthenticateSuccess implements Action{
    readonly type = AUTHENTICATE_SUCCESS
    constructor(public payload:{email:string,name:string,
         id:string,_token:string,
      _tokenExpirationDate:Date,photo?:string,
        role ?: string ,
        access?:Boolean,
        refreshToken?:string,
        otpValid?:boolean,
        redirect?:boolean
     } ){ }
     
}

export class Logout implements Action{
    readonly type = LOGOUT 
}

export class LoginStart implements Action{
    readonly type  = LOGIN_START
  
    constructor(public payload:{email: string, password: string, googleToken?: string}){}
}

export class AuthenticateFail implements Action{
    readonly type = AUTHENTICATE_FAIL
    constructor(public payload:string){}
}

export class SignupStart implements Action{
    readonly type = SIGNUP_START
    constructor(public payload:{name:string,email: string, password: string, googleToken?: string}){}
}

export class AutoLogin implements Action{
    readonly type = AUTO_LOGIN
}

export class OtpStart implements Action{
    readonly type = OTP_START
}

export class OtpSuccess implements Action{
    readonly type = OTP_SUCCESS
}

export class OtpVerify implements Action {
    readonly type = OTP_VERIFY
    constructor(public payload:{code:string}){}
}

export class OtpPage implements Action{
    readonly type = OTP_PAGE
}
// export type AuthActions = Login | Logout 


