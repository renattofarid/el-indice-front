import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap, Observable, catchError, of } from 'rxjs';
import { Login, LoginResponse } from '../interfaces/login';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _baseUrl: string = environment.baseUrl;

  private _headers = new HttpHeaders({
    'Content': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  });
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  validarToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';
    return this.http.get(`${this._baseUrl}/api/renewToken`, {
      headers: this._headers.append('Authorization', `Bearer ${token}`)
    }).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.Token)
      }),
      map(resp => true),
      catchError(error => of(false))
    )
  }

  login(formData: Login) {
    return this.http.post<LoginResponse>(`${this._baseUrl}/api/login`, formData)
      .pipe(
        tap(resp => {
          localStorage.setItem('token', resp.Token)
        })
      )
  }

  logout() {
    const token = localStorage.getItem('token') || '';
    this.http.get(`${this._baseUrl}/api/logout`, {
      headers: this._headers.append('Authorization', `Bearer ${token}`)
    }).subscribe({
      next: resp => {
        localStorage.removeItem('token');
        this.router.navigateByUrl('/auth/login');
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        Toast.fire({
          icon: 'success',
          title: 'Cierre de sesión exitoso'
        })
      }
    })
  }

}
