import { Component, OnInit } from '@angular/core';

import { PostModel } from 'app/news/_models/post.model';
import { HomeService } from 'app/home/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: []
})
export class HomeComponent implements OnInit {

  loading: boolean = true;
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
        // Data
        this.posts = [data[0], data[1], data[2]];

        // Deactivate loader
        this.loading = false;
      },
      error => {
        console.log(error);

        // Deactivate loader
        this.loading = false;
      }
    );
  }

}
