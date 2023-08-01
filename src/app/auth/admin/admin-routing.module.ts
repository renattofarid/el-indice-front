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
import { ImagesComponent } from './pages/images/images.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { InscriptionsComponent } from './pages/inscriptions/inscriptions.component';
import { SlidersComponent } from './pages/sliders/sliders.component';
import { VideosComponent } from './pages/videos/videos.component';
import { CategoryImagesComponent } from './pages/category-images/category-images.component';

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
        path: 'folders',
        component: CategoryImagesComponent,
      },
      {
        path: 'folders/:id',
        component: ImagesComponent,
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
        path: 'mensajes-contacto',
        component: ContactsComponent,
      },
      {
        path: 'sliders',
        component: SlidersComponent,
      },
      {
        path: 'videos',
        component: VideosComponent,
      },
      {
        path: 'pre-inscripcion',
        component: InscriptionsComponent,
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
