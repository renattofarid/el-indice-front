import { Component, OnInit } from '@angular/core';
import { ScriptService } from 'src/app/auth/admin/pages/images/script.service';
import { Image } from '../interfaces/image';
import { ImagesService } from '../services/images.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-nosotros',
  templateUrl: './nosotros.component.html',
  styles: [
  ]
})
export class NosotrosComponent implements OnInit {
  images!: Image[];
  folders: string[] = [];
  mapAllRepition = new Map();
  constructor(
    private ss: ScriptService,
    private imagesService: ImagesService
  ) { }

  ngOnInit(): void {
    this.ss.loadScriptsWeb();
  }

}
