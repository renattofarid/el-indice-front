import { Component, OnInit, OnDestroy, ViewChild, TemplateRef } from '@angular/core';
import { ScriptService } from '../../auth/admin/pages/images/script.service';
import { Post } from '../interfaces/post';
import { PostService } from '../services/post.service';
import { Slider } from '../interfaces/slider';
import { FormBuilder, Validators } from '@angular/forms';
import { InscriptionService } from '../services/inscription.service';
import { VideosService } from '../services/videos.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

type VideoHTML = {
  titulo: string,
  imagen: string,
  url: SafeHtml
  created_at: string,
  updated_at: string,
};
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  @ViewChild('contenidoModal') contenidoModal!: TemplateRef<any>;

  latestPosts !:Post[];
  featured !:Post[];
  sliders !:Slider[];
  lastVideos !:VideoHTML[];
  nivels = ['Inicial', 'Primaria', 'Secundaria'];
  grades = ['1º','2º','3º','4º','5º','6º']
  constructor(
    private ss: ScriptService,
    private postService: PostService,
    private fb: FormBuilder,
    private inscriptionService:InscriptionService,
    private sanitizer: DomSanitizer,
    private videosService: VideosService
  ) {
  }

  ngOnInit(): void {
    this.ss.loadScriptsWeb();
    this.postService.getLatestPosts().subscribe({
      next: (posts) => {
        this.latestPosts = posts;
      },
    });
    this.postService.getFeatured().subscribe({
      next: (featured) => {
        console.log('dstacads',featured.length);
        this.featured = featured;
      },
    });
    this.postService.getSliders().subscribe({
      next: (sliders) => {
        this.sliders = sliders;
      },
    })
    this.videosService.getLastFourVideos().subscribe({
      next: (videos) => {
        this.lastVideos = videos.map((video) => {
          return {
            ...video,
            url: this.sanitizer.bypassSecurityTrustHtml(video.url)
          }
        });
      }
    })
  }

  inscriptionForm = this.fb.group({
    nombres : [,[Validators.required]],
    apellidos : [,[Validators.required]],
    dni : ['',[Validators.required]],
    email : [,[Validators.required, Validators.email]],
    apoderado : [,[Validators.required]],
    telefono : ['',[Validators.required]],
    nivel : [,[Validators.required]],
    grado : [,[Validators.required]],
  });

  postInscription(){
    const sendForm = {
      ...this.inscriptionForm.value,
      dni: this.inscriptionForm.controls['dni'].value!.toString()
      ,
      telefono: this.inscriptionForm.controls['telefono'].value!.toString(),
    }
    this.inscriptionService.postInscription(sendForm).subscribe({
      next:(value)=> {
        alert('Pre Inscripción Registrada Correctamente');
        this.inscriptionForm.reset();
      },
      error(err) {
        alert('Ocurrió un error inesperado')
      },
    })
  }
}
