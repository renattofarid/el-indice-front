import { Component, Inject, OnChanges, OnInit, SimpleChanges, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { AdminService } from '../../../../services/admin.service';
import { Slider } from 'src/app/auth/interfaces/slider';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-form-slider',
  templateUrl: './form-slider.component.html',
  styles: [`
    .example-full-width{
      width : 100%;
    }
  `
  ]
})
export class FormSliderComponent implements OnInit, AfterViewInit {

  categoriesList: any[] = [];
  cat: any[] = [];
  constructor(
    public dialogRef: MatDialogRef<FormSliderComponent>,
    @Inject(MAT_DIALOG_DATA) public slider: { data: Slider },
    private adminService: AdminService,
    private _snackBar: MatSnackBar,
    private fb: FormBuilder
  ) { }
  

  formSlider = this.fb.group({
    categoria_id: [0, [Validators.required]],
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    imagen: ['', [Validators.required]]
  })

  ngOnInit(): void {
    this.adminService.categorias().subscribe({
      next: resp => {
        this.categoriesList = resp;
        console.log(this.categoriesList);
      },
      complete: () => {
        if (this.slider.data) {
            this.formSlider.reset({
              categoria_id: (!this.slider.data.categoria) ? this.categoriesList[0].id : this.slider.data.categoria.id,
              title: this.slider.data.title,
              description: this.slider.data.description,
              imagen: this.slider.data.imagen,
            });
        }
      }
    })
    
  }

  ngAfterViewInit(): void {
    
  }

  save() {
    if (this.formSlider.invalid) {
      this.open('Por favor complete todos los campos')
      return;
    }

    if (!this.slider.data) {
      this.adminService.createSlider(this.formSlider.value).subscribe({
        next: (slider) => {
          this.dialogRef.close(slider);
        },
      });
      return;
    }

    this.adminService.updateSlider(this.slider.data.id, this.formSlider.value).subscribe({
      next: (slider) => {
        this.dialogRef.close(slider);
      },
      error: () => this.open('Ocurrió un error al actualizar la empresa'),
    });
  }

  close() {
    this.dialogRef.close();
  }

  cambiar(id) {
    this.cat = this.categoriesList.find(e => e.id === id);
  }

  categorias() {
    this.adminService.categorias().subscribe({
      next: resp => {
        this.categoriesList = resp;
        console.log(this.categoriesList);
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
