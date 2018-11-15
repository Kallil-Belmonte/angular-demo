import { Component, OnInit } from '@angular/core';

import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { faNewspaper } from '@fortawesome/free-solid-svg-icons';

import { Utils } from 'app/shared/utils/utils';
import { PostModel } from 'app/news/_models/post.model';
import { CategoryModel } from 'app/news/_models/category.model';
import { NewsService } from 'app/news/news.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  loader: boolean = true;
  faNewspaper = faNewspaper;
  posts: PostModel;
  categories: CategoryModel;
  postsPerPage: number = 9;
  pagePosts = [];
  currentPage: number = 0;
  firstPaginationItem: number = 1;

  constructor(private newsService: NewsService) { }

  ngOnInit() {
    this.getAllData();
  }


	//==============================
  // GENERAL METHODS
  //==============================

  // RESET PAGINATION
  resetPagination(): void {
    // // Remove active class
    // if (document.querySelector('.page-item.active')) document.querySelector('.page-item.active').classList.remove('active');
    //
    // // Add active class
    // if (document.querySelector('.page-item .page-link:first-child').innerText !== 'Previous') {
    //   document.querySelector('.page-item:nth-child(1)').classList.add('active');
    // } else {
    //   document.querySelector('.page-item:nth-child(2)').classList.add('active');
    // }
  }


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

      // Set page posts
      this.pagePosts = Utils.groupArrays(this.posts, this.postsPerPage)

      // Deactivate loader
      this.loader = false;
    });
  }


  // ON FILTER POSTS
  onFilterPosts(): void {
    let filterOption = event.target as HTMLInputElement;

    // Reset pagination
    this.resetPagination();

    // Set page posts
    this.postsPerPage = +filterOption.value;
    this.pagePosts = Utils.groupArrays(this.posts, +filterOption.value);
    this.currentPage = 0;
    this.firstPaginationItem = 1;
  }
}
