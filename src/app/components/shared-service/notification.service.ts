import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
const  BaseUrl = `http://localhost:3000`;
@Injectable({
  providedIn: 'root'
})
export class videoFetchService {
  videoFetch(){
    return this.http.get(`${BaseUrl}/video-fetch`)
  }
  constructor(private http:HttpClient) { }
}
