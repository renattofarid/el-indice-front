import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Slider } from 'src/app/auth/interfaces/slider';
import { AdminService } from 'src/app/auth/services/admin.service';
import { FormVideoComponent } from './form-video/form-video.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmarComponent } from '../../shared/confirmar/confirmar.component';
import { Video } from 'src/app/pages/interfaces/video.interface';
import { VideosService } from 'src/app/pages/services/videos.service';

@Component({
  selector: 'app-sliders',
  templateUrl: './videos.component.html',
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
export class VideosComponent implements OnInit {

  //DataTable
  videos: Video[] = [];
  columns: any[] = [
    { col: 'titulo', label: 'Título' },
  ];
  dataSource!: any;
  displayedColumns!: any[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private videosService: VideosService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void { this.getAllVideos() }

  getAllVideos() {
    this.videosService.getAllVideos().subscribe({
      next: (c) => {
        const tempCol = this.columns.map(c => c.col);
        this.displayedColumns = [...tempCol, 'Acciones']
        this.videos = c;
        this.dataSource = new MatTableDataSource<Video>(this.videos);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
  }

  createVideo() {
    const dialogRef = this.dialog.open(FormVideoComponent, {
      data: { data: null },
      height: 'auto',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(user => {
      if (!user) return;
      this.getAllVideos();
      this.open('Video creado correctamente');
    });
  }

  updateVideo(Video: Video) {
    const dialogRef = this.dialog.open(FormVideoComponent, {
      data: { data: Video },
      height: 'auto',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((Video) => {
      if (!Video) return;
      this.getAllVideos();
      this.open('Usuario actualizado correctamente');
    });
  }

  deleteVideo(id) {
    const idx = this.videos.findIndex((c) => c.id == id);

    const data = this.dialog.open(ConfirmarComponent, {
      width: '450px',
      data: this.videos[idx]
    });
    data.afterClosed()
      .subscribe({
        next: resp => {
          if (resp) {
            this.videosService.deleteVideo(id)
              .subscribe({
                next: resp => {
                  this.open('Video eliminado correctamente!');
                  this.videos.splice(idx, 1);
                  this.dataSource = new MatTableDataSource<Video>(this.videos);
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
