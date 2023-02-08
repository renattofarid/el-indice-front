import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Slider } from 'src/app/auth/interfaces/slider';
import { AdminService } from 'src/app/auth/services/admin.service';
import { FormSliderComponent } from './form-slider/form-slider.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmarComponent } from '../../shared/confirmar/confirmar.component';

@Component({
  selector: 'app-sliders',
  templateUrl: './sliders.component.html',
  styleUrls: ['../../../auth.styles.css'],
  styles: [`
    .example-button-row {
      display: flex;
      gap: 4px;
    }
    table {
    width: 100%;
  }
  .mat-form-field {
    font-size: 14px;
    width: 100%;
  }
  td,
  th {
    width: auto;
  }
  .example-button-row {
    position: relative;
  }
  .example-button-row .mat-button-base {
    margin: 8px 8px 8px 0;
  }
  `
  ]
})
export class SlidersComponent implements OnInit {

  //DataTable
  sliders: Slider[] = [];
  columns: any[] = [
    { col: 'categoria', label: 'Categoría' },
    { col: 'title', label: 'Título' },
    { col: 'description', label: 'Descripción' },
    { col: 'imagen', label: 'Imagen' },
  ];
  dataSource!: any;
  displayedColumns!: any[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private adminService: AdminService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void { this.getAllSliders() }

  getAllSliders() {
    this.adminService.getAllSliders().subscribe({
      next: (c) => {
        const tempCol = this.columns.map(c => c.col);
        this.displayedColumns = [...tempCol, 'Acciones']
        this.sliders = c;
        this.dataSource = new MatTableDataSource<Slider>(this.sliders);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
  }

  createSlider() {
    const dialogRef = this.dialog.open(FormSliderComponent, {
      data: { data: null },
      height: 'auto',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(user => {
      if (!user) return;
      this.getAllSliders();
      this.open('Slider creado correctamente');
    });
  }

  updateSlider(slider: Slider) {
    const dialogRef = this.dialog.open(FormSliderComponent, {
      data: { data: slider },
      height: 'auto',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((slider) => {
      if (!slider) return;
      this.getAllSliders();
      this.open('Usuario actualizado correctamente');
    });
  }

  deleteSlider(id) {
    const idx = this.sliders.findIndex((c) => c.id == id);

    const data = this.dialog.open(ConfirmarComponent, {
      width: '450px',
      data: this.sliders[idx]
    });
    data.afterClosed()
      .subscribe({
        next: resp => {
          if (resp) {
            this.adminService.deleteSlider(id)
              .subscribe({
                next: resp => {
                  this.open('Slider eliminado correctamente!');
                  this.sliders.splice(idx, 1);
                  this.dataSource = new MatTableDataSource<Slider>(this.sliders);
                  this.dataSource.paginator = this.paginator;
                  this.dataSource.sort = this.sort;
                }
              })
          }
        }
      })
  }

  open(message: string) {
    this._snackBar.open(message, 'Ok!', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 2000
    });
  }

}
