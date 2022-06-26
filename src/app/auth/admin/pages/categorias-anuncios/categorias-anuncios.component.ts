import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from 'src/app/auth/services/admin.service';
import { AgregarCategoriaPostComponent } from '../agregar-categoria-post/agregar-categoria-post.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categorias-anuncios',
  templateUrl: './categorias-anuncios.component.html',
  styleUrls: ['../../../auth.styles.css']
})
export class CategoriasAnunciosComponent implements OnInit {

  catAnuncios: any;
  isEditable: boolean = false;
  name: string = 'Anuncios';

  constructor(
    private adminService: AdminService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.catanuncios().subscribe();
  }

  openDialog(isEdit = false, id?: number): void {
    const dialogRef = this.dialog.open(AgregarCategoriaPostComponent, {
      width: '450px',
      data: { name: this.name, mode: isEdit, id: id },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.catanuncios().subscribe();
    });
  }

  catanuncios() {
    return this.adminService.categoriasAnuncios().pipe(
      tap(catanuncios => {
        this.catAnuncios = catanuncios;
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
        this.adminService.borrarCategoriaAnuncios(id).subscribe({
          next: (r: any) => {
            this.mixin('warning', r.Message);
            this.catanuncios().subscribe();
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
