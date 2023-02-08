import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, Observable } from 'rxjs';
import { CategoryPost } from '../interfaces/category-post';
const baseUrl = environment.baseUrl;
@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  getCategoriesPost(): Observable<CategoryPost[]>{
    return this.http.get<CategoryPost[]>(`${baseUrl}/api/categorias`).
      pipe(
        map( (data: CategoryPost[]) => data["data"] )
      );
  }
}
