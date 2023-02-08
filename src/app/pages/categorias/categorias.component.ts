import { Component, OnInit } from '@angular/core';
import { ScriptService } from 'src/app/auth/admin/pages/images/script.service';
import { CategoriesService } from '../services/categories.service';
import { CategoryPost } from '../interfaces/category-post';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  categorias !:CategoryPost[];

  constructor(
    private ss: ScriptService,
    private categoriesService: CategoriesService
  ) { }

  ngOnInit(): void {
    this.ss.loadScriptsWeb();
    this.categoriesService.getCategoriesPost().subscribe({
      next: (categories)=> {
        console.log(categories);
        this.categorias = categories;
      },
    })
  }

}
