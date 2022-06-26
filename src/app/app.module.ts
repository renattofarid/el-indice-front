import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import localeESPE from '@angular/common/locales/es-PE';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeESPE, "es-PE")
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
})
export class AppModule { }
