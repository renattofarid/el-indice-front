import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { pipe, map, switchMap } from 'rxjs';
import { ScriptService } from 'src/app/auth/admin/pages/images/script.service';
import { Post } from '../interfaces/post';
import { PostService } from '../services/post.service';
import { CategoriesService } from '../services/categories.service';
import { CategoryPost } from '../interfaces/category-post';

@Component({
  selector: 'app-single-categoria',
  templateUrl: './single-categoria.component.html',
  styleUrls: ['./single-categoria.component.css']
})
export class SingleCategoriaComponent implements OnInit {

  posts !: Post[];
  featured !: Post[];
  categories !: CategoryPost[];
  constructor(
    private ss: ScriptService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private postService: PostService,
    private categoriesService: CategoriesService,
  ) { }

  ngOnInit(): void {
    this.ss.loadScriptsWeb();
    this.postService.getFeatured().subscribe({
      next: v => {
        this.featured = v;
      }
    });
    this.categoriesService.getCategoriesPost().subscribe({
      next: v => {
        this.categories = v;
      }
    })
    this.activatedRoute.params.pipe(
      switchMap(
        ({ id }) => this.postService.getPostsFilteredByCategory(id)
      )
    ).subscribe({
      next: posts => {
        console.log(posts);

        this.posts = posts;
      },
      error: () => {
        this.router.navigateByUrl('/noticias')
      }
    });
  }

}
