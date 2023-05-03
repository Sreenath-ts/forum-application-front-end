import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth-component/auth.service';
import { DataStoreageService } from 'src/app/shared-service/data-storeage.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponentAdmin implements OnInit {
  constructor(private authService:AuthService){}
  authenticated = false
  ngOnInit(): void {
    this.authService.admin.subscribe(Res=>{
      console.log(!!Res,'admin header');
      
      this.authenticated = !!Res
    })
  }

  logout(){
    this.authService.adminLogout()
  }
}
