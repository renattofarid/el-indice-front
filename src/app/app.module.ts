import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DISQUS_SHORTNAME } from 'ngx-disqus';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    SharedModule,
    HttpClientModule,
    BrowserAnimationsModule
    // FormsModule,
    // ReactiveFormsModule
  ],
  bootstrap: [AppComponent],
  // providers: [
  //   {
  //     provide: HTTP_INTERCEPTORS,
  //     useClass: InterceptorService,
  //     multi: true
  //   }
  // ]
  providers: [
    { provide: DISQUS_SHORTNAME, useValue: 'elindice' }
  ]
})
export class AppModule { }
