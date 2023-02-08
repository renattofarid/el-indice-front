import { Component, OnInit } from '@angular/core';
import { ScriptService } from 'src/app/auth/admin/pages/images/script.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ContactService } from '../services/contact.service';
@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

  constructor(
    private ss: ScriptService,
    private fb: FormBuilder,
    private contactService:ContactService
  ) { }

  ngOnInit(): void {
    this.ss.loadScriptsWeb();
  }

  contactForm = this.fb.group({
    'nombre': ['', Validators.required],
    'email': ['', [Validators.required, Validators.email]],
    'telefono': [, Validators.required,],
    'mensaje': ['', Validators.required],
  });

  postMessage(){
    this.contactService.postMessage(this.contactForm.value).subscribe({
      next: (v) => {
        console.log('Mensaje enviado',v);
        alert('Mensaje enviado correctamente');
        this.contactForm.reset();
      }
    })
  }

}
