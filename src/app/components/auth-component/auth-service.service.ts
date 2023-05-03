import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

export class InterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token ;
        if(req.url.includes('/admin')){
            token = localStorage.getItem('admin')
          
        }else{
            token =localStorage.getItem('jwt')
        } 
        if(token){
           
           const newReq = req.clone({headers:req.headers.set('Authorization',JSON.parse(token))})
           return next.handle(newReq)
        }
        return next.handle(req)
    }

}