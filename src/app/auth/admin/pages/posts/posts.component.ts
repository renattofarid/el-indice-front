import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { Router } from '@angular/router';
import { PostResponse } from '../../../interfaces/posts';
import { ConfirmarComponent } from '../../shared/confirmar/confirmar.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['../../../auth.styles.css']
})
export class PostsComponent implements OnInit {

  //DataTable
  posts: PostResponse[] = [];
  // displayedColumns: string[] = ['id', 'user', 'categoria', 'title', 'slug', 'description', 'content', 'imagen', 'published', 'tags', 'anuncios', 'created_at'];
  displayedColumns: string[] = ['id', 'title', 'categoria', 'created_at', 'actions'];
  dataSource!: any;

  constructor(
    private adminService: AdminService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ngOnInit(): void {
    this.traerPosts();
  }

  traerPosts() {
    this.adminService.posts().subscribe({
      next: resp => {
        this.posts = resp;
        this.dataSource = new MatTableDataSource<PostResponse>(this.posts);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
  }

  borrar(id: number) {
    const idx = this.posts.findIndex((c) => c.id == id);

    const data = this.dialog.open(ConfirmarComponent, {
      width: '450px',
      data: this.posts[idx]
    });
    data.afterClosed()
      .subscribe({
        next: resp => {
          if (resp) {
            this.adminService.borrarPost(id)
              .subscribe({
                next: resp => {
                  this.mixin('warning', 'Post eliminado correctamente!');
                  this.posts.splice(idx, 1);
                  this.dataSource = new MatTableDataSource<PostResponse>(this.posts);
                  this.dataSource.paginator = this.paginator;
                  this.dataSource.sort = this.sort;
                }
              })
          }
        }
      })
  }

  mixin(icon: any, message: string) {
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
      icon: icon,
      title: message
    })
  }

}
