import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CanComponentDeactivate } from '../admin-candeactivate-guard.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements CanComponentDeactivate {
  canDeactivate(){
    return confirm('Do you want to leave this site?')
  }
 
}
