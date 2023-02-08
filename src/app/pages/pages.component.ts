import { Component, OnInit } from '@angular/core';
import { ScriptService } from '../auth/admin/pages/images/script.service';
// declare function funcionalidad();
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
    
  ]
})
export class PagesComponent implements OnInit {

  constructor(
    private ss: ScriptService
  ) { }

  ngOnInit(): void {
  }

}

// <script type="text/javascript" src="./assets/web/dependencies/jquery/jquery.min.js"></script>
// <script type="text/javascript" src="./assets/web/dependencies/popper.js/popper.min.js"></script>
// <script type="text/javascript" src="./assets/web/dependencies/bootstrap/js/bootstrap.min.js"></script>
// <script type="text/javascript" src="./assets/web/dependencies/appear/appear.min.js"></script>
// <script type="text/javascript" src="./assets/web/dependencies/swiper/js/swiper.min.js"></script>
// <script type="text/javascript" src="./assets/web/dependencies/masonry/masonry.min.js"></script>
// <script type="text/javascript" src="./assets/web/dependencies/magnific-popup/js/magnific-popup.min.js"></script>
// <script type="text/javascript" src="./assets/web/dependencies/theia-sticky-sidebar/resize-sensor.min.js"></script>
// <script type="text/javascript" src="./assets/web/dependencies/theia-sticky-sidebar/theia-sticky-sidebar.min.js"></script>
// <script type="text/javascript" src="./assets/web/dependencies/validator/validator.min.js"></script>
// <script type="text/javascript" src="./assets/web/dependencies/tween-max/tween-max.js"></script>
// <script type="text/javascript" src="./assets/web/dependencies/wow/js/wow.min.js"></script>
// <script type="text/javascript" src="./assets/web/js/app.js"></script>
