import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormImageComponent } from './form-image/form-image.component';
import { ScriptService } from './script.service';
import { PhotoService } from './photo.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit, OnDestroy {

  constructor(
    private dialog: MatDialog, 
    private scriptService: ScriptService,
    private photoService: PhotoService
    ) {
  }
  ngOnDestroy(): void {
    this.scriptService.removeScript('upload-cloud');
    this.scriptService.removeScript('media-cloud');
    this.scriptService.removeScript('widget-cloud');
  }

  ngOnInit(): void {
    this.scriptService.loadScript({ id: 'upload-cloud', url: 'https://upload-widget.cloudinary.com/global/all.js' }).then((c) => {
      this.scriptService.loadScript({ id: 'media-cloud', url: 'https://media-library.cloudinary.com/global/all.js' }).then((v) => {
        this.scriptService.loadScript({ id: 'widget-cloud', url: './assets/web/js/cloudinary.js' })
      })
    })

    this.photoService.viewAllPhotosCloudinary().subscribe({
      next: (responde) => {
        console.log('fotos totales',responde);
        
      }
    })


  }

  uploadImage() {
    const dialogRef = this.dialog.open(FormImageComponent, {
      // width: '250px',
      data: null,
    });

    dialogRef.afterClosed().subscribe((img) => {
      if (!img) return;

      // Swal.fire('Bien Hecho', 'Agregado correctamente', 'success');
      // this.brands = [...this.brands,brand.payload];
      // this.dataSource = new MatTableDataSource<Brand>(this.brands);
    });
  }
}
