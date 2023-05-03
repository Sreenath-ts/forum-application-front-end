import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
const  BaseUrl = `http://localhost:3000`;
@Injectable({
  providedIn: 'root'
})

export class CoPilotService {

  constructor(private http:HttpClient) { }

  pilot(key:any){
    return this.http.post(`${BaseUrl}/co-pilot`,{keywords:key})
  }
}
