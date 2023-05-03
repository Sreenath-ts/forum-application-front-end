import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { RecaptchaV3Module, RECAPTCHA_V3_SITE_KEY} from 'ng-recaptcha';
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import {StoreDevtoolsModule} from '@ngrx/store-devtools'
import {
  GoogleLoginProvider
} from '@abacritt/angularx-social-login';
import { StoreModule } from '@ngrx/store';

import {EffectsModule} from '@ngrx/effects'

import { AdminModuleModule } from './admin-module/admin-module.module';

import { PickerModule } from '@ctrl/ngx-emoji-mart';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponentComponent } from './components/auth-component/auth-component.component';
import { LoadingSpinnerComponent } from 'src/shared/loading-spinner/loading-spinner.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { InterceptorService } from './components/auth-component/auth-service.service';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { HeaderComponentAdmin } from './components/admin/header/header.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { UsersComponent } from './components/admin/users/users.component';
import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';
import { AdminFormComponent } from './components/admin/admin-form/admin-form.component';
import { RecaptchaInterceptorInterceptor } from './recap/recaptcha-interceptor.interceptor';
import { UserLayoutComponent } from './components/user-layout/user-layout.component';
import { appReducer } from './components/app-store/app-store.reducer';
import { AuthEffects } from './components/auth-component/store/auth.effects';
import { OtpComponent } from './components/otp/otp.component';
import { SharedModuleModule } from './shared-module/shared-module.module';
import { QuestionComponent } from './components/question/question.component';
import { SimqEffects } from './components/question/store/question.effects';
import { QuestionDetialComponent } from './components/question/question-detial/question-detial.component';
import { LeftSideComponent } from './components/left-side/left-side.component';
import { RightSideComponent } from './components/right-side/right-side.component';
import { QuestionAnswerComponent } from './components/question/question-answer/question-answer.component';
import { AnswerEffects } from './components/question/question-answer/store/q-answer.effects';
import { ReactionDirectiveDirective } from './shared-service/reaction-directive.directive';
import { ChatComponent } from './components/chat/chat.component';
import { UserListComponent } from './components/chat/user-list/user-list.component';
import { chatEffects } from './components/chat/store/chat.effects';
import { IdeComponent } from './components/question/ide/ide.component';
import { VideoComponent } from './components/video/video.component';
import { CoreModule } from './core.module';
import { LiveCodingComponent } from './components/live-coding/live-coding.component';
import { CoPilotComponent } from './components/co-pilot/co-pilot.component';
import { VideoUploadComponent } from './components/video-upload/video-upload.component';
import { VideoPostComponent } from './components/video-post/video-post.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponentComponent,
    LoadingSpinnerComponent,
    HeaderComponent,
    HomeComponent,
    ProfileComponent,
    AdminLayoutComponent,
    HeaderComponentAdmin,
    AdminHomeComponent,
    UsersComponent,
    AdminLoginComponent,
    AdminFormComponent,
    UserLayoutComponent,
    OtpComponent,
    QuestionComponent,
    QuestionDetialComponent,
    LeftSideComponent,
    RightSideComponent,
    QuestionAnswerComponent,
    ReactionDirectiveDirective,
    ChatComponent,
    UserListComponent,
    IdeComponent,
    VideoComponent,
    LiveCodingComponent,
    CoPilotComponent,
    VideoUploadComponent,
    VideoPostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RecaptchaV3Module,
    SocialLoginModule,
    AdminModuleModule,
    SharedModuleModule,
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot([AuthEffects,SimqEffects,AnswerEffects,chatEffects]),
    StoreDevtoolsModule.instrument({logOnly:false}),
    PickerModule,
    CoreModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
