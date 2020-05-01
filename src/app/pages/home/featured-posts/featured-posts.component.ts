import { Component, OnInit, Input } from '@angular/core';

import { PostModel } from 'app/pages/news/_models/post.model';

@Component({
  selector: 'app-featured-posts',
  templateUrl: './featured-posts.component.html',
  styleUrls: []
})
export class FeaturedPostsComponent implements OnInit {

  @Input() posts: PostModel[];

  constructor() { }

  ngOnInit() {
  }

}
