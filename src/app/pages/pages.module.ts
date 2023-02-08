import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { SliderComponent } from './home/components/slider/slider.component';
import { HomeComponent } from './home/home.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { SinglePostComponent } from './single-post/single-post.component';
import { DisqusModule } from 'ngx-disqus';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { ContactoComponent } from './contacto/contacto.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { SingleCategoriaComponent } from './single-categoria/single-categoria.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InfraestructuraComponent } from './infraestructura/infraestructura.component';
import { FolderComponent } from './folder/folder.component';
@NgModule({
  declarations: [
    HomeComponent,
    NosotrosComponent,
    SliderComponent,
    PagesComponent,
    SinglePostComponent,
    ContactoComponent,
    CategoriasComponent,
    SingleCategoriaComponent,
    InfraestructuraComponent,
    FolderComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    DisqusModule.forRoot('ngx'),
    ShareButtonsModule,
    ShareIconsModule
  ]
})
export class PagesModule { }
