import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Video } from '../interfaces/video.interface';

const baseUrl = environment.baseUrl;

export type VideoBody = {
  titulo: string,
  url: string
};

@Injectable({
  providedIn: 'root'
})
export class VideosService {

  private _headers = new HttpHeaders({
    'Content': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  });

  constructor(private http: HttpClient) { }

  getLastFourVideos(){
    return this.http.get<Video[]>(`${baseUrl}/api/lastFourVideos`)
  }

  getAllVideos(){
    return this.http.get<Video[]>(`${baseUrl}/api/videos`)
  }

  getVideoById(id:number){
    return this.http.get<Video[]>(`${baseUrl}/api/videos/${id}`)
  }

  postVideo(video:VideoBody){
    const token = localStorage.getItem('token') || '';
    return this.http.post(`${baseUrl}/api/videos`, video,{
      headers: this._headers.append('Authorization', `Bearer ${token}`)
    })
  }

  putVideo(id:number, video:VideoBody){
    const token = localStorage.getItem('token') || '';
    return this.http.put(`${baseUrl}/api/videos/${id}`, video,{
      headers: this._headers.append('Authorization', `Bearer ${token}`)
    })
  }

  deleteVideo(id:number){
    const token = localStorage.getItem('token') || '';
    return this.http.delete(`${baseUrl}/api/videos/${id}`,{
      headers: this._headers.append('Authorization', `Bearer ${token}`)
    })
  }

}
