import { Component, OnInit } from '@angular/core';

import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { faNewspaper } from '@fortawesome/free-solid-svg-icons';

import { Utils } from 'app/shared/general/utils';
import { PostModel } from 'app/news/_models/post.model';
import { CategoryModel } from 'app/news/_models/category.model';
import { NewsService } from 'app/news/news.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  loading: boolean = true;
  faNewspaper = faNewspaper;
  posts: PostModel[];
  categories: CategoryModel[];
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
    // Remove active class
    if (document.querySelector('.page-item.active')) document.querySelector('.page-item.active').classList.remove('active');

    // Add active class
    let firstPageItem: HTMLElement = document.querySelector('.page-item .page-link:first-child');

    if (firstPageItem.innerText !== 'Previous') {
      document.querySelector('.page-item:nth-child(1)').classList.add('active');
    } else {
      document.querySelector('.page-item:nth-child(2)').classList.add('active');
    }
  }


  // GET ALL DATA
  getAllData(): void {
    forkJoin(
      this.newsService.getCategories(),
      this.newsService.getPosts()
    )
    .subscribe(
      ([categories, posts]) => {
        // Set data
        this.categories = categories;
        this.posts = posts;

        // Set page posts
        this.pagePosts = Utils.groupArrays(this.posts, this.postsPerPage);

        // Deactivate loader
        this.loading = false;
      },
      error => {
        console.error(error);

        // Deactivate loader
        this.loading = false;
      }
    );
  }


  // ON SELECT CATEGORY
  onSelectCategory(): void {
    // Activate loader
    this.loading = true;

    // Remove active class
    for (let item of <any>document.querySelectorAll('.list-group-item')) {
      item.classList.remove('active');
    }

    // Add active class
    let targetElement = event.target as HTMLElement;
    let parentElement = targetElement.parentNode as HTMLElement;

    if (targetElement.tagName === 'SPAN') {
      parentElement.classList.add('active');
    } else {
      targetElement.classList.add('active');
    }

    // Reset Page posts
    this.pagePosts = [];

    // Get posts from the selected category
    // let category = document.querySelector('.list-group-item.active').getAttribute('data-name');
    this.newsService.getPosts().subscribe(
      data => {
        // Set Posts
        this.posts = data;

        // Reset pagination
        this.resetPagination();

        // Set page settings
        this.pagePosts = Utils.groupArrays(this.posts, this.postsPerPage);
        this.currentPage = 0;
        this.firstPaginationItem = 1;

        // Deactivate loader
        this.loading = false;
      },
      error => {
        console.error(error);

        // Deactivate loader
        this.loading = false;
      }
    );
  }


  // ON FILTER POSTS
  onFilterPosts(): void {
    let filterOption = event.target as HTMLInputElement;

    // Reset pagination
    this.resetPagination();

    // Set page settings
    this.postsPerPage = +filterOption.value;
    this.pagePosts = Utils.groupArrays(this.posts, +filterOption.value);
    this.currentPage = 0;
    this.firstPaginationItem = 1;
  }


  // ON PAGINATE
  onPaginate(): void {
    // Select active page item
    let activePageItem = document.querySelector('.page-item.active');

    // Navigate back and forth
    let navigateBackAndForth = (back: any) => {
      if (activePageItem) activePageItem.classList.remove('active');

      for (let item of <any>document.querySelectorAll('.page-item .page-link')) {
        if (back) {
          if (+item.innerText === this.currentPage + 2) item.parentNode.classList.add('active');
        } else {
          if (+item.innerText === this.currentPage) item.parentNode.classList.add('active');
        }
      }

      this.firstPaginationItem = back ? this.firstPaginationItem - 1 : this.firstPaginationItem + 1;
    };

    // Update current page
    let targetElement = event.target as HTMLElement;
    let parentElement = targetElement.parentNode as HTMLElement;

    switch(targetElement.innerText) {
      case 'Previous':
        navigateBackAndForth(true);
        break;

      case 'Next':
        navigateBackAndForth(false);
        break;

      default:
        if (activePageItem) activePageItem.classList.remove('active');
        parentElement.classList.add('active');
        this.currentPage = +targetElement.innerText - 1;
    }
  }

}
