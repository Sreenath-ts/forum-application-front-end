export class AdminModel {
    constructor(public email:string,public name:string,
        public id:string,private _token:string,
        private _tokenExpirationDate:Date,public photo?:string,
        public role ?: string 
        ){}

        get token(){
            if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate){
                console.log("token  time xipired");
                
                return null
            }
            console.log('valid token');
            
            return this._token
        }
}