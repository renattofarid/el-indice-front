import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { AdminService } from '../../../services/admin.service';

export interface statics {
  name: string;
  value: number;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['../../../auth.styles.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  view: [number, number] = [900, 400];
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  data: statics[] = [
    {
      "name": "Posts",
      "value": 0
    },
    {
      "name": "Anuncios",
      "value": 0
    },
    {
      "name": "Tags",
      "value": 0
    },

  ]
  dataTemp !: statics[];
  loading: boolean = true;
  interval;
  constructor(
    private authService: AuthService,
    private adminService: AdminService,
  ) {
    this.interval = setTimeout(() => {
      this.adminService.posts().subscribe({
        next: posts => {
          this.dataTemp = [...this.data];
          this.dataTemp[0].value = posts.length
        },
        complete: () => {
          this.adminService.anuncios().subscribe({
            next: anuncios => {
              this.dataTemp = [...this.data];
              this.dataTemp[1].value = anuncios.length
            },
            complete: () => {
              this.adminService.tags().subscribe({
                next: tags => {
                  this.dataTemp = [...this.data];
                  this.dataTemp[2].value = tags.length
                },
                complete: () => {
                  this.loading = false;
                  this.data = [...this.dataTemp]
                }
              });
            }
          });
        }
      });
      console.log('i');

    }, 500);
  }
  ngOnDestroy(): void {
    clearInterval(this.interval)
  }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
  }
}
