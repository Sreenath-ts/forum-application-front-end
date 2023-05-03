export class SimilarQuestion {
    constructor(
        public titleHtml:String,
        public body:String,
        public user: String,
        public _id : String,
        public reactions:number,
        public userReaction?:string
    ){}

}