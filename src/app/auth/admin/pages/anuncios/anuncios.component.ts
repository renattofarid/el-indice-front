import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { Anuncios } from '../../../interfaces/anuncios';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmarComponent } from '../../shared/confirmar/confirmar.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-anuncios',
  templateUrl: './anuncios.component.html',
  styleUrls: ['../../../auth.styles.css']
})
export class AnunciosComponent implements OnInit {

  anuncios!: Anuncios[];
  displayedColumns: string[] = ['id', 'anuncio', 'categoria', 'created_at', 'actions'];
  dataSource!: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private adminService: AdminService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {

    this.adminService.anuncios().subscribe({
      next: anuncios => {
        this.anuncios = anuncios;
        this.dataSource = new MatTableDataSource<Anuncios>(this.anuncios);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })

  }

  borrar(id: number) {
    const idx = this.anuncios.findIndex((c) => c.id == id);

    const data = this.dialog.open(ConfirmarComponent, {
      width: '450px',
      data: this.anuncios[idx]
    });
    data.afterClosed()
      .subscribe({
        next: resp => {
          if (resp) {
            this.adminService.borrarAnuncio(id)
              .subscribe({
                next: (resp: any) => {
                  this.mixin('warning', resp.Message);
                  this.anuncios.splice(idx, 1);
                  this.dataSource = new MatTableDataSource<Anuncios>(this.anuncios);
                  this.dataSource.paginator = this.paginator;
                  this.dataSource.sort = this.sort;
                }
              })
          }
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
