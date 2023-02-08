import { Component, OnInit } from '@angular/core';
import { ScriptService } from 'src/app/auth/admin/pages/images/script.service';
import { ImagesService } from '../services/images.service';
import { Image } from '../interfaces/image';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.css']
})
export class FolderComponent implements OnInit {

  images!: Image[];
  imagesFiltered: Image[] = [];
  nameFolder !:any;
  constructor(
    private ss: ScriptService,
    private imagesService: ImagesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.ss.loadScriptsWeb();

    this.activatedRoute.params.subscribe({
      next: ({id}) => {
        this.nameFolder = id;
        this.imagesService.getImages().subscribe({
          next: v => {
            this.images = v;
          },
          complete: () => {
            this.imagesFiltered = this.images.filter((i) => i.folder === id)
          }
        });
      },
      error: e => {
        this.router.navigateByUrl('/infraestructura');
      }
    })

    
  }

}
