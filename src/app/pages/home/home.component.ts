import { Component, OnInit } from '@angular/core';

import { PostModel } from 'app/pages/news/_models/post.model';
import { HomeService } from 'app/pages/home/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: []
})
export class HomeComponent implements OnInit {

  isLoading: boolean = true;
  posts: PostModel[];

  constructor(private homeService: HomeService) { }

  ngOnInit() {
    this.getFeaturedPosts();
  }


	//==============================
  // GENERAL METHODS
  //==============================

  // GET FEATURED POSTS
  getFeaturedPosts(): void {
    this.homeService.getFeaturedPosts().subscribe(
      data => {
        // Set Posts
        this.posts = [data[0], data[1], data[2]];

        // Deactivate loader
        this.isLoading = false;
      },
      error => {
        console.error(error);

        // Deactivate loader
        this.isLoading = false;
      }
    );
  }

}
