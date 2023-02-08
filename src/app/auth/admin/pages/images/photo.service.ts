import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Photo } from './form-image/form-image.component';


@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(private http: HttpClient) {
  }

  postImageToCloudinary(file: any) {
    const formData = new FormData();
    formData.append('upload_preset', 'ml_default');
    formData.append('folder', 'blog');
    formData.append('file', file);
    return this.http
      .post<any>(
        'https://api.cloudinary.com/v1_1/duzpck4ys/image/upload',
        formData
      )
      .pipe(map((r) => r.secure_url));
  }

  viewAllPhotosCloudinary(){
    return this.http
           .get<any>('https://174384627724166:Y4cLQuVrQoY7NtkyRgRht7l3v7w@api.cloudinary.com/v1_1/duzpck4ys/resources/search')
           .pipe(
              map((total)=> total.resources)
           )
  }
}
