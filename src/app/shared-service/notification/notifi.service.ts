import { Injectable } from '@angular/core';
import {io,Socket} from 'socket.io-client';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
const  BaseUrl = `http://localhost:3000`;
@Injectable({
  providedIn: 'root'
})
export class NotifiService {

  public socket!:Socket 
  public bitch = 'Fucck uuuu'
  constructor(private http : HttpClient,private router:Router){}
  connect(userId:any) {
   
    this.socket = io('http://localhost:3000', {
      reconnection: true,         // enable reconnection
      reconnectionAttempts: 5,   // try to reconnect 5 times
      reconnectionDelay: 1000,   // wait 1 second before each attempt
    });
  
    // listen for reconnection attempts
    this.socket.on('reconnect_attempt', () => {
      console.log('Attempting to reconnect to server...');
    });
  
    // listen for reconnection success
    this.socket.on('reconnect', (attemptNumber: number) => {
      console.log(`Reconnected to server after ${attemptNumber} attempts.`);
    });
  
    // listen for reconnection errors
    this.socket.on('reconnect_error', (error: any) => {
      console.error('Failed to reconnect to server:', error);
    });
    this.socket.emit('user-initial-connection',userId)
  }

  // inComingCall(){
  //   console.log('incoming$$$$$$')
  //   const observable = new Observable<any>(observer => {
  //     this.socket.on('video-calling', (bool) => {
  //       console.log('value emitted vide incoming')
  //       observer.next(bool);
  //     });
  //     return () => {
  //       this.socket.disconnect();
  //     };
  //   });
  //   return observable;
  // }


    
    Notobservable = new Observable<any>(observer => {
      this.socket.on('video-calling', (bool) => {
        console.log('value emitted vide incoming')
        observer.next(bool);
      });
      return () => {
        this.socket.disconnect();
      };
    });
 

  disconnect(){
    this.socket.disconnect()
  }



}
