import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from '../../../services/admin.service';
import { tap } from 'rxjs';
import Swal from 'sweetalert2';
import { AgregarCategoriaPostComponent } from '../agregar-categoria-post/agregar-categoria-post.component';

@Component({
  selector: 'app-categorias-posts',
  templateUrl: './categorias-posts.component.html',
  styleUrls: ['../../../auth.styles.css']
})
export class CategoriasPostsComponent implements OnInit {

  catPosts: any;
  isEditable: boolean = false;
  name: string = 'Posts';

  constructor(
    private adminService: AdminService,
    public dialog: MatDialog
  ) { }

  openDialog(isEdit = false, id?: number): void {
    const dialogRef = this.dialog.open(AgregarCategoriaPostComponent, {
      width: '450px',
      data: { name: this.name, mode: isEdit, id: id },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.catposts().subscribe();
    });
  }

  ngOnInit(): void {
    this.catposts().subscribe();
  }

  catposts() {
    return this.adminService.categorias().pipe(
      tap(catposts => {
        this.catPosts = catposts;
      })
    )
  }
  eliminar(id) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: true
    })
    swalWithBootstrapButtons.fire({
      title: '¿Estás seguro?',
      text: "Estos cambios no se revertirán",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, borrar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminService.borrarCategoriaPosts(id).subscribe({
          next: (r: any) => {
            this.mixin('warning', r.Message);
            this.catposts().subscribe();
          },
          error: (err: any) => {
            this.mixin('error', 'Error de servicio');
          }
        })
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado!',
          'Estar más seguro a la próxima :)',
          'error'
        )
      }
    })

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
