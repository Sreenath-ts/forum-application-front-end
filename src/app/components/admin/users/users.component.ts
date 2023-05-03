import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, switchMap,of } from 'rxjs';
import { AuthResponseData, AuthService } from '../../auth-component/auth.service';
import { AdminModel } from '../admin-login/admin.model';
import Swal from 'sweetalert2'
import { User } from '../../auth-component/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  constructor(private authService:AuthService,private http:HttpClient){}

DataForEdit!:AuthResponseData;
 

searchControl:FormControl = new FormControl()

  editUser=false

 

  users!:[AuthResponseData];
 ngOnInit(): void {
   this.authService.adminAllusers().subscribe((resData=>{
    console.log(resData,'all 8888888888888888888888  user 88888888888888888888');
    this.users=resData.data
   }))
   this.searchControl.valueChanges.pipe(debounceTime(1000),switchMap(val=>{
   return this.http.get(`http://localhost:3000/admin/user?name=${val}`)                 
    
   })).subscribe((data:any)=>{
     this.users = data.data
   })
   
 }
 block(i:number,access:Boolean|undefined){
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      this.authService.blockUser(  this.users[i]._id,this.users[i].access).subscribe((res)=>{
        this.users[i].access = ! access
        console.log(res,'blocked sucesses');
        
       })
      Swal.fire(
        'Blocked!',
        'Your user has been blocked.',
        'success'
      )
    }
  })
  
 }
 index!:number
 edit(i:number){
  this.index = i
   this.editUser=true
   this.DataForEdit = this.users[i]
 }
 editDoned(eve:any){
  this.editUser = false
  this.users[this.index] = eve
 }
}
