import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PostsComponent } from './pages/posts/posts.component';
import { AgregarComponent } from './pages/agregar/agregar.component';
import { AnunciosComponent } from './pages/anuncios/anuncios.component';
import { TagsComponent } from './pages/tags/tags.component';
import { CategoriasPostsComponent } from './pages/categorias-posts/categorias-posts.component';
import { CategoriasAnunciosComponent } from './pages/categorias-anuncios/categorias-anuncios.component';
import { AgregarAnuncioComponent } from './pages/agregar-anuncio/agregar-anuncio.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        pathMatch: 'full'
      },
      {
        path: 'anuncios',
        component: AnunciosComponent,
      },
      {
        path: 'tags',
        component: TagsComponent,
      },
      {
        path: 'cat-posts',
        component: CategoriasPostsComponent,
      },
      {
        path: 'cat-anuncios',
        component: CategoriasAnunciosComponent,
      },
      {
        path: 'posts',
        component: PostsComponent,
      },
      {
        path: 'posts/nuevo',
        component: AgregarComponent
      },
      {
        path: 'anuncios/nuevo',
        component: AgregarAnuncioComponent
      },
      {
        path: 'posts/editar/:id',
        component: AgregarComponent,
      },
      {
        path: 'anuncios/editar/:id',
        component: AgregarAnuncioComponent,
      },
      {
        path: '**',
        redirectTo: 'dashboard'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
