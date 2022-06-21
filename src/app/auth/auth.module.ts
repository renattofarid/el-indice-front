import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './auth/login/login.component';
import { RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LoginComponent,
    AuthComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    RouterModule,
    SweetAlert2Module,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
