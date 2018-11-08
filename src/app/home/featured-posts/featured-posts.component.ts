import { Component, OnInit } from '@angular/core';

import { PostModel } from 'app/home/_models/post.model';
import { HomeService } from 'app/home/home.service';

@Component({
  selector: 'app-featured-posts',
  templateUrl: './featured-posts.component.html',
  styleUrls: []
})
export class FeaturedPostsComponent implements OnInit {
  posts: PostModel;

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
        // Data
        this.posts = data.slice(0, 3);
      },
      error => {
        console.log(error);
      }
    );
  }
}
