import { Component, OnInit } from '@angular/core';
import { ScriptService } from 'src/app/auth/admin/pages/images/script.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryImageWithMedia, CategoryImagesService } from 'src/app/auth/services/category-images.service';
import { Image } from 'src/app/auth/services/images.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.css']
})
export class FolderComponent implements OnInit {

  folder!: CategoryImageWithMedia;
  nameFolder !:any;
  loading = true;
  constructor(
    private ss: ScriptService,
    private categoryImagesService: CategoryImagesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.ss.loadScriptsWeb();

    this.activatedRoute.params.subscribe({
      next: ({id}) => {
        this.categoryImagesService.getCategoryImage(id).subscribe({
          next: v => {
            this.nameFolder = v.description;
            this.folder = v;
          },
          complete: () => {
            this.loading = false;
            // this.imagesFiltered = this.images.filter((i) => i.folder === id)
          }
        });
      },
      error: e => {
        this.router.navigateByUrl('/infraestructura');
      }
    })

    
  }

}
