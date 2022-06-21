import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { AdminService } from '../../../services/admin.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PostRequest, Post } from '../../../interfaces/post';
import Swal from 'sweetalert2';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['../../../auth.styles.css']
})
export class AgregarComponent implements OnInit {

  tagList: any[] = [];
  servicesList: any[] = [];
  categoriesList: any[] = [];
  postTemp!: PostRequest;
  isExist: boolean = false;
  postExistente!: Post;
  toggleHtml: boolean = false;

  @ViewChild('txtContenido') txtContenido!: ElementRef<HTMLInputElement>

  public postForm = this.fb.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    content: ['', [Validators.required]],
    tags: ['', [Validators.required]],
    categoria_id: ['', [Validators.required]],
    published: ['1', [Validators.required]],
    imagen: ['', [Validators.required]],
    anuncios: ['', [Validators.required]],
  })

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private router: Router,
    private activatedRoute: ActivatedRoute,

  ) { }

  ngOnInit(): void {
    this.tags();
    this.anuncios();
    this.categorias();
    if (!this.router.url.includes('editar')) {
      return
    }
    this.activatedRoute.params.pipe(
      switchMap(({ id }) => this.adminService.getPost(id))
    )
      .subscribe({
        next: postExist => {
          this.postExistente = postExist;
          this.isExist = true;
          const anunExist = this.postExistente.anuncios.map((a) => a.id)
          const tagExist = this.postExistente.tags.map((a) => a.id)
          this.postForm.setValue({
            title: this.postExistente.title,
            description: this.postExistente.description,
            content: this.postExistente.content,
            categoria_id: this.postExistente.categoria.id,
            published: this.postExistente.published,
            imagen: this.postExistente.imagen,
            tags: tagExist,
            anuncios: anunExist,
          })
        },
        error: () => {
          this.router.navigateByUrl('/auth/posts')
        }
      });
  }

  toggleEditar() {
    this.toggleHtml = !this.toggleHtml
  }

  onContextChange(name, key: string) {
    this.postForm.controls[key].setValue(name.innerHTML);
    this.mixin('success', `${key} actualizado`);
  }

  insertarParrafo() {
    const p = "\n<p> Reemplaza aquí por un párrafo </p>"
    this.postForm.controls['content'].setValue(this.txtContenido.nativeElement.value + p);
  }

  insertarTitulo() {
    const t = `\n<h3 class="title">Título insertado</h3>`;
    this.postForm.controls['content'].setValue(this.txtContenido.nativeElement.value + t);
  }

  insertarBlockquote() {
    const b =
      `\n<figure class="rt-blockquote-area">
    <blockquote class="rt-blockquote">
      <i class="fas fa-quote-left"></i>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis autem repudiandae explicabo, saepe doloremque neque, laborum expedita tempora ducimus ipsa excepturi? Sit incidunt vel natus nobis. Tenetur blanditiis nihil quos!
      </p>
      <span class="name">
        Renatto Perleche
      </span>
    </blockquote>
  </figure>`;
    this.postForm.controls['content'].setValue(this.txtContenido.nativeElement.value + b);
  }
  insertarParrafoInicial() {
    const pi = `\n<p class="rt-dropcap-style-1">Insertar párrafo inicial</p>`;
    this.postForm.controls['content'].setValue(this.txtContenido.nativeElement.value + pi);
  }

  insertarLista() {
    const li =
      `\n<ul class="list-style-6">
      <li>Elemento de lista 3</li>
      <li>Elemento de lista 2</li>
      <li>Elemento de lista 1</li>
  </ul>`;
    this.postForm.controls['content'].setValue(this.txtContenido.nativeElement.value + li);
  }

  insertarSubseccion() {
    const sub = `\n<div class="single-content">
    <h3 class="title">Sub-sección insertada</h3>
    <p class="mb--25">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dignissimos soluta eveniet tenetur vel qui harum,
        nostrum accusamus amet.
    </p>
    <div class="thumb-vidided mb--30">
        <div class="row gutter-24">
            <div class="col-lg-6">
                <img src="https://radiustheme.com/demo/html/neeon/media/gallery/single-post-img_1.jpg" alt="post-img"
                    width="696" height="540">
            </div>
            <div class="col-lg-6">
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique repellendus non error placeat
                    ipsam at odit sit doloribus maiores! Fugit, odio? Magni odio ea enim quam deserunt vitae asperiores
                    consequatur.
                </p>
            </div>
        </div>
    </div>
    <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Similique animi amet adipisci autem quasi debitis
        assumenda ipsam porro voluptatem perferendis distinctio magni a cum, dolores consectetur voluptas provident illo
        fugiat.
    </p>
</div>`
    this.postForm.controls['content'].setValue(this.txtContenido.nativeElement.value + sub);
  }

  insertar2colimg() {
    const colimg = `\n<div class="thumb-post-area mb--30">
    <div class="row gutter-24">
       <div class="col-lg-6">
          <div class="item-img">
             <img src="https://radiustheme.com/demo/html/neeon/media/gallery/single-post-img_2.jpg" alt="post-img" width="696" height="540">
             <a href="http://www.youtube.com/watch?v=1iIZeIy7TqM" class="play-btn play-btn-white_lg rt-play-over">
                <i class="fas fa-play"></i>
             </a>
          </div>
       </div>
       <div class="col-lg-6">
          <div class="item-img">
             <img src="https://radiustheme.com/demo/html/neeon/media/gallery/single-post-img_3.jpg" alt="post-img" width="696" height="540">
          </div>
       </div>
    </div>
 </div>
    `;
    this.postForm.controls['content'].setValue(this.txtContenido.nativeElement.value + colimg);
  }

  guardarPost() {

    this.postTemp = {
      title: this.postForm.value['title'],
      description: this.postForm.value['description'],
      content: this.postForm.value['content'],
      tags: this.postForm.value['tags'].toString(),
      categoria_id: this.postForm.value['categoria_id'],
      published: this.postForm.value['published'],
      imagen: this.postForm.value['imagen'],
      anuncios: this.postForm.value['anuncios'].toString(),

    }
    if (this.postForm.invalid) {
      this.mixin('error', 'Todos los campos son obligatorios')
      return;
    } else if (this.postExistente) {
      this.adminService.actualizarPost(this.postExistente.id, this.postTemp).subscribe({
        next: (resp: any) => {
          this.router.navigateByUrl(`/auth/posts/editar/${this.postExistente.id}`);
          const msg: string = `${resp.Message}`;
          this.mixin('success', msg);
        },
        error: err => {
          console.log(err);
          this.mixin('error', 'Error de servicio')
        }
      })
      return;
    } else {
      this.adminService.crearPost(this.postTemp).subscribe({
        next: (resp: any) => {
          this.router.navigateByUrl('/auth/posts');
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

  categorias() {
    this.adminService.categorias().subscribe({
      next: resp => {
        this.categoriesList = resp;
      }
    })
  }

  tags() {
    this.adminService.tags().subscribe({
      next: resp => {
        this.tagList = resp;
      }
    })
  }

  anuncios() {
    this.adminService.anuncios().subscribe({
      next: resp => {
        this.servicesList = resp;
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
