import { Component, OnInit, Input } from '@angular/core';

import { PostModel } from 'app/news/_models/post.model';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: []
})
export class PostsComponent implements OnInit {

  @Input() data: PostModel[];
  @Input() page: number;

  constructor() { }

  ngOnInit() {
  }

}
