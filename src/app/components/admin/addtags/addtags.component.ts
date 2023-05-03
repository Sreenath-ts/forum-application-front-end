import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as fromApp from '../admin-store/admin-store.reducer'
import * as fromTagAction from './store/tag.action' 
import { Store } from '@ngrx/store';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const  BaseUrl = `http://localhost:3000/admin`;
@Component({
  selector: 'app-addtags',
  templateUrl: './addtags.component.html',
  styleUrls: ['./addtags.component.css']
})
export class AddtagsComponent {
  constructor(private store:Store<fromApp.AppState>,private http:HttpClient){}
  files: File[] = [];
  message:string = ''

  onSelect(event:any){
    if(this.files.length==0 && event.addedFiles.length==1){
      this.files = [...event.addedFiles]
    }else{
      this.message = 'Only one image required'
    }
  }
  onRemove(event:File){
    this.files.splice(this.files.indexOf(event),1)
  }
  tags = new FormGroup({
    'title': new FormControl('',Validators.required),
    'description': new FormControl('',Validators.required)
  })
  addtag(){
    if(this.tags.valid){
      if(this.files.length == 1){
        console.log(this.tags.value,'hereeeeeeee',this.files);
        const data : any = {...this.tags.value}
        // const datas = new FormData()
        // datas.append('title',data.title)
        // datas.append('description',data.description)
        // datas.append('image',this.files[0])
        // console.log(datas.getAll('title'),
        // datas.getAll('image'),'datatatatatataatatatatatat');
        
        // let headers = new HttpHeaders();
        // headers = headers.append('Content-Type', 'multipart/form-data');
        // const options = { headers: headers };
        // this.http.post(`${BaseUrl}/add-tag`,datas,options).subscribe((res)=>{
        //   console.log(res,'call successssss...........>>>>>>>');
          
        // })
        const datas = new FormData();
datas.append('title', data.title);
datas.append('description', data.description);
datas.append('image', this.files[0]);

const options = { headers: new HttpHeaders() };
this.http.post(`${BaseUrl}/add-tag`,{...datas}, options).subscribe(res => {
  console.log(res, 'call successssss...........>>>>>>>');
});

        // this.store.dispatch(new fromTagAction.AddTagStart(datas))
      }else{
        this.message = 'please add one image'
      }
    }else{
      this.message = 'Enter the values'
    }
  }
}
