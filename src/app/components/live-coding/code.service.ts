import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CodeService {

  BaseUrl = `http://localhost:3000`;
 httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
   
  })
};
 //   code editor

        // var request = require('request');

        // var program = {
        //     script : "console.log('hello wordld')",
        //     language: "nodejs",
        //     versionIndex: "0",
        //     clientId: "9ef4e00c6c906c65b8446b3fc667d69b",
        //     clientSecret:"48bc7344882415d03605c5b05e22f7370c6abf08680086cfa2b25949dc501dea"
        // };
        // request({
        //     url: 'https://api.jdoodle.com/v1/execute',
        //     headers: {
        //         'Content-Type': 'application/json'
        //       },
        //     method: "POST",
        //     json: program
        // },
        // function (error, response, body) {
        //     console.log('error:', error);
        //     console.log('statusCode:', response && response.statusCode);
        //     console.log('body:', body);
        // })
       
        // code editor end
        codeSService(language:any,script:any){
           
     return   this.Http.post(`${this.BaseUrl}/run-code`,{language,script})
        }
  constructor(private Http:HttpClient) { }
}
