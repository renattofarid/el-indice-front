import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { SinglePostComponent } from './single-post/single-post.component';
import { ContactoComponent } from './contacto/contacto.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { SingleCategoriaComponent } from './single-categoria/single-categoria.component';
import { InfraestructuraComponent } from './infraestructura/infraestructura.component';
import { FolderComponent } from './folder/folder.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: HomeComponent,
        pathMatch: 'full'
      },
      {
        path: 'nosotros',
        component: NosotrosComponent
      },
      {
        path: 'contacto',
        component: ContactoComponent
      },
      {
        path: 'noticias',
        component: CategoriasComponent
      },
      {
        path: 'infraestructura',
        component: InfraestructuraComponent
      },
      {
        path: 'infraestructura/:id',
        component: FolderComponent
      },
      {
        path: 'noticias/:id',
        component: SingleCategoriaComponent
      },
      {
        path: 'posts/:id',
        component: SinglePostComponent
      },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
