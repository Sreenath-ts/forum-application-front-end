import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth-component/auth.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {
  constructor(private authService:AuthService){}
  ngOnInit(): void {
    this.authService.AdminautoLogin()
  }

}
