import { Component, OnInit } from '@angular/core';
import { ScriptService } from 'src/app/auth/admin/pages/images/script.service';
// import { ImagesService } from '../services/images.service';
import { Image } from '../interfaces/image';
import { CategoryImage, CategoryImagesService } from 'src/app/auth/services/category-images.service';

@Component({
  selector: 'app-infraestructura',
  templateUrl: './infraestructura.component.html',
  styleUrls: ['./infraestructura.component.css']
})
export class InfraestructuraComponent implements OnInit {

  images!: Image[];
  folders: CategoryImage[] = [];
  isLoading = true;
  constructor(
    private ss: ScriptService,
    private categoryImagesService: CategoryImagesService,

  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.ss.loadScriptsWeb();
    // this.imagesService.getImages().subscribe({
    //   next: v => {
    //     console.log(v);
    //     this.images = v;
    //   },
    //   complete: () => {
    //     this.images.map((i, index) => {
    //       this.folders[index] = i.folder

    //     });
    //     for (let i = 0; i < this.folders.length; i++) {
    //       if (!this.tempFoldersRepitions.includes(this.folders[i])) {
    //         this.tempFoldersRepitions.push(this.folders[i]); 
    //       }
    //     }
    //     console.log(this.tempFoldersRepitions);
    //     this.isLoading = false;
    //   }
    // });
    this.categoryImagesService.getAllCategoryImages().subscribe({
      next: v => {
        console.log(v);
        this.folders = v;
        this.isLoading = false;
      }
    });
  }

}
