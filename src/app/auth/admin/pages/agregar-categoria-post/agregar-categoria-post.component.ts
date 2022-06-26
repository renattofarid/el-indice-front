import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoriasPostsComponent } from '../categorias-posts/categorias-posts.component';
import { FormBuilder, Validators } from '@angular/forms';
import { AdminService } from '../../../services/admin.service';
import { tap } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-categoria-post',
  templateUrl: './agregar-categoria-post.component.html',
})
export class AgregarCategoriaPostComponent implements OnInit {

  color: any = "#f00133";

  formCategoria = this.fb.group({
    name: ['', [Validators.required]],
    color: [[''], [Validators.required]],
    description: ['', [Validators.required]],
    image: ['', [Validators.required]],
  })

  constructor(
    public dialogRef: MatDialogRef<CategoriasPostsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { name: string, mode: boolean, id: number },
    private fb: FormBuilder,
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    switch (this.data.name) {
      case 'Posts':
        if (!this.data.id) {
          return;
        } else {
          this.getCatPost(this.data.id).subscribe()
        }
        break;
      case 'Anuncios':
        if (!this.data.id) {
          return;
        } else {
          this.getCatAnun(this.data.id).subscribe()
        }
        break;
    }

  }

  guardar() {
    switch (this.data.name) {
      case 'Posts':
        let formCatTempPost;
        if (this.formCategoria.value.color!["hex"]) {
          formCatTempPost = {
            name: this.formCategoria.value.name,
            color: this.formCategoria.value.color!["hex"],
            description: this.formCategoria.value.description,
            image: this.formCategoria.value.image,
          }
        } else {
          formCatTempPost = {
            name: this.formCategoria.value.name,
            color: this.formCategoria.value.color,
            description: this.formCategoria.value.description,
            image: this.formCategoria.value.image,
          }
        }
        if (!this.data.id) {
          this.adminService.crearCategoriaPosts(formCatTempPost).subscribe({
            next: (resp: any) => {
              this.mixin('success', resp.Message)
            },
            error: (err) => {
              console.log(err);
              this.mixin('error', 'Error de servicio')
            }
          })
        } else {
          this.adminService.actualizarCategoriaPosts(this.data.id, formCatTempPost).subscribe({
            next: (resp: any) => {
              this.mixin('success', resp.Message)
            },
            error: (err) => {
              console.log(err);
              this.mixin('error', 'Error de servicio')
            }
          })
        }
        break;
      case 'Anuncios':
        let formCatTempAnuncio;
        if (this.formCategoria.value.color!["hex"]) {
          formCatTempAnuncio = {
            name: this.formCategoria.value.name,
            color: this.formCategoria.value.color!["hex"],
            description: this.formCategoria.value.description,
            image: this.formCategoria.value.image,
          }
        } else {
          formCatTempAnuncio = {
            name: this.formCategoria.value.name,
            color: this.formCategoria.value.color,
            description: this.formCategoria.value.description,
            image: this.formCategoria.value.image,
          }
        }
        if (!this.data.id) {
          this.adminService.crearCategoriaAnuncios(formCatTempAnuncio).subscribe({
            next: (resp: any) => {
              this.mixin('success', resp.Message)
            },
            error: (err) => {
              console.log(err);
              this.mixin('error', 'Error de servicio')
            }
          })
        } else {
          this.adminService.actualizarCategoriaAnuncios(this.data.id, formCatTempAnuncio).subscribe({
            next: (resp: any) => {
              this.mixin('success', resp.Message)
            },
            error: (err) => {
              console.log(err);
              this.mixin('error', 'Error de servicio')
            }
          })
        }
        break;
    }

    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getCatPost(id: number) {
    return this.adminService.getCategoriaPost(id).pipe(
      tap(catpost => {
        this.formCategoria.controls['name'].setValue(catpost.name)
        this.formCategoria.controls['color'].setValue(catpost.color)
        this.formCategoria.controls['description'].setValue(catpost.description)
        this.formCategoria.controls['image'].setValue(catpost.image)
      })
    )
  }
  getCatAnun(id: number) {
    return this.adminService.getCategoriaAnuncio(id).pipe(
      tap(catanun => {
        this.formCategoria.controls['name'].setValue(catanun.name)
        this.formCategoria.controls['color'].setValue(catanun.color)
        this.formCategoria.controls['description'].setValue(catanun.description)
      })
    )
  }

  mixin(icon: any, message: string) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    Toast.fire({
      icon: icon,
      title: message
    })
  }
}
