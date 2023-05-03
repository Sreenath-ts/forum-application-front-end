import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { AuthComponentComponent } from './components/auth-component/auth-component.component';
import { AuthGuard } from './components/auth-component/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { UsersComponent } from './components/admin/users/users.component';
import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';
import { AdminAuthGuard } from './components/admin/admin.guard';
import { UserLayoutComponent } from './components/user-layout/user-layout.component';
import { OtpComponent } from './components/otp/otp.component';
import { QuestionComponent } from './components/question/question.component';
import { QuestionDetialComponent } from './components/question/question-detial/question-detial.component';
import { UserListComponent } from './components/chat/user-list/user-list.component';
import { ChatComponent } from './components/chat/chat.component';
import { IdeComponent } from './components/question/ide/ide.component';
import { VideoComponent } from './components/video/video.component';
import { LiveCodingComponent } from './components/live-coding/live-coding.component';
import { CoPilotComponent } from './components/co-pilot/co-pilot.component';
import { VideoUploadComponent } from './components/video-upload/video-upload.component';
import { VideoPostComponent } from './components/video-post/video-post.component';
// import { AdminAuthGuard } from './components/admin/admin.guard';


const routes: Routes = [{
  path:'auth',component:AuthComponentComponent
},
{path:'people',component:UserListComponent,children:[
  {path:'chat/:id',component:ChatComponent},
]},

{path:'otp',component:OtpComponent},
{path:'co-pilot',component:CoPilotComponent},
{path:'video-room/:id/:reciever',component:VideoComponent},
{path:'video-upload',component:VideoUploadComponent},
{path:'videos',component:VideoPostComponent}
,{path:'',component:UserLayoutComponent,children:[
  {path:'',component:HomeComponent},
  {path:'profile',component:ProfileComponent,canActivate:[AuthGuard]},
  {path:'askQuestion',component:QuestionComponent},
  {path:'question-detial/:id',component:QuestionDetialComponent},
  {path:'ide/:la',component:IdeComponent},
  {path:'live-coding',component:LiveCodingComponent}
]},
{path:'admin',loadChildren: () => import('./admin-module/admin-module.module').then(m => m.AdminModuleModule)}]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
