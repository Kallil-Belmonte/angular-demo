import { Component, OnInit } from '@angular/core';

import { PostModel } from 'app/home/_models/post.model';
import { HomeService } from 'app/home/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: []
})
export class HomeComponent implements OnInit {
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
      },
      error => {
        console.log(error);
      }
    );
  }
}
