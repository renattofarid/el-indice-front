import { Component, OnInit } from '@angular/core';
import { ScriptService } from 'src/app/auth/admin/pages/images/script.service';
import { ImagesService } from '../services/images.service';
import { Image } from '../interfaces/image';

@Component({
  selector: 'app-infraestructura',
  templateUrl: './infraestructura.component.html',
  styleUrls: ['./infraestructura.component.css']
})
export class InfraestructuraComponent implements OnInit {

  images!: Image[];
  folders: string[] = [];
  tempFoldersRepitions :string[] = [];
  isLoading = true;
  constructor(
    private ss: ScriptService,
    private imagesService: ImagesService
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.ss.loadScriptsWeb();
    this.imagesService.getImages().subscribe({
      next: v => {
        console.log(v);
        this.images = v;
      },
      complete: () => {
        this.images.map((i, index) => {
          this.folders[index] = i.folder

        });
        for (let i = 0; i < this.folders.length; i++) {
          if (!this.tempFoldersRepitions.includes(this.folders[i])) {
            this.tempFoldersRepitions.push(this.folders[i]); 
          }
        }
        console.log(this.tempFoldersRepitions);
        this.isLoading = false;
      }
    });
  }

}
