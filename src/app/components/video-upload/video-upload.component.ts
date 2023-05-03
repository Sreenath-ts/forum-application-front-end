import { HttpClient, HttpEventType, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NotifiService } from 'src/app/shared-service/notification/notifi.service';

//@ts-ignore
import {StartUpload,FileChosen} from './video.js'

@Component({
  selector: 'app-video-upload',
  templateUrl: './video-upload.component.html',
  styleUrls: ['./video-upload.component.css']
})
export class VideoUploadComponent implements OnInit {
  
  

  
constructor(private http:HttpClient,private service:NotifiService){
  // this.StartUpload = this.StartUpload.bind(this);
  // this.FileChosen = this.FileChosen.bind(this);
  this.Startup = this.Startup.bind(this);
}
Filechose(event:any){
  FileChosen(event)
}
  ngOnInit(): void {
    console.log(FileChosen,'gillll')
    document.getElementById('UploadButton')?.addEventListener('click', this.Startup);  
     document.getElementById('FileBox')?.addEventListener('change',FileChosen );

  //  this.Service.socket.on("Done", function (data) {
  //     let Content = "Video Successfully Uploaded !!";
  //     Content +=
  //     "<img id='Thumb' src='" +
  //     data["Image"] +
  //     "' alt='" 
  //     "'><br>";
  //     Content +=
  //     "<button    type='button' name='Upload' value='' id='Restart' class='Button'>Upload Another</button>";
  //     document.getElementById("UploadArea")!.innerHTML = Content;
  //     // document.getElementById("Restart")?.addEventListener("click", Refresh);
  // });
  }
  Startup(){
    console.log(this.service.bitch,'socket');
    
    StartUpload(this.service.socket)
  }
  // SelectedFile:any;
  //  FReader : any;
  //  Name : any;
  //  FileChosen(evnt:any) {
  //   console.log('working999999999999999999999999999999999999999999999999');
    
  //   this.SelectedFile = evnt.target.files[0];
  //   console.log(this.SelectedFile,'selected fileee eooiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii');
    
  //  //@ts-ignore
  //  const hi:HTMLInputElement  =   document.getElementById("NameBox")
  //  hi.value = this.SelectedFile.name;
  //  console.log(this.SelectedFile,'selected fileee eooiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii');
  // }

  //  StartUpload = ()=> {
  //   console.log(this.SelectedFile,'starteing place88888888888888888');
    
  //   //@ts-ignore
  //   if (document.getElementById("FileBox")!.value != "") {
  //     this.FReader = new FileReader();
  //      //@ts-ignore
  //     this.Name = document.getElementById("NameBox")!.value;
      
  //     let Content =
  //       "<span id='NameArea'>Uploading " +
  //      this.Name+
  //       " as " +
  //       this.Name +
  //       "</span>";
  //     Content +=
  //       '<div id="ProgressContainer"><div id="ProgressBar"></div></div><span id="percent">0%</span>';
  //       console.log(this.SelectedFile,'nameeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')
  //     Content +=
  //       "<span id='Uploaded'> - <span id='MB'>0</span>/" +
  //       Math.round(this.SelectedFile.size / 1048576) +
  //       "MB</span>";
  //     document.getElementById("UploadArea")!.innerHTML = Content;
  //     console.log('this is reader',this.FReader);
      
  //     this.FReader.onload =  (evnt:any) =>  {
  //          console.log('onload$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
           
  //       this.Service.socket
  //       .emit("Upload", { Name: this.Name, Data: evnt.target.result });
  //     };
  //     this.Service.socket
  //     .emit("Start", { Name: this.Name, Size: this.SelectedFile.size });
  //   } else {
  //     alert("Please Select A File");
  //   }
  
  // }
}
