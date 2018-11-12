import { Component, OnInit } from '@angular/core';

import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { faNewspaper } from '@fortawesome/free-solid-svg-icons';

import { PostModel } from 'app/news/_models/post.model';
import { CategoryModel } from 'app/news/_models/category.model';
import { NewsService } from 'app/news/news.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: []
})
export class BlogComponent implements OnInit {
  loader: boolean = true;
  faNewspaper = faNewspaper;
  posts: PostModel;
  categories: CategoryModel;

  constructor(private newsService: NewsService) { }

  ngOnInit() {
    this.getAllData();
  }


	//==============================
  // GENERAL METHODS
  //==============================

  // GET ALL DATA
  getAllData(): void {
    forkJoin(
      this.newsService.getCategories(),
      this.newsService.getPosts()
    )
    .subscribe(([categories, posts]) => {
      // Data
      this.categories = categories;
      this.posts = posts;

      // Deactivate loader
      this.loader = false;
    });
  }
}
