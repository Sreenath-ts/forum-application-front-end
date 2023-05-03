import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatRadioModule} from '@angular/material/radio';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecaptchaV3Module } from 'ng-recaptcha';
import { SocialLoginModule } from '@abacritt/angularx-social-login';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button'
import {MatButtonToggleModule} from '@angular/material/button-toggle';
const exp = [MatProgressBarModule,MatAutocompleteModule,MatCheckboxModule,BrowserAnimationsModule,MatSnackBarModule,MatRadioModule,MatInputModule,
  MatProgressSpinnerModule,
  MatCardModule,
  MatButtonModule,
  MatButtonToggleModule
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatProgressBarModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatRadioModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatButtonModule,
    MatButtonToggleModule
  ],
  exports:[exp]
})
export class SharedModuleModule { }
