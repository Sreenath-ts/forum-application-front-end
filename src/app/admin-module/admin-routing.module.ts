import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from '../components/admin-layout/admin-layout.component';
import { AdminHomeComponent } from '../components/admin/admin-home/admin-home.component';
import { UsersComponent } from '../components/admin/users/users.component';
import { AdminLoginComponent } from '../components/admin/admin-login/admin-login.component';
import { AdminAuthGuard } from '../components/admin/admin.guard';
import { CanDeactivateGuard } from '../components/admin/admin-candeactivate-guard.service';
import { AddtagsComponent } from '../components/admin/addtags/addtags.component';
const routes: Routes = [
    {path:'',component:AdminLayoutComponent,children:[
        {path:'',component:AdminHomeComponent,canDeactivate:[CanDeactivateGuard] ,canActivate:[AdminAuthGuard],children:[
          {path:'users',component:UsersComponent},
          {path:'add-tags',component:AddtagsComponent}
        ]},
        {path:'login',component:AdminLoginComponent}
      ]}
]



@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class AdminRoutingModule { }