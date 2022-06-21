import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AdminRoutingModule } from './admin-routing.module';

import { AdminComponent } from './admin.component';
import { AsideComponent } from './shared/aside/aside.component';
import { HeaderComponent } from './shared/header/header.component';
import { PostsComponent } from './pages/posts/posts.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AgregarComponent } from './pages/agregar/agregar.component';
import { ConfirmarComponent } from './shared/confirmar/confirmar.component';

//MAterial
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    AdminComponent,
    AsideComponent,
    HeaderComponent,
    PostsComponent,
    DashboardComponent,
    AgregarComponent,
    ConfirmarComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    RouterModule,
    ReactiveFormsModule,

    //Material
    MatButtonModule,
    MatDialogModule,
    MatDividerModule,
    MatInputModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule
  ]
})
export class AdminModule { }
