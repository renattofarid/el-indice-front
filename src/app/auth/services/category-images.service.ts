import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Image } from './images.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryImagesService {

  private _baseUrl: string = environment.baseUrl;
  private _headers = new HttpHeaders({
    'Content': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  });
  constructor(
    private http: HttpClient,
  ) { }

  getAllCategoryImages(): Observable<CategoryImage[]> {
    return this.http.get<CategoryImage[]>(`${this._baseUrl}/api/category-images`)
  }

  getCategoryImage(id: number): Observable<CategoryImageWithMedia> {
    return this.http.get<CategoryImageWithMedia>(`${this._baseUrl}/api/category-images/${id}`)
  }

  createCategoryImage(body: CategoryImageBody): Observable<CategoryImage> {
    const _token = localStorage.getItem('token') || '';
    return this.http.post<CategoryImage>(`${this._baseUrl}/api/category-images`, body, {
      headers: this._headers
        .append('Authorization', `Bearer ${_token}`)
    })
  }

  updateCategoryImage(id: number, body: CategoryImageBody): Observable<CategoryImage> {
    const _token = localStorage.getItem('token') || '';
    return this.http.put<CategoryImage>(`${this._baseUrl}/api/category-images/${id}`, body, {
      headers: this._headers
        .append('Authorization', `Bearer ${_token}`)
    })
  }

  deleteCategoryImage(id: number): Observable<CategoryImage> {
    const _token = localStorage.getItem('token') || '';
    return this.http.delete<CategoryImage>(`${this._baseUrl}/api/category-images/${id}`, {
      headers: this._headers
        .append('Authorization', `Bearer ${_token}`)
    })
  }

}

export interface CategoryImage {
  id:          number;
  description: string;
  created_at:  string;
  updated_at:  string;
}

export interface CategoryImageBody {
  description: string;
}

export interface CategoryImageWithMedia {
  id:          number;
  description: string;
  created_at:  string;
  updated_at:  string;
  images:      Image[];
}