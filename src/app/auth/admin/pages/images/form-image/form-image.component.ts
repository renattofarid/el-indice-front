import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map } from 'rxjs';
import { PhotoService } from '../photo.service';

export class Photo {
  public_id?: string;
  context?: any;
}
@Component({
  selector: 'app-form-image',
  templateUrl: './form-image.component.html',
  styleUrls: ['./form-image.component.css']
})
export class FormImageComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<FormImageComponent>,
    private photoService: PhotoService
  ) { }

  image!: any;

  ngOnInit(): void { }


  onFileSelected(p: any) {
    this.image = p.files[0];
  }

  store() {
    console.log('store');
    if (!this.image) {
      alert('Seleccione una imagen porfavor');
      return;
    }

    this.photoService.postImageToCloudinary(this.image).subscribe({
      next: (secureUrl) => {
        const data = {
          phone_id: this.image.public_id,
          image: secureUrl,
        };

        // this.photoService.postImage(data).subscribe({
        //   next: (img) => {
        //     this.phone.images.push(img);
        //     Swal.fire('Bien Hecho', 'Imagen Agregada', 'success');
        //     this.image = null;
        //     (document.querySelector('#file')! as HTMLInputElement).value = '';
        //   },
        //   error: (e) => Swal.fire('Ups', 'Error en el sistema', 'error'),
        // });
      },
    });
  }
  deleteImage() {
    // this.photoService.deleteImage(imageId).subscribe({
    //   next: () => {
    //     this.phone.images = this.phone.images.filter((i) => i.id != imageId);
    //     Swal.fire('Bien Hecho', 'Imagen Agregada', 'success');
    //   },
    //   error: (e) => Swal.fire('Ups', 'Error en el sistema', 'error'),
    // });
  };

  closeDialog(): void {
    this.dialogRef.close();
  }
}
