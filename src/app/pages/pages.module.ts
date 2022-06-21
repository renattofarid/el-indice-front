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

@NgModule({
  declarations: [
    HomeComponent,
    NosotrosComponent,
    SliderComponent,
    PagesComponent,
    SinglePostComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    DisqusModule.forRoot('ngx')
  ]
})
export class PagesModule { }
