import { Component, Inject, OnInit, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Video } from 'src/app/pages/interfaces/video.interface';
import { VideosService } from 'src/app/pages/services/videos.service';
@Component({
  selector: 'app-form-slider',
  templateUrl: './form-video.component.html',
  styles: [`
    .example-full-width{
      width : 100%;
    }
  `
  ]
})
export class FormVideoComponent implements OnInit, AfterViewInit {

  categoriesList: any[] = [];
  cat: any[] = [];
  constructor(
    public dialogRef: MatDialogRef<FormVideoComponent>,
    @Inject(MAT_DIALOG_DATA) public video: { data: Video },
    private videosService: VideosService,
    private _snackBar: MatSnackBar,
    private fb: FormBuilder
  ) { }

  formVideo = this.fb.group({
    titulo: ['', [Validators.required]],
    url: ['', [Validators.required]],
  })

  ngOnInit(): void {
    if (this.video.data) {
      this.formVideo.reset({
        titulo: this.video.data.titulo,
        url: this.video.data.url,
      });
    }
  }

  ngAfterViewInit(): void { }

  save() {
    if (this.formVideo.invalid) {
      this.open('Por favor complete todos los campos')
      return;
    }

    if (!this.video.data) {
      this.videosService.postVideo({
        titulo: this.formVideo.value.titulo!,
        url: this.formVideo.value.url!,
      }).subscribe({
        next: (video) => {
          this.dialogRef.close(video);
        },
      });
      return;
    }

    this.videosService.putVideo(this.video.data.id, {
      titulo: this.formVideo.value.titulo!,
      url: this.formVideo.value.url!,
    }).subscribe({
      next: (video) => {
        this.dialogRef.close(video);
      },
      error: () => this.open('Ocurrió un error al actualizar el video'),
    });
  }

  close() {
    this.dialogRef.close();
  }


  open(message: string) {
    this._snackBar.open(message, 'Ok!', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 2000
    });
  }

}
