import { Component, OnInit } from '@angular/core';

interface Slides {
  title: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [`
  .active-mobile{
    color: #2962ff !important;
  }
  `
  ]
})
export class HeaderComponent implements OnInit {

  slides: Slides[] = [
    {
      title: 'kajdlandasdnaskdnaskdbaskjnbdsak'
    },
    {
      title: 'gajdlandasdnaskdnaskdbaskjnbdsak'
    },
    {
      title: 'lajdlandasdnaskdnaskdbaskjnbdsak'
    }
  ]
  constructor() { }

  ngOnInit(): void { }


}
