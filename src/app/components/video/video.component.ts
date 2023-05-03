import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatServiceService } from '../chat/chat-service.service';
import Peer from 'peerjs';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css'],
  host:{style:`width:100%;    display: flex;
  justify-content: center;
}`}
})
export class VideoComponent implements OnInit,OnDestroy {
constructor(private route:ActivatedRoute,private service:ChatServiceService){
  
}
  
id!:any
videoGrid!: HTMLElement | null 
otherVideo!: HTMLElement | null
myVideo!:HTMLVideoElement | null
myPeer!: Peer
mediaStream!: MediaStream;
myVideoTracks: MediaStreamTrack[] = [];
peers:any={}
userId:any
  ngOnInit(): void {
  this.videoGrid = document.getElementById('f1')
  this.otherVideo = document.getElementById('f2')
    this.id = this.route.snapshot.paramMap.get('id')
    const reciever = this.route.snapshot.paramMap.get('reciever')
    this.service.connect()
   
    this.myPeer = new Peer('',{
    host:'/',
    port:3001
    });
   
    //  this.myVideo = document.createElement('video')
    // this.myVideo.muted = true
    //@ts-ignore
       this.myVideo = document.getElementById('face-stream-2') 
       this.myVideo!.muted = true
   navigator.mediaDevices.getUserMedia({
    video:true,
    audio:true
   }).then((stream)=>{
     this.addVideoStream(this.myVideo,stream)
    ///stop
    this.mediaStream = stream;
     
    // this.mediaStream.getTracks().forEach((track: MediaStreamTrack) => {
    //   if (track.kind === 'video') {
    //     this.myVideoTracks.push(track);
    //   }
    // });

     this.myPeer.on('call',call =>{
      call.answer(stream)
      // const video = document.createElement('video')
     const video = document.getElementById('face-stream-1') 
      call.on('stream',userVideoStream =>{
        this.addVideoStream(video,userVideoStream,true)
      })
     })

     this.service.videoUserConnected().subscribe((userId:any)=>{
      console.log('user-video-connected'+userId)
      this.connectToNewUser(userId,stream)
    })
   })

   this.service.UserDisConnected().subscribe((userId:any)=>{
    console.log(userId,'user disconnected')
    this.userId=userId
   if(this.peers[userId]) this.peers[userId].close()
   })

  this.myPeer.on('open',id =>{
    this.service.videoRoomJoin(this.id,id,reciever)
  })
  }

  addVideoStream(video:any,stream:any,other?:boolean){
    video.srcObject = stream
    video.addEventListener('loadedmetadata',()=>{
      video.play()
    })
   
      if(!other){
      this.videoGrid?.append(video)
      }else{
        this.otherVideo?.append(video)
      }
   
  }

  connectToNewUser(userId:any,stream:any){
    //ivde
    this.userId=userId
     const call = this.myPeer.call(userId,stream)
    //  const video = document.createElement('video')
    const video = document.getElementById('face-stream-1') 
     call.on('stream',(userVideoStream)=>{
      console.log('stream...')
         this.addVideoStream(video,userVideoStream,true)
     })
     call.on('close',()=>{
      video!.remove()
     })
     this.peers[userId] = call
  }
  end(){
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach((track) => {
        track.stop();
      });
    }
    console.log(this.userId,'user id');
    
    if(this.peers[this.userId]) this.peers[this.userId].close()
  }
  ngOnDestroy(): void {
    // this.myVideoTracks.forEach((track: MediaStreamTrack) => {
    //   track.stop();
    // });
     this.service.disconnect()
  }
}
