export class User {
    constructor(public email:string,public name:string,
        public id:string,private _token:string,
        public _tokenExpirationDate:Date,public photo?:string,
        public role ?: string ,
        public access?:Boolean,
        public  refreshToken?:string,
        public otpValid?:boolean
        ){
            
            
        }

        get token(){
            if(!this._tokenExpirationDate){
            // if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate){
                console.log("token  time xipired");
                
                return null
            }
            console.log('valid token');
            
            return this._token
        }
}