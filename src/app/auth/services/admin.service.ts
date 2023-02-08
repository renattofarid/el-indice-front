import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PostResponse } from '../interfaces/posts';
import { PostRequest, Post } from '../interfaces/post';
import { Anuncio, AnuncioRequest } from '../interfaces/anuncio';
import { Anuncios } from '../interfaces/anuncios';
import { Contact } from '../interfaces/contact';
import { PreInscription } from '../interfaces/pre-inscriptions';
import { Slider } from '../interfaces/slider';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private _baseUrl: string = environment.baseUrl;

  private _headers = new HttpHeaders({
    'Content': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  });

  constructor(private http: HttpClient) { }

  // POSTS!

  posts() {
    return this.http.get<PostResponse>(`${this._baseUrl}/api/posts`, {
      headers: this._headers
    }).pipe(
      map((resp: PostResponse) => resp['data'])
    )
  }

  getPost(id: number): Observable<Post> {
    return this.http.get<Post>(`${this._baseUrl}/api/posts/${id}`, {
      headers: this._headers
    }).pipe(
      map((resp: Post) => resp['data'])
    )
  }

  crearPost(formData: PostRequest) {
    const token = localStorage.getItem('token') || '';

    return this.http.post(`${this._baseUrl}/api/posts`, formData, {
      headers: this._headers.append('Authorization', `Bearer ${token}`)
    });

  }

  actualizarPost(id: number, formData: PostRequest) {
    const token = localStorage.getItem('token') || '';

    return this.http.put(`${this._baseUrl}/api/posts/${id}`, formData, {
      headers: this._headers.append('Authorization', `Bearer ${token}`)
    });

  }

  borrarPost(id: number) {
    const token = localStorage.getItem('token') || '';

    return this.http.delete(`${this._baseUrl}/api/posts/${id}`, {
      headers: this._headers.append('Authorization', `Bearer ${token}`)
    });
  }

  //Categorías Posts!
  categorias() {
    return this.http.get(`${this._baseUrl}/api/categorias`, {
      headers: this._headers
    })
      .pipe(
        map(resp => resp['data'])
      )
  }

  getCategoriaPost(id: number) {
    return this.http.get(`${this._baseUrl}/api/categorias/${id}`, {
      headers: this._headers
    }).pipe(
      map(resp => resp['data'])
    )
  }

  crearCategoriaPosts(formData) {
    const token = localStorage.getItem('token') || '';

    return this.http.post(`${this._baseUrl}/api/categorias`, formData, {
      headers: this._headers.append('Authorization', `Bearer ${token}`)
    });
  }

  actualizarCategoriaPosts(id, formData) {
    const token = localStorage.getItem('token') || '';

    return this.http.put(`${this._baseUrl}/api/categorias/${id}`, formData, {
      headers: this._headers.append('Authorization', `Bearer ${token}`)
    });
  }

  borrarCategoriaPosts(id: number) {
    const token = localStorage.getItem('token') || '';

    return this.http.delete(`${this._baseUrl}/api/categorias/${id}`, {
      headers: this._headers.append('Authorization', `Bearer ${token}`)
    });
  }

  //Tags!

  tags() {
    return this.http.get(`${this._baseUrl}/api/tags`, {
      headers: this._headers
    })
      .pipe(
        map(resp => resp['data'])
      )
  }

  crearTag(formData) {
    const token = localStorage.getItem('token') || '';

    return this.http.post(`${this._baseUrl}/api/tags`, formData, {
      headers: this._headers.append('Authorization', `Bearer ${token}`)
    });
  }

  actualizarTag(id, formData) {
    const token = localStorage.getItem('token') || '';

    return this.http.put(`${this._baseUrl}/api/tags/${id}`, formData, {
      headers: this._headers.append('Authorization', `Bearer ${token}`)
    });

  }

  borrarTag(id: number) {
    const token = localStorage.getItem('token') || '';

    return this.http.delete(`${this._baseUrl}/api/tags/${id}`, {
      headers: this._headers.append('Authorization', `Bearer ${token}`)
    });
  }

  //Categorías Anuncios!

  categoriasAnuncios() {
    return this.http.get(`${this._baseUrl}/api/categorias-anuncio`, {
      headers: this._headers
    })
      .pipe(
        map(resp => resp['data'])
      )
  }

  getCategoriaAnuncio(id: number) {
    return this.http.get(`${this._baseUrl}/api/categorias-anuncio/${id}`, {
      headers: this._headers
    }).pipe(
      map(resp => resp['data'])
    )
  }

  crearCategoriaAnuncios(formData) {
    const token = localStorage.getItem('token') || '';

    return this.http.post(`${this._baseUrl}/api/categorias-anuncio`, formData, {
      headers: this._headers.append('Authorization', `Bearer ${token}`)
    });
  }

  actualizarCategoriaAnuncios(id, formData) {
    const token = localStorage.getItem('token') || '';

    return this.http.put(`${this._baseUrl}/api/categorias-anuncio/${id}`, formData, {
      headers: this._headers.append('Authorization', `Bearer ${token}`)
    });
  }

  borrarCategoriaAnuncios(id: number) {
    const token = localStorage.getItem('token') || '';

    return this.http.delete(`${this._baseUrl}/api/categorias-anuncio/${id}`, {
      headers: this._headers.append('Authorization', `Bearer ${token}`)
    });
  }

  // ANUNCIOS!

  anuncios(): Observable<Anuncios[]> {
    return this.http.get<Anuncios[]>(`${this._baseUrl}/api/anuncios`, {
      headers: this._headers
    }).pipe(
      map(resp => resp['data'])
    )
  }

  getAnuncio(id: number): Observable<Anuncio> {
    return this.http.get<Anuncio>(`${this._baseUrl}/api/anuncios/${id}`, {
      headers: this._headers
    }).pipe(
      map((resp: Anuncio) => resp['data'])
    )
  }

  crearAnuncio(formData: AnuncioRequest) {
    const token = localStorage.getItem('token') || '';

    return this.http.post<Anuncio>(`${this._baseUrl}/api/anuncios`, formData, {
      headers: this._headers.append('Authorization', `Bearer ${token}`)
    });

  }

  actualizarAnuncio(id: number, formData) {
    const token = localStorage.getItem('token') || '';

    return this.http.put(`${this._baseUrl}/api/anuncios/${id}`, formData, {
      headers: this._headers.append('Authorization', `Bearer ${token}`)
    });

  }

  borrarAnuncio(id: number) {
    const token = localStorage.getItem('token') || '';

    return this.http.delete(`${this._baseUrl}/api/anuncios/${id}`, {
      headers: this._headers.append('Authorization', `Bearer ${token}`)
    });
  }

  // MENSAJES DE CONTACTO!

  contactMessages(): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this._baseUrl}/api/contact`, {
      headers: this._headers
    })
  }

  // MENSAJES DE PRE INSCRIPCION!

  preInscriptions(): Observable<PreInscription[]> {
    return this.http.get<PreInscription[]>(`${this._baseUrl}/api/inscription`, {
      headers: this._headers
    })
  }

  // SLIDERS
  getAllSliders(): Observable<Slider[]> {
    return this.http.get<Slider[]>(`${this._baseUrl}/api/sliders`, {
      headers: this._headers
    }).pipe(
      map((resp: Slider[]) => resp['data'])
    )
  }

  getSlider(id: number): Observable<Slider> {
    const token = localStorage.getItem('token') || '';
    return this.http.get<Slider>(`${this._baseUrl}/api/sliders/${id}`, {
      headers: this._headers.append('Authorization', `Bearer ${token}`)
    }).pipe(
      map((resp: Slider) => resp['data'])
    )
  }

  createSlider(formData: any) {
    const token = localStorage.getItem('token') || '';
    return this.http.post<Slider>(`${this._baseUrl}/api/sliders`, formData, {
      headers: this._headers.append('Authorization', `Bearer ${token}`)
    });

  }

  updateSlider(id: number, formData) {
    const token = localStorage.getItem('token') || '';
    return this.http.put<Slider>(`${this._baseUrl}/api/sliders/${id}`, formData, {
      headers: this._headers.append('Authorization', `Bearer ${token}`)
    });

  }

  deleteSlider(id: number) {
    const token = localStorage.getItem('token') || '';
    return this.http.delete(`${this._baseUrl}/api/sliders/${id}`, {
      headers: this._headers.append('Authorization', `Bearer ${token}`)
    });
  }
}
