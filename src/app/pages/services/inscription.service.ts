import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class InscriptionService {

  constructor(private http: HttpClient) { }

  postInscription(body:any){
    return this.http.post(`${baseUrl}/api/inscription`, body);
  }
}
