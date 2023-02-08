import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-extras',
  templateUrl: './extras.component.html',
  styles: [
    `
    .wspp{
      font-size: 1rem;
    color: var(--color-white);
    background: var(--color-primary);
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-radius: 5px;
    position: fixed;
    right: 30px;
    bottom: 30px;
    z-index: 99;
    display: none;
    cursor: pointer;
    overflow: hidden;
      
    }
    `
  ]
})
export class ExtrasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
