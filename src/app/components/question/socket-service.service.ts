import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { Answer } from './question-answer/store/answer.model';
import { Comment } from './question-answer/store/comment.model';
@Injectable({
  providedIn: 'root'
})
export class SocketServiceService {
  private socket!: Socket;
  constructor() { }
  connect(): void {
    this.socket = io('http://localhost:3000');
  }
  subscribeToQuestion(qId: any): void {
   
    
    this.socket.emit('subcribeToQuestion', qId);
   
  }
  get answer():Observable<Answer>{
    return new Observable<Answer>((observer)=>{
      this.socket.on("answer",(answer:any)=>{
      
        
        observer.next(answer)
      })
    })
  }
  get comment():Observable<Comment>{
    return new Observable<Comment>((observer)=>{
      this.socket.on("comment",(comment:any)=>{
        observer.next(comment)
      })
    })
  }
}
