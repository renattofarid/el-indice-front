import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScriptService {

  constructor() { }

  public loadScript({ id, url }) {
    return new Promise((resolve, reject) => {
      if (id && document.getElementById(id)) {
        resolve({ id: id, loaded: true, status: 'Already Loaded' });
      }
      let body = document.body;
      let script = document.createElement('script');
      script.type = 'text/javascript';
      script.innerHTML = '';
      script.src = url;
      script.id = id;
      script.onload = () => {
        resolve({ id: id, loaded: true, status: 'Loaded' });
      };
      script.onerror = (error: any) => resolve({ id: id, loaded: false, status: 'Loaded' });
      script.async = true;
      script.defer = true;
      body.appendChild(script);
    });
  }

  public removeScript(id: string) {
    let script = document.getElementById(id);
    if (script) {
      script.remove();
    }
  }

  public loadScriptsWeb() {
    this.loadScript({ id: 'jquery', url: './assets/web/dependencies/jquery/jquery.min.js' })
    .then(_ => {
    this.loadScript({ id: 'swiper', url: './assets/web/dependencies/swiper/js/swiper.min.js' })
    })
    .then(_ => {
    this.loadScript({ id: 'bootstrap', url: './assets/web/dependencies/bootstrap/js/bootstrap.min.js'})
    })
    .then(_ => {
    this.loadScript({ id: 'appear', url: './assets/web/dependencies/appear/appear.min.js'})
    })
    .then(_ => {
    this.loadScript({ id: 'popper', url: './assets/web/dependencies/popper.js/popper.min.js'})
    })
    .then(_ => {
    this.loadScript({ id: 'masonry', url: './assets/web/dependencies/masonry/masonry.min.js'})
    })
    .then(_ => {
    this.loadScript({ id: 'magnific', url: './assets/web/dependencies/magnific-popup/js/magnific-popup.min.js'})
    })
    .then(_ => {
    this.loadScript({ id: 'resize', url: './assets/web/dependencies/theia-sticky-sidebar/resize-sensor.min.js'})
    })
    .then(_ => {
    this.loadScript({ id: 'theia', url: './assets/web/dependencies/theia-sticky-sidebar/theia-sticky-sidebar.min.js'})
    })
    .then(_ => {
    this.loadScript({ id: 'validator', url: './assets/web/dependencies/validator/validator.min.js'})
    })
    .then(_ => {
    this.loadScript({ id: 'tween', url: './assets/web/dependencies/tween-max/tween-max.js'})
    })
    .then(_ => {
    this.loadScript({ id: 'wow', url: './assets/web/dependencies/wow/js/wow.min.js'})
    })
    .then(_ => {
    this.loadScript({ id: 'app', url: './assets/web/js/app.js'})
    })
  }
}
