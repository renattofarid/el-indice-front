import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


const baseUrl = environment.baseUrl;
@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  postMessage(body:any){
    return this.http.post(`${baseUrl}/api/contact`,body);
  }
}
