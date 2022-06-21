import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PostResponse } from '../interfaces/posts';
import { PostRequest, Post } from '../interfaces/post';


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

  categorias() {
    return this.http.get(`${this._baseUrl}/api/categorias`, {
      headers: this._headers
    })
      .pipe(
        map(resp => resp['data'])
      )
  }

  tags() {
    return this.http.get(`${this._baseUrl}/api/tags`, {
      headers: this._headers
    })
      .pipe(
        map(resp => resp['data'])
      )
  }

  anuncios() {
    return this.http.get(`${this._baseUrl}/api/anuncios`, {
      headers: this._headers
    }).pipe(
      map(resp => resp['data'])
    )
  }
}
