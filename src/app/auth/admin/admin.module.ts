import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AdminRoutingModule } from './admin-routing.module';

import { AdminComponent } from './admin.component';
import { AsideComponent } from './shared/aside/aside.component';
import { HeaderComponent } from './shared/header/header.component';
import { PostsComponent } from './pages/posts/posts.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AgregarComponent } from './pages/agregar/agregar.component';
import { ConfirmarComponent } from './shared/confirmar/confirmar.component';
import { CategoriasPostsComponent } from './pages/categorias-posts/categorias-posts.component';
import { CategoriasAnunciosComponent } from './pages/categorias-anuncios/categorias-anuncios.component';
import { AgregarAnuncioComponent } from './pages/agregar-anuncio/agregar-anuncio.component';
import { AgregarCategoriaAnuncioComponent } from './pages/agregar-categoria-anuncio/agregar-categoria-anuncio.component';
import { AgregarCategoriaPostComponent } from './pages/agregar-categoria-post/agregar-categoria-post.component';

//Material Components
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { AnunciosComponent } from './pages/anuncios/anuncios.component';
import { TagsComponent } from './pages/tags/tags.component';
import { MAT_COLOR_FORMATS, NgxMatColorPickerModule, NGX_MAT_COLOR_FORMATS } from '@angular-material-components/color-picker';

@NgModule({
  declarations: [
    AdminComponent,
    AsideComponent,
    HeaderComponent,
    PostsComponent,
    DashboardComponent,
    AgregarComponent,
    ConfirmarComponent,
    AnunciosComponent,
    TagsComponent,
    CategoriasPostsComponent,
    CategoriasAnunciosComponent,
    AgregarAnuncioComponent,
    AgregarCategoriaAnuncioComponent,
    AgregarCategoriaPostComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    NgxChartsModule,

    //Material
    NgxMatColorPickerModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule
  ],
  providers: [
    { provide: MAT_COLOR_FORMATS, useValue: NGX_MAT_COLOR_FORMATS }
  ]
})
export class AdminModule { }
