import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.styles.css']
})
export class AuthComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    localStorage.removeItem('theme');
  }

}
