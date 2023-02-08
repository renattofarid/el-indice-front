import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [`
  .active-mobile{
    color: #dc2335 !important;
  }
  `
  ]
})
export class HeaderComponent implements OnInit, AfterViewInit {
  @ViewChild('sidebarBtn') sidebarBtn!: ElementRef<HTMLInputElement>
  @ViewChild('rt_slide_nav') rt_slide_nav!: ElementRef<HTMLInputElement>
  toggle: boolean = false;
  constructor() { }


  ngOnInit(): void { }


  ngAfterViewInit(): void {
    this.sidebarBtn.nativeElement.addEventListener('click', (e) => {
      console.log(this.toggle);
      if (this.toggle) {
        this.rt_slide_nav.nativeElement.style.display = 'none';
        this.toggle = false;
        return;
      }
      this.rt_slide_nav.nativeElement.style.display = 'block';
      this.toggle = true;
      return;
    })
  }

}
