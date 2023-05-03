


import { Injectable } from '@angular/core';
import {io,Socket} from 'socket.io-client';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Buffer } from 'buffer';
const  BaseUrl = `http://localhost:3000`;

@Injectable({
  providedIn:'root'
})
export class ChatServiceService {
  public socket!:Socket 
  constructor(private http : HttpClient,private router:Router) { }

  connect() {
    console.log('Connecting chat socket');
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
  }
  

  joinRoom(data:any) {
    console.log(data);
    this.socket.emit('join', data);
  }

  sendMessage(data:any) {
   
    this.socket.emit('message', data);
  }

  newMessageReceived() {
    const observable = new Observable<{ user: String,userName:String,message: {msg:any,contentType:String,date:Date}}>(observer => {
      this.socket.on('new message', (data) => {
        
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  typing(data:any) {
    this.socket.emit('typing', data);
  }

  receivedTyping() {
    const observable = new Observable<{ isTyping: boolean}>(observer => {
      this.socket.on('typing', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }
  disconnect(){
    console.log('disconnecting the chat socket')
    this.socket.disconnect();
  }
 
videoRoom(reciever:any){
 
   this.http.get(`${BaseUrl}/room`).subscribe((res:any)=>{

    this.router.navigate(['/video-room',res.data,reciever])
  })
}
videoRoomJoin(data:any,userId:any,reciever:any) {
 this.socket.emit('join-video',data,userId,reciever)
}

videoUserConnected(){
  const observable = new Observable<any>(observer => {
    this.socket.on('user-video-connected', (userId) => {
      observer.next(userId);
    });
    return () => {
      this.socket.disconnect();
    };
  });
  return observable;
}

UserDisConnected(){
  const observable = new Observable<any>(observer => {
    this.socket.on('user-disconnected', (userId) => {
      observer.next(userId);
    });
    return () => {
      this.socket.disconnect();
    };
  });
  return observable;
}

sendAudio(room:any,user:any,userName:any,audioBlob:any){
  // const reader = new FileReader();
  // reader.readAsArrayBuffer(audioBlob);
  // reader.onloadend = () => {
  //   if (reader.result !== null) {
  //     const arrayBuffer = reader.result as ArrayBuffer;
  //     const uint8Array = new Uint8Array(arrayBuffer);
  //    const buff = Buffer.from(uint8Array)
     const data = {room,user,userName,message:audioBlob}
     this.socket.emit('audio', data);
    // } else {
    //   console.error('Failed to read audio data');
    // }
  // };
}

}

