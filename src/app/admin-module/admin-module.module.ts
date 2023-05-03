import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { CanDeactivateGuard } from '../components/admin/admin-candeactivate-guard.service';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ReactiveFormsModule } from '@angular/forms';
import { AddtagsComponent } from '../components/admin/addtags/addtags.component';
import {appReducer} from '../components/admin/admin-store/admin-store.reducer'
import { StoreModule } from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects'
import {TagEffect} from '../components/admin/addtags/store/tag.effects'
@NgModule({
  declarations: [
    AddtagsComponent
  ],
  imports: [
    CommonModule,
    NgxDropzoneModule,
    ReactiveFormsModule,
    StoreModule.forFeature('admin',appReducer),
    EffectsModule.forFeature([TagEffect])
  ],
  exports:[AdminRoutingModule],
  providers:[CanDeactivateGuard]
})
export class AdminModuleModule {
 }
