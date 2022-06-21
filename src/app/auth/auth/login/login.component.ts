import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./../../auth.styles.css']
})
export class LoginComponent implements OnInit {

  btnStatus: boolean = false;

  public loginForm = this.fb.group({
    email: ['admin@gmail.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required]],
  })

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  login() {
    this.authService.login(this.loginForm.value).subscribe({
      next: resp => {
        console.log(resp);
        Swal.fire({
          title: `Bienvenido!`,
          text: 'Has iniciado sesión correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
        this.router.navigateByUrl('/auth/dashboard');
      },
      error: err => {
        console.log('Status:', err);
        Swal.fire({
          title: 'Error!',
          text: `${err.error.Message}`,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }

  ngOnInit(): void {
  }

}
