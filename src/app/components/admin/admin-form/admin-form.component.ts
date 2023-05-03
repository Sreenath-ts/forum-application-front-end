import { Component,EventEmitter,Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from '../../auth-component/auth.service';
import { User } from '../../auth-component/user.model';
@Component({
  selector: 'app-admin-form',
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.css']
})
export class AdminFormComponent implements OnInit {
  ngOnInit(): void {
   console.log(this.editData,'edit cheyan');
   
  }
  constructor(private authService:AuthService){}
  @Input() editData!:AuthResponseData
  @Output() editDone:EventEmitter<Boolean>=new EventEmitter()
  authSubmit(data:NgForm){
    console.log(data.value,'user editing going on.........');
    this.authService.editUser(data.value).subscribe((data)=>{
      console.log(data.data,'edited data');
      this.editDone.emit(data.data)
    })
  }
}
