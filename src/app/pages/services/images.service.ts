import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Image } from '../interfaces/image';
const baseUrl = environment.baseUrl;
@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  constructor(private http: HttpClient) { }

  getImages(){
    return this.http.get<Image[]>(`${baseUrl}/api/getImages`).
      pipe(
        map( r => r["resources"])
      )
  }
}
