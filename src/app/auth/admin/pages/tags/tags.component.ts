import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { Tag } from '../../../interfaces/anuncios';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['../../../auth.styles.css']
})
export class TagsComponent implements OnInit {

  _tags!: Tag[];
  isEditable: boolean = false;

  constructor(
    private adminService: AdminService,
  ) { }

  ngOnInit(): void {
    this.tags().subscribe({
      next: tags => {
        this._tags = tags
      }
    })
  }

  tags() {
    return this.adminService.tags()
  }

  crearTag() {
    Swal.fire({
      title: 'Crea un nuevo Tag!',
      input: 'text',
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      showLoaderOnConfirm: true,
      preConfirm: (tag) => {
        this.adminService.crearTag({ name: tag }).subscribe({
          next: (r) => {
            console.log(r);
          },
          error: (err) => {
            Swal.fire({
              icon: 'error',
              title: `${err.name}`
            })
          }
        })
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        this.tags().subscribe({
          next: (tags) => {
            this._tags = tags,
              Swal.fire({
                icon: 'success',
                title: 'Tag creado correctamente'
              })
          }
        })
      }
    })
  }

  editar(id, value) {
    Swal.fire({
      title: 'Edita el nombre del Tag!',
      input: 'text',
      inputValue: value,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      showLoaderOnConfirm: true,
      preConfirm: (tag) => {
        this.adminService.actualizarTag(id, { name: tag }).subscribe({
          next: (r) => {
            console.log(r);
          },
          error: (err) => {
            Swal.fire({
              icon: 'error',
              title: `${err.name}`
            })
          }
        })
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        this.tags().subscribe({
          next: (tags) => {
            this._tags = tags,
              Swal.fire({
                icon: 'success',
                title: 'Tag Actualizado correctamente'
              })
          }
        })
      }
    })
  }

  eliminar(id: number) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: true
    })

    swalWithBootstrapButtons.fire({
      title: '??Est??s seguro?',
      text: "No podr??s revertir esta acci??n",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, borrar tag!',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminService.borrarTag(id).subscribe({
          next: r => {
            swalWithBootstrapButtons.fire(
              'Borrado!',
              'El tag se elimin?? correctamente',
              'success'
            );
            this.tags().subscribe({
              next: (tags) => {
                this._tags = tags
              }
            });
          }
        })
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado!',
          'Buena elecci??n, estar seguro a la pr??xima :)',
          'error'
        )
      }
    })
  }

  guardar() {
    this.isEditable = false;
  }

}
