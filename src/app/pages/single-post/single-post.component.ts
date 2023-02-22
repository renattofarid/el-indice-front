import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AdminService } from '../../auth/services/admin.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Post } from '../../auth/interfaces/post';
import { switchMap } from 'rxjs';
import { ScriptService } from 'src/app/auth/admin/pages/images/script.service';


@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styles: [
  ]
})
export class SinglePostComponent implements OnInit {

  post!: Post;
  exist: boolean = false;
  linkShare!: string;
  imageShare!: string;

  @ViewChild('head') head!: ElementRef<HTMLHeadElement>;
  constructor(
    private ss: ScriptService,
    private adminService: AdminService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.ss.loadScriptsWeb();
    this.activatedRoute.params.pipe(
      switchMap(
        ({ id }) => this.adminService.getPost(id)
      )
    ).subscribe({
      next: post => {
        this.post = post;
        this.exist = true;
        this.linkShare = 'https://colegioelperegrino.com/#/posts/' + post.id;
        this.imageShare = post.imagen
      },
      error: () => {
        this.router.navigateByUrl('/')
      }
    });



  }

}
