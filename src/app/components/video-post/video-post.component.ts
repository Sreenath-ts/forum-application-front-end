import { Component, OnInit } from '@angular/core';
import { videoFetchService } from '../shared-service/notification.service';


@Component({
  selector: 'app-video-post',
  templateUrl: './video-post.component.html',
  styleUrls: ['./video-post.component.css']
})
export class VideoPostComponent implements OnInit {
  constructor(private service:videoFetchService){}
  videoUrls=[]
  ngOnInit(): void {
    this.service.videoFetch().subscribe((res:any)=>{
      this.videoUrls = res
    })
  }
}
