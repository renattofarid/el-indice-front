import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Post } from '../interfaces/post';
import { Slider } from '../interfaces/slider';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getLatestPosts(){
    return this.http.get<Post[]>(`${baseUrl}/api/posts/lastPosts`)
  }
  
  getFeatured(){
    return this.http.get<Post[]>(`${baseUrl}/api/posts/featured`)
  }
  
  getSliders() : Observable<Slider[]>{
    return this.http.get<Slider[]>(`${baseUrl}/api/sliders`)
    .pipe(
      map((resp: Slider[]) => resp['data'])
    )
  }

  getPostsFilteredByCategory(id:any){
    return this.http.get<Post[]>(`${baseUrl}/api/posts/filtrosCategoria/${id}`)
  }
}
