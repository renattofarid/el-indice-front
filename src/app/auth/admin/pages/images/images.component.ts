import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormImageComponent } from './form-image/form-image.component';
import { ScriptService } from './script.service';
import { PhotoService } from './photo.service';
import { Image, ImagesService } from 'src/app/auth/services/images.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryImage } from 'src/app/auth/services/category-images.service';
import { CategoryImagesService } from '../../../services/category-images.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {

  images: Image[] = [];
  newImages: any[] = [];
  categoryImage: CategoryImage | null = null;
  form: FormGroup;
  constructor(
    private imagesService: ImagesService,
    private categoryImagesService: CategoryImagesService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    ) {
      this.form = this.fb.group({
        category_image_id: [''],
        image: ['']
      });
  }

  ngOnInit(): void {
    this.getAllImages();
  }

  getAllImages() {
    const { id } = this.route.snapshot.params;
    this.categoryImagesService.getCategoryImage(id).subscribe((images) => {
      this.images = images.images;
      this.categoryImage = images;
    });
  }

  async captureImages(event: any) {
    this.newImages = [];
    const { id } = this.route.snapshot.params;
    let coverCaptured = event.target.files as FileList;
    console.log(coverCaptured.length);
    for (let i = 0; i < coverCaptured.length; i++) {
      this.newImages.push(coverCaptured[i]);
    }
    console.log(this.newImages);
  }

  saveImages() {
    if (this.newImages.length === 0) {
      return;
    }
    const { id } = this.route.snapshot.params;
    for (let i = 0; i < this.newImages.length; i++) {
      const formData = new FormData();
      formData.append('category_image_id', id);
      formData.append('image', this.newImages[i]);
      this.imagesService.createImage(formData).subscribe((image) => {
        this.images.push(image);
        const formFile = document.getElementById('formFile') as HTMLInputElement;
        formFile.value = '';
      }
      );
    }
  }

  deleteImage(id: number) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: true
    })

    swalWithBootstrapButtons.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esta acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, borrar Imagen!',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.imagesService.deleteImage(id).subscribe({
          next: r => {
            swalWithBootstrapButtons.fire(
              'Borrado!',
              'La imagen se eliminó correctamente',
              'success'
            );
            this.images = this.images.filter(img => img.id !== id);
          }
        })
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado!',
          'Buena elección, estar seguro a la próxima :)',
          'error'
        )
      }
    })
  }

  goToFolders() {
    this.categoryImage = null;
    this.router.navigate(['/auth/folders']);
  }
}
