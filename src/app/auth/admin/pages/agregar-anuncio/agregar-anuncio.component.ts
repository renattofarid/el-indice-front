import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/auth/services/admin.service';
import Swal from 'sweetalert2';
import { catchError, tap } from 'rxjs';

@Component({
  selector: 'app-agregar-anuncio',
  templateUrl: './agregar-anuncio.component.html',
  styleUrls: ['../../../auth.styles.css']
})
export class AgregarAnuncioComponent implements OnInit {

  tagList: any;
  catAnun: any;
  anuncioTemp: any;
  isExist: boolean = false;
  private _idAnuncio!: number;

  public anuncioForm = this.fb.group({
    name: ['', [Validators.required]],
    image: ['', [Validators.required]],
    categoria_anuncios_id: [0, [Validators.required]],
    description: ['', [Validators.required]],
    address: ['', [Validators.required]],
    phone: [0, [Validators.required]],
    cellphone: [0, [Validators.required]],
    status: [true, [Validators.required]],
    tags: [[0], [Validators.required]],
  })

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.categoriasAnuncios().subscribe()
    this.tags().subscribe();
    if (!this.router.url.includes('editar')) {
      return
    } else {
      this.activatedRoute.params.subscribe({
        next: ({ id }) => {
          this.obtenerAnuncioExistente(id).subscribe()
        }
      })
    }
  }

  tags() {
    return this.adminService.tags().pipe(
      tap(resp => {
        this.tagList = resp;
      })
    )
  }

  categoriasAnuncios() {
    return this.adminService.categoriasAnuncios().pipe(
      tap(resp => {
        this.catAnun = resp
      })
    )
  }

  obtenerAnuncioExistente(id: number) {
    return this.adminService.getAnuncio(id).pipe(
      tap(anuncio => {
        this.anuncioForm.setValue({
          name: anuncio.name,
          image: anuncio.image,
          categoria_anuncios_id: anuncio.categoria_anuncio.id,
          description: anuncio.description,
          address: anuncio.address,
          phone: anuncio.phone,
          cellphone: anuncio.cellphone,
          status: anuncio.status,
          tags: anuncio.tags.map((a) => a.id),
        });
        this._idAnuncio = anuncio.id
        this.isExist = true
      }),
      catchError(
        () => this.router.navigateByUrl('/auth/anuncios')
      )
    )
  }

  guardarAnuncio() {
    this.anuncioTemp = {
      name: this.anuncioForm.value['name'],
      image: this.anuncioForm.value['image'],
      categoria_anuncios_id: this.anuncioForm.value['categoria_anuncios_id'],
      description: this.anuncioForm.value['description'],
      address: this.anuncioForm.value['address'],
      phone: this.anuncioForm.value['phone'],
      cellphone: this.anuncioForm.value['cellphone'],
      status: this.anuncioForm.value['status'],
      tags: this.anuncioForm.value['tags']!.toString(),
    }
    if (this.anuncioForm.invalid) {
      this.mixin('error', 'Todos los campos son obligatorios')
      return;
    } else if (this.isExist) {
      this.adminService.actualizarAnuncio(this._idAnuncio, this.anuncioTemp).subscribe({
        next: (r: any) => {
          console.log(r)
          this.mixin('success', `${r.Message}`)
        },
        error: err => {
          console.log(err);
          this.mixin('error', 'Error de servicio')
        }
      })
      return;
    } else {
      this.adminService.crearAnuncio(this.anuncioTemp).subscribe({
        next: (resp: any) => {
          this.router.navigateByUrl('/auth/anuncios');
          const msg: string = `${resp.Message}`;
          this.mixin('success', msg);
        },
        error: err => {
          console.log(err);
          this.mixin('error', 'Error de servicio')
        }
      })
    }


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
