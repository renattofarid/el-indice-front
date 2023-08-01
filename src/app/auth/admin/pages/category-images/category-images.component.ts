import { Component, OnInit } from '@angular/core';
import { CategoryImage, CategoryImagesService } from 'src/app/auth/services/category-images.service';
import { CategoryImageBody } from '../../../services/category-images.service';
import Swal from 'sweetalert2';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-images',
  templateUrl: './category-images.component.html',
  styleUrls: ['./category-images.component.css']
})
export class CategoryImagesComponent implements OnInit {

  categoryImages: CategoryImage[] = [];
  categoryImageSelected: CategoryImage | null = null;
  showForm: boolean = false;
  formCategoryImage = {
    description: new FormControl('')
  };
  constructor(
    private categoryImagesService: CategoryImagesService,
    private router: Router
  ) {
    this.formCategoryImage.description.valueChanges.subscribe((value) => {
      console.log(value);
    });
  }

  ngOnInit(): void {
    this.getAllCategoryImages();
  }

  setShowForm(action: 'create' | 'update', categoryImage?: CategoryImage) {
    this.formCategoryImage.description.setValue(categoryImage?.description || null);
    if (action === 'create') {
      this.showForm = true;
    } else if (action === 'update') {
      this.showForm = true;
      this.categoryImageSelected = categoryImage!;
      this.formCategoryImage.description.setValue(categoryImage?.description || null);
    }
  }

  saveCategoryImage() {
    if (!this.formCategoryImage.description.value) {
      Swal.fire('Error', 'Debe ingresar una descripción', 'error');
      return;
    }
    if (!this.categoryImageSelected) {
      this.createCategoryImage();
    } else{
      this.updateCategoryImage(this.categoryImageSelected.id, {
        description: this.formCategoryImage.description.value
      });
      this.categoryImageSelected = null;
    }

    this.formCategoryImage.description.setValue(null);
    return this.showForm = false;
  }

  getAllCategoryImages() {
    this.categoryImagesService.getAllCategoryImages().subscribe(
      (categoryImages) => {
        this.categoryImages = categoryImages;
      }
    )
  }

  createCategoryImage() {
    if (!this.formCategoryImage.description.value) {
      Swal.fire('Error', 'Debe ingresar una descripción', 'error');
      return;
    }
    this.categoryImagesService.createCategoryImage({
      description: this.formCategoryImage.description.value
    }).subscribe(
      (categoryImage) => {
        this.categoryImages.push(categoryImage);
      }
    )
  }

  updateCategoryImage(id: number, categoryImage: CategoryImageBody) {
    this.categoryImagesService.updateCategoryImage(id, categoryImage).subscribe(
      (categoryImageUpdated) => {
        this.categoryImages = this.categoryImages.map(categoryImage => categoryImage.id === id ? categoryImageUpdated : categoryImage);
      }
    )
  }

  deleteCategoryImage(id: number) {
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
      confirmButtonText: 'Si, borrar Folder!',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryImagesService.deleteCategoryImage(id).subscribe({
          next: r => {
            swalWithBootstrapButtons.fire(
              'Borrado!',
              'El Folder se eliminó correctamente',
              'success'
            );
            this.categoryImages = this.categoryImages.filter(categoryImage => categoryImage.id !== id);
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

  goToCategoryImage(id: number) {
    console.log(id);
    this.router.navigate(['/auth/folders', id]);
  }

}
